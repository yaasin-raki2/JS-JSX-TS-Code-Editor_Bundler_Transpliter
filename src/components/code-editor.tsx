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
    const formatedCode = prettier.format(value, {
      parser: "babel",
      plugins: [parser],
      semi: true,
      useTabs: false,
      singleQuote: true,
    });
    setformat(formatedCode);
  };

  return (
    <div>
      <button onClick={onClick}>Format</button>
      <MonacoEditor
        onChange={onChange}
        value={value}
        height="400px"
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
