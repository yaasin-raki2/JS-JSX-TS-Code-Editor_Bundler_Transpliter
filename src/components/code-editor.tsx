import "./code-editor.css";

import MonacoEditor, { OnChange } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  value: string;
  onChange: OnChange;
  setformat(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, setformat }) => {
  const onClick = () => {
    const formatedCode = prettier
      .format(value, {
        parser: "babel",
        plugins: [parser],
        semi: true,
        useTabs: false,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    setformat(formatedCode);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small editor-button-format"
        onClick={onClick}
      >
        Format
      </button>
      <MonacoEditor
        onChange={onChange}
        value={value}
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
