"use client";

import Editor, { type BeforeMount, type OnMount } from "@monaco-editor/react";

const defineTheme: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("coderun-night", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#222222",
      "editor.foreground": "#ffffff",
      "editorLineNumber.foreground": "#707070",
      "editorLineNumber.activeForeground": "#ffffff",
      "editor.lineHighlightBackground": "#262626",
      "editorCursor.foreground": "#3ecf8e",
      "editor.selectionBackground": "#3ecf8e33",
    },
  });
};

export function CodeEditor({
  code,
  language,
  onMount,
}: {
  code: string;
  language: string;
  onMount?: OnMount;
}) {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={code}
      theme="coderun-night"
      beforeMount={defineTheme}
      onMount={onMount}
      options={{
        fontSize: 18,
        fontFamily:
          "var(--font-geist-mono), ui-monospace, Menlo, Monaco, Consolas, monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        renderLineHighlight: "all",
        padding: { top: 12, bottom: 12 },
        smoothScrolling: true,
      }}
    />
  );
}
