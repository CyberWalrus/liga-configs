export type FileSettingsItem = {
	name: string,
	destination: string,
	overwrite?: boolean,
}

const fileSettings: FileSettingsItem[] = [
	{ name: 'eslintrc.js', destination: '.eslintrc.js', overwrite: true },
	{ name: 'eslintignore', destination: '.eslintignore' },
];

export default fileSettings;