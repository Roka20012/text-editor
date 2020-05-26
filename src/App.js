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

	workerInstance.onmessage = ({ data }) => {
		if (data?.result?.characters >= 0) {
			const { characters, plainText } = data?.result;
			setCharacters(characters);
			setPlainText(plainText);
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
			characters={characters}
		/>
	);
};

export default App;
