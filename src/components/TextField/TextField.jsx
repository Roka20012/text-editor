import React from 'react';
import { makeStyles, TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	textInput: {
		minHeight: 300,
		width: '100%',
		boxSizing: 'border-box',
		padding: 20,
		resize: 'none',
		border: 'none',
		borderRadius: 10,
		outline: 'none',
		boxShadow: '0px 0px 20px -10px black',
		...theme.typography.body1,
	},
	characters: {
		...theme.typography.body1,
		color: '#777',
	},
}));

const TextField = ({
	onSelectedText,
	onChange,
	onBlur,
	placeholder,
	characters,
	fontSize,
}) => {
	const classes = useStyles();

	return (
		<>
			<TextareaAutosize
				className={classes.textInput}
				style={{ fontSize }}
				aria-label='input'
				placeholder={placeholder}
				onChange={onChange}
				onMouseUp={onSelectedText}
				onBlur={onBlur}
			/>
			<p className={classes.characters}>characters: {characters}</p>
		</>
	);
};

export default TextField;
