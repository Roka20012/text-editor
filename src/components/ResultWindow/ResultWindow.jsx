import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles((theme) => ({
	resultContainer: {
		width: '100%',
		padding: 20,
		minHeight: 300,
		paddingTop: 35,
		borderRadius: 10,
		boxShadow: '0px 0px 20px -10px black',
		wordBreak: 'break-word',
		lineHeight: 1.5,
		...theme.typography.body1,
	},
	result: {
		boxSizing: 'border-box',
	},
}));

const ResultWindow = ({ fontSize = 16, placeholder, value = '' }) => {
	const classes = useStyles();

	const stringToHTML = (str) => {
		const htmlString = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
		const html = ReactHtmlParser(htmlString);

		return html;
	};

	return (
		<div className={classes.resultContainer}>
			<Typography style={{ fontSize }}>
				{stringToHTML(value) || placeholder}
			</Typography>
		</div>
	);
};

export default ResultWindow;
