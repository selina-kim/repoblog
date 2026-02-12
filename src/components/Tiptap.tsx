"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CSSProperties } from "react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import "@/styles/mdx.css";

const Tiptap = ({ style }: { style: CSSProperties }) => {
  const lowlight = createLowlight(all);

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
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
