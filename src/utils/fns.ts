type NextError = (value: Error) => string;

export const rethrow = (nextError: string | NextError) => (err: Error) => {
    if (typeof nextError === 'function') {
        throw new Error(nextError(err));
    } else if (typeof nextError === 'string') {
        throw new Error(nextError);
    }

    throw err;
};
