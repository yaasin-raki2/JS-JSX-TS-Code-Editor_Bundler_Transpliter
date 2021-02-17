import MonacoEditor, { OnChange } from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: OnChange;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  return (
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
      }}
    />
  );
};

export default CodeEditor;
