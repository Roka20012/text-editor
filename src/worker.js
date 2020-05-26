export const calculate = (value) => {
	const plainText = value.reduce(
		(acc, { children }) =>
			acc + children.reduce((acc, { text }) => acc + text, ''),
		''
	);

	const length = plainText.length;
	return { characters: length, plainText };
};
