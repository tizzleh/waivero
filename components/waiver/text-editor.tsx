// TextEditor.tsx

import React from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

type Props = {
  editorState: EditorState,
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>,
}

const TextEditor: React.FC<Props> = ({ editorState, setEditorState }) => {
  const onChange = (state: EditorState) => {
    setEditorState(state);
  };

  return (
    <div className="border rounded p-2">
      <Editor editorState={editorState} onChange={onChange} />
    </div>
  );
};

export default TextEditor;

