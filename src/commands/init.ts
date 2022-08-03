
import path from 'path';
import fsExtra from 'fs-extra';
import {createLogger} from '../utils/create-logger'
import fileSettings from '../configs/file-settings';


const logger = createLogger('init-command');

const copyFiles = () => Promise.all(
		fileSettings.map(async ({ name, destination, overwrite = false }) => {
			const src = path.resolve(__dirname, '../../template', `./${name}`);
			const dst = path.resolve(process.cwd(), destination);

			try {
				if (overwrite) {
					logger.log('Удаление файла %s', dst);
					await fsExtra.remove(dst);
				}

				logger.log('Копирование файла из %s в %s', src, dst);
				await fsExtra.copy(src, dst, { overwrite: false });

			} catch (err) {
				logger.err('Копирование файла из %s в %s не удалось', src, dst);
				logger.err(err);
			}
		}),
	);

	export const init = async () => {
		await copyFiles();
	}