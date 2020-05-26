import React, { useState } from 'react';

import worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax

import TextEditor from './components/TextEditor';

const workerInstance = worker();

const initialValue = [
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
];

const App = () => {
	const [characters, setCharacters] = useState(0);
	const [value, setValue] = useState(initialValue);
	const [plainText, setPlainText] = useState('');
	const [words, setWords] = useState(0);

	workerInstance.onmessage = ({ data }) => {
		if (data?.result?.characters >= 0) {
			const { characters, plainText, words } = data?.result;
			setCharacters(characters);
			setPlainText(plainText);
			setWords(words);
		}
	};

	const onChangeValue = (value) => {
		workerInstance.calculate(value);
		setValue(value);
	};

	return (
		<TextEditor
			value={value}
			plainText={plainText}
			setValue={onChangeValue}
			words={words}
			characters={characters}
		/>
	);
};

export default App;
