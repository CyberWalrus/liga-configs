import debug from 'debug';

export const createLogger = (namespace: string) => ({
	log: debug(`liga-configs:${namespace}:log`),
	warn: debug(`liga-configs:${namespace}:warn`),
	err: debug(`liga-configs:${namespace}:err`),
	debug: debug(`liga-configs:${namespace}:debug`),
});
