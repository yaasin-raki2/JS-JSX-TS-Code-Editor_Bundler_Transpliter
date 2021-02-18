import { useState } from "react";
import { OnChange } from "@monaco-editor/react";

import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  const onChange: OnChange = (value) => value && setInput(value);

  return (
    <div>
      <CodeEditor
        value={input}
        onChange={onChange}
        setformat={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
