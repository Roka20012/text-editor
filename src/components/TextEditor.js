import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate } from 'slate-react';
import { Editor, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { makeStyles, Grid } from '@material-ui/core';

import ActionsPanel from './ActionsPanel';

const HOTKEYS = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		paddingRight: 20,
		paddingLeft: 20,
	},
	editor: {
		minHeight: 300,
		width: '100%',
		boxSizing: 'border-box',
		padding: 20,
		resize: 'none',
		border: 'none',
		lineHeight: 1,
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

const TextEditor = ({
	value = initialValue,
	setValue,
	characters,
	plainText,
	words,
}) => {
	const classes = useStyles();
	const [fontSize, setFontSize] = useState(16);
	const [color, setColor] = useState({ hex: '#000' });
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);

	const changeFormat = (format) => {
		toggleMark(editor, format);
	};

	const checkIsActive = (format) => {
		// console.log('format', format);
		// console.log('isActive', isMarkActive(editor, format));
		return isMarkActive(editor, format);
	};

	return (
		<Grid container className={classes.root} spacing={2}>
			<Grid item xs={12}>
				<ActionsPanel
					fontSize={fontSize}
					onChangeFontSize={setFontSize}
					changeFormat={changeFormat}
					onChangeColor={setColor}
					checkIsActive={checkIsActive}
					color={color}
				/>
			</Grid>
			<Grid item xs={12}>
				<Slate editor={editor} value={value} onChange={setValue}>
					<Editable
						className={classes.editor}
						style={{ fontSize, color: color.hex }}
						renderElement={renderElement}
						renderLeaf={renderLeaf}
						placeholder='Enter something...'
						spellCheck
						autoFocus
						contentEditable={false}
						onKeyDown={(event) => {
							for (const hotkey in HOTKEYS) {
								if (isHotkey(hotkey, event)) {
									event.preventDefault();
									const mark = HOTKEYS[hotkey];
									toggleMark(editor, mark);
								}
							}
						}}
					/>
					<p className={classes.characters}>
						characters: {characters} / words: {words}
					</p>
				</Slate>
			</Grid>
		</Grid>
	);
};

const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
	return <p {...attributes}>{children}</p>;
};

const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

const initialValue = [
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
];

export default TextEditor;
