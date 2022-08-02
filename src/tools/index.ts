/* eslint-disable @typescript-eslint/no-floating-promises */
/*
const { Command } = require('commander');
const install = require('./commands/install');
const lint = require('./commands/lint');
const { checkConfig, updateNotifier } = require('../utils');
const { deployCommand } = require('./commands/deploy');
*/
import { Command } from 'commander';
import eslint from 'eslint';

const printError = (err: Error) => {
    if (!err) {
        console.trace('Unknown error');

        return;
    }

    if (Array.isArray(err)) {
        err.forEach(printError);

        return;
    }

    if (err.message) {
        console.error(err.message);
    }
};

const lint = async () => {
eslint
}

(async () => {
    try {
        await new Command()
            .addCommand(
                new Command('lint')
                    .description('Отформатировать код, проверить ts, js и css')
                    .option('-ci, --ci', 'Запуск в режиме CI', false)
                    .option('-fix, --fix', 'Запуск в режиме автоматического исправления', false)
                    .action(lint),
            )
            .parseAsync(process.argv);
        process.exit(0);
    } catch (err: Error) {
        printError(err);
        process.exit(1);
    }
})();
