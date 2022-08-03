/*
const path = require('path');
const R = require('ramda');
const chalk = require('chalk');
const defaultConfig = require('../moduleSettings/module.config');

import path from 'path';
import chalk from 'chalk';

const mapToDestinationFormat = (config) => ({
	...config,
	bhAppPort: config.bhAppPort || config.proxyPort,
	publicPath: config.publicPath || `/${config.projectName}`,
});

const readConfig = () => {
	const projectConfig = require(path.resolve(process.cwd(), './module.config.js'));
	const config = R.mergeRight(defaultConfig, projectConfig);

	return mapToDestinationFormat(config);
};

const checkConfig = async () => {
	const config = readConfig();

	if (!config.projectName) {
		throw new Error('Необходимо заполнить поле projectName в modules.config.js');
	}

	if (!config.sonarKey) {
		throw new Error('Необходимо заполнить поле sonarKey в modules.config.js');
	}

	if (R.has('modules', config) && !Array.isArray(config.modules)) {
		throw new Error(
			`Поле modules в modules.config.js должно быть массивом, например ['@enigma/tv@2021.5.1-release.910', '@enigma/module.rkpk', { name: '@enigma/module.prediction', disabled: true }]`,
		);
	}

	if (config.proxyPort) {
		console.warn(
			chalk.yellow(
				`Параметр 'proxyPort' больше не используется. Используйте вместо него '{ bhAppPort: 3000 }'.`,
			),
		);
	}

	if (R.has('isLocalBh', config)) {
		console.warn(
			chalk.yellow(
				`Параметр 'isLocalBh' больше не используется. Используйте вместо него '{ bhAppHost: '127.0.0.1' }'.`,
			),
		);
	}

	if (config.route) {
		console.warn(
			chalk.yellow(
				`Параметр 'route' больше не используется. Используйте вместо него '{ openUrl: '/pricing/credits' }'.`,
			),
		);
	}
};

module.exports = {
	readConfig,
	checkConfig,
};
*/