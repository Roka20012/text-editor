import React from 'react';
import { Button as MaterialButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	button: {
		width: 60,
		height: 60,
		color: 'white',
		userSelect: 'none',
	},
}));

const Button = ({ sign, className, color, ...props }) => {
	const classes = useStyles();
	return (
		<MaterialButton
			className={[classes.button, className]}
			variant='contained'
			color={color}
			{...props}
		>
			<p>{sign}</p>
		</MaterialButton>
	);
};

export default Button;
