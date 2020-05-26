import React, { useState } from 'react';
import {
	makeStyles,
	AppBar,
	Toolbar,
	CssBaseline,
	useScrollTrigger,
	Fab,
	Zoom,
	IconButton,
	FormControl,
	Select,
	MenuItem,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Twitter from 'react-color/lib/components/twitter/Twitter';

import EditFontWeightIcon from '../EditFontWeightIcon';
import EditUnderlineIcon from '../EditUnderlineIcon';
import EditFontSizeIcon from '../EditFontSizeIcon';
import EditItalicIcon from '../EditItalicIcon';
import EditColorIcon from '../EditColorIcon';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'fixed',
		bottom: theme.spacing(5),
		right: theme.spacing(5),
	},
	tollbar: {
		minHeight: 0,
	},
	actionButton: {
		margin: 0,
		height: '100%',
		borderRadius: 0,
		transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 20ms',
		'&:hover': {
			backgroundColor: '#e0e0e0',
		},
		'&:active': {
			backgroundColor: '#9e9e9e',
		},
	},
	tollbarAnchor: {
		margin: 0,
	},
}));

const ScrollTop = (props) => {
	const { children, window } = props;
	const classes = useStyles();
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#back-to-top-anchor'
		);

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role='presentation' className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
};

const ActionsPanel = ({
	changeFormat,
	fontSize = 16,
	onChangeFontSize,
	onChangeColor,
	checkIsActive,
	color,
	...props
}) => {
	const classes = useStyles();
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [open, setOpen] = useState(false);

	const handleChange = ({ target: { value } }) => {
		onChangeFontSize(value);
	};

	const tooglePicker = () => {
		setIsPickerOpen((prevValue) => !prevValue);
	};

	const onOpenSelect = () => {
		setOpen(true);
	};
	const onCloseSelect = () => {
		setOpen(false);
	};

	const onChangeFormat = (e) => {
		e.preventDefault();
		const {
			currentTarget: {
				dataset: { format },
			},
		} = e;
		changeFormat(format);
	};

	return (
		<>
			<CssBaseline />
			<AppBar color='default'>
				<Toolbar className={classes.tollbar}>
					<IconButton
						className={classes.actionButton}
						style={{ backgroundColor: checkIsActive('bold') && '#888' }}
						disableRipple
						data-format='bold'
						onClick={onChangeFormat}
					>
						<EditFontWeightIcon width={20} />
					</IconButton>
					<IconButton
						className={classes.actionButton}
						style={{ backgroundColor: checkIsActive('underline') && '#888' }}
						disableRipple
						data-format='underline'
						onClick={onChangeFormat}
					>
						<EditItalicIcon width={20} />
					</IconButton>
					<IconButton
						className={classes.actionButton}
						style={{ backgroundColor: checkIsActive('italic') && '#888' }}
						disableRipple
						data-format='italic'
						onClick={onChangeFormat}
					>
						<EditUnderlineIcon width={20} />
					</IconButton>
					<IconButton
						className={classes.actionButton}
						onClick={onOpenSelect}
						disableRipple
					>
						<EditFontSizeIcon width={20} />
					</IconButton>
					<FormControl className={classes.margin}>
						<Select
							labelId='demo-customized-select-label'
							id='demo-customized-select'
							open={open}
							onClose={onCloseSelect}
							onOpen={onOpenSelect}
							value={fontSize}
							onChange={handleChange}
						>
							<MenuItem value={8}>8</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={12}>12</MenuItem>
							<MenuItem value={14}>14</MenuItem>
							<MenuItem value={16}>16</MenuItem>
							<MenuItem value={18}>18</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={24}>24</MenuItem>
							<MenuItem value={26}>26</MenuItem>
							<MenuItem value={28}>28</MenuItem>
							<MenuItem value={30}>30</MenuItem>
						</Select>
					</FormControl>

					<IconButton
						className={classes.actionButton}
						onClick={tooglePicker}
						disableRipple
					>
						<EditColorIcon width={20} />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Toolbar className={classes.tollbarAnchor} id='back-to-top-anchor' />
			{isPickerOpen && (
				<Twitter
					data-format='color'
					triangle='hide'
					onChange={onChangeColor}
					color={color}
				/>
			)}
			<ScrollTop {...props}>
				<Fab color='secondary' size='medium' aria-label='scroll back to top'>
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</>
	);
};

export default ActionsPanel;
