
interface PrintError {
  message?: string;
  details?: string;
}

const isError = (obj: unknown): obj is PrintError => {
  return (
    typeof obj === 'object' && obj !== null && ('message' in obj || 'details' in obj)
  );
}

export const printError = (err: unknown) => {
	if (!err) {
		console.trace('Unknown error');
		return;
	}

	if (Array.isArray(err)) {
		err.forEach(printError);
		return;
	}

	if (isError(err) && err.message) {
		console.error(err.message);
	}

	if (isError(err) && err.details) {
		console.error(err.details);
	}
};