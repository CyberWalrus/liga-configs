import { promises } from 'fs';
import path from 'path';
import prettier from 'prettier';

import { rethrow } from './fns';

export const readJson = (filename: string) =>
    Promise.resolve(promises.readFile(filename, { encoding: 'utf8' }))
        .then(JSON.parse)
        .catch(rethrow(`Не удалось прочитать JSON-файл '${filename}'`));

export const readPackageJson = async () => readJson(path.resolve(process.cwd(), './package.json'));

export const writePackageJson = async (json: JSON) => {
    const prettierConfig = await prettier.resolveConfig(
        path.resolve(__dirname, '../moduleSettings/prettierrc'),
    );

    await promises.writeFile(
        path.resolve(process.cwd(), './package.json'),
        prettier.format(JSON.stringify(json), { ...prettierConfig, parser: 'json-stringify' }),
    );
};
