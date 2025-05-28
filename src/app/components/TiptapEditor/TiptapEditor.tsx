'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { useEffect } from 'react';
import './tiptap.css';

interface TiptapEditorProps {
  onChange?: (html: string) => void;
  content?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ onChange,content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Link,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content || '',
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="tiptap_editore">
      <div className="mb-2 flex flex-wrap gap-2 text-sm">
        <button type="button" className={editor.isActive('bold') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button type="button" className={editor.isActive('italic') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        <button type="button" className={editor.isActive('strike') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</button>
        <button type="button" className={editor.isActive('underline') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
        <button type="button" className={editor.isActive('highlight') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleHighlight().run()}>Highlight</button>
        <button type="button" className={editor.isActive('paragraph') ? 'is-active' : ''} onClick={() => editor.chain().focus().setParagraph().run()}>Paragraph</button>

        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            type="button"
            key={level}
            className={editor.isActive('heading', { level }) ? 'is-active' : ''}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          >
            H{level}
          </button>
        ))}

        <button type="button" className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''} onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
        <button type="button" className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''} onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</button>
        <button type="button" className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''} onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>
        <button type="button" className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''} onClick={() => editor.chain().focus().setTextAlign('justify').run()}>Justify</button>

        <button type="button" className={editor.isActive('bulletList') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button type="button" className={editor.isActive('orderedList') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
        <button type="button" className={editor.isActive('image') ? 'is-active' : ''} onClick={addImage}>Image</button>
        <button type="button" className={editor.isActive('link') ? 'is-active' : ''} onClick={setLink}>Link</button>

        <button className={editor.isActive('bold') ? 'is-active' : ''} type='button' onClick={addImage}>Image</button>
        <button className={editor.isActive('bold') ? 'is-active' : ''} type='button' onClick={setLink}>Link</button>
      </div>
      <EditorContent editor={editor} className="border rounded min-h-[200px] p-2" />
    </div>
  );
};

export default TiptapEditor;
