const { promises: fs } = require('fs');
const path = require('path');
const pacote = require('pacote');
const semver = require('semver');
const libnpmconfig = require('libnpmconfig');
const chalk = require('chalk');
const isCI = require('is-ci');
const { readJson } = require('./json');
const npmConfigResolver = require('./npmConfigResolver');
const logger = require('./createLogger')('update-notifier');

const PACKET_NAME = '@enigma/frontend-configs';
const ONE_DAY_MS = 1000 * 60 * 60 * 24;
const UPDATE_NOTIFIER_TIMESTAMP_FILENAME = path.resolve(
    __dirname,
    '../../._update_notifier_timestamp',
);

export const isUpdateTimeoutExpired = async () => {
    const timestamp = Date.now() - ONE_DAY_MS;
    const filename = UPDATE_NOTIFIER_TIMESTAMP_FILENAME;
    const stats = await fs.stat(filename).catch(() => ({ mtime: timestamp - 1 }));

    if (timestamp > stats.mtime) {
        await fs.writeFile(filename, '').catch((err) => {
            logger.err('Не удалось записать временную метку проверки обновлений');
            logger.err(err);
        });

        return true;
    }

    return false;
};

export const clearUpdateTimestamp = async () => {
    await fs.unlink(UPDATE_NOTIFIER_TIMESTAMP_FILENAME).catch((err) => {
        logger.err('Не удалось удалить временную метку проверки обновлений');
        logger.err(err);
    });
};

export const getCurrentVersionFromDeps = async () => {
    const packageJson = await readJson(path.resolve(process.cwd(), './package.json'));
    const hasDevDeps = packageJson.devDependencies[PACKET_NAME];
    const hasDeps = packageJson.dependencies[PACKET_NAME];

    if (hasDeps) {
        throw new Error(`Переместите пакет ${PACKET_NAME} из общих зависимостей в dev-зависимости`);
    }

    if (!hasDevDeps) {
        throw new Error(`Пакет ${PACKET_NAME} не найден в dev-зависимостях`);
    }

    const currentVersion = semver.parse(packageJson.devDependencies[PACKET_NAME] || '');

    if (!semver.valid(currentVersion)) {
        throw new Error(`Указана некорректная версия '${currentVersion}' пакета ${PACKET_NAME}`);
    }

    return currentVersion;
};

const getLatestVersionFromRegistry = async (version) => {
    try {
        const npmConfig = libnpmconfig.read().toJSON();
        const options = npmConfigResolver(npmConfig);
        const manifest = await pacote.manifest(`${PACKET_NAME}@${version.major}`, options);

        return semver.parse(manifest.version);
    } catch (err) {
        throw new Error(`Не удалось получить данные из npm-registry о пакете ${PACKET_NAME}`);
    }
};

export const updateNotifier = async () => {
    try {
        if (!(await isUpdateTimeoutExpired())) {
            logger.warn('С момента предыдущей проверки прошло недостаточно времени');

            return;
        }

        if (isCI) {
            logger.warn('Проверка обновлений в окружении CI отключена');

            return;
        }

        const currentVersion = await getCurrentVersionFromDeps();
        const nextVersion = await getLatestVersionFromRegistry(currentVersion);

        if (semver.gt(nextVersion, currentVersion)) {
            console.log('');
            console.log(chalk.bgBlack.green(`Доступна новая версия ${PACKET_NAME}`));
            console.log(
                chalk.bgBlack.green(
                    `npm i --save-dev ${PACKET_NAME}@${nextVersion} && npm run tools-install`,
                ),
            );
            console.log('');
        }
    } catch (err) {
        await clearUpdateTimestamp();
        console.warn(`Не удалось проверить обновления пакета ${PACKET_NAME}`);
        console.warn(`${err.name}: ${err.message}`);
    }
};
