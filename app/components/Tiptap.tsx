"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CSSProperties } from "react";

const Tiptap = ({ style }: { style: CSSProperties }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: "<b>Hello World! 🌎️</b>",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editable: true,
    editorProps: {
      attributes: {
        class:
          "rounded-lg border border-gray-200 bg-white p-6 focus:outline-main-accent",
      },
    },
  });

  return <EditorContent editor={editor} style={style} />;
};

export default Tiptap;
