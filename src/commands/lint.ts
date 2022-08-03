import { readFile } from "../utils/read-file";

export const lint = async () => {
	await readFile('../../module-configs/module.config.json');
	console.log('test');
}