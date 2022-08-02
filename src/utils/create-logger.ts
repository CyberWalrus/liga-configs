import debug from 'debug';

export default (namespace: string) => ({
    log: debug(`liga-tools:${namespace}:log`),
    warn: debug(`liga-tools:${namespace}:warn`),
    err: debug(`liga-tools:${namespace}:err`),
    debug: debug(`liga-tools:${namespace}:debug`),
});
