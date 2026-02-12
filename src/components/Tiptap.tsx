"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CSSProperties } from "react";
import "@/styles/mdx.css";

const Tiptap = ({ style }: { style: CSSProperties }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: "",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editable: true,
    editorProps: {
      attributes: {
        class:
          "mdx-content rounded-lg border border-gray-200 bg-white p-8 focus:outline-main-accent",
      },
    },
    autofocus: true,
  });

  return <EditorContent editor={editor} style={style} />;
};

export default Tiptap;
