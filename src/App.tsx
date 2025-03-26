import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface EditorProps {
  value?: string;
  onChange: (value: string) => void;
}

const EDITOR_DEFAULT_FONT_SIZE = 20;
const EDITOR_DEFAULT_HEIGHT = EDITOR_DEFAULT_FONT_SIZE * 20;

const StyledQuill = styled.div`
  height: ${EDITOR_DEFAULT_HEIGHT}px;
  width: 100%;
  margin-bottom: 100px;
  .ql-editor {
    font-size: ${EDITOR_DEFAULT_FONT_SIZE}px;
  }
`;

const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['image'],
    ],
  },
};

const App = ({ value, onChange }: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    if (quillInstance.current) {
      // DOM에서 직접 제거
      const toolbarElement = document.querySelector('.ql-toolbar');
      const editorElement = document.querySelector('.ql-editor');

      toolbarElement?.remove();
      editorElement?.remove();

      quillInstance.current = null;
      editorRef.current.innerHTML = '';
    }

    quillInstance.current = new Quill(editorRef.current, {
      modules,
      theme: 'snow',
    });

    quillInstance.current.on('text-change', () => {
      const content = quillInstance.current?.root.innerHTML || '';
      onChange(content);
    });
  }, []);

  useEffect(() => {
    if (quillInstance.current && value !== undefined) {
      const editor = quillInstance.current.root;
      if (editor.innerHTML !== value) {
        editor.innerHTML = value;
      }
    }
  }, [value]);

  return <StyledQuill ref={editorRef} />;
};

export default App;
