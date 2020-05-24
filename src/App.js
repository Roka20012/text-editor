import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax

import ResultWindow from './components/ResultWindow';
import ActionsPanel from './components/ActionsPanel';
import TextEditor from './components/TextEditor';
import TextField from './components/TextField';

const workerInstance = worker();

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		paddingRight: 20,
		paddingLeft: 20,
	},
}));

const initialValue = [
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
];

const App = () => {
	const classes = useStyles();
	const [characters, setCharacters] = useState(0);
	const [value, setValue] = useState(initialValue);
	const [result, setResult] = useState('');
	const [plainText, setPlainText] = useState('');

	workerInstance.onmessage = ({ data }) => {
		if (data?.result?.characters && data?.result?.plainText) {
			const { characters, plainText } = data?.result;
			console.log('plainTextlength', plainText.length);
			setCharacters(characters);
			setPlainText(plainText);
		}
	};

	const onChangeValue = (value) => {
		console.log('value', value);
		workerInstance.calculate(value);
		setValue(value);
		setResult(value);
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
