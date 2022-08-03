
import {Command} from 'commander'

import { printError } from '$utils/print-error'
import { lint } from '$commands/lint';

(async () => {
	try {

		await new Command()
			.addCommand(
				new Command('lint')
					.description('Отформатировать код, проверить ts js и pcss')
					.action(lint),
			)
			.parseAsync(process.argv);
			
		process.exit(0);
	} catch (err) {
		printError(err);
		process.exit(1);
	}
})();
