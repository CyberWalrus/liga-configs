import defaultConfig from '../module-settings/module.config';

type Config = {
    projectName: string;
};

export const mapToDestinationFormat = (config: Config) => ({
    ...config,
});

export const readConfig = async () => {
    const url = process.cwd();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const projectConfig: Config = await import(`${url}/module.config.js`);

    if (projectConfig.projectName) {
        return mapToDestinationFormat(defaultConfig);
    }
    const config = { ...defaultConfig, ...projectConfig };

    return mapToDestinationFormat(config);
};

export const checkConfig = async () => {
    const config = await readConfig();

    if (!config.projectName) {
        throw new Error('Необходимо заполнить поле projectName в modules.config.js');
    }
};
