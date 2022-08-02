import { Command } from 'commander';

const printError = (err) => {
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

	if (err.details) {
		console.error(err.details);
	}
};

const lint = async () => {
	console.log('test');
}

(async () => {
	try {

		await new Command()
			.addCommand(
				new Command('lint')
					.description('Отформатировать код, проверить js и css')
					.action(lint),
			)
			.parseAsync(process.argv);
			
		process.exit(0);
	} catch (err) {
		printError(err);
		process.exit(1);
	}
})();
