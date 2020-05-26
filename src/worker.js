export const calculate = (value) => {
	console.log('value', value);
	const plainText = value.reduce(
		(acc, { children }) =>
			acc + ' ' + children.reduce((acc, { text }) => acc + text, ''),
		''
	);

	const words = plainText.split(/\s+|\\n/g).filter((n) => n !== '').length;

	const length = plainText.length;
	return { characters: length, plainText, words };
};
