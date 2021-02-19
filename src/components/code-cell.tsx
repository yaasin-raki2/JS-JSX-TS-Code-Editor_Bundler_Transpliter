import { useState, useEffect } from "react";
import { OnChange } from "@monaco-editor/react";

import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const onChange: OnChange = (value) => value && setInput(value);

  return (
    <div>
      <Resizable direction="vertical">
        <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
          <Resizable direction="horizontal">
            <CodeEditor
              value={input}
              onChange={onChange}
              setformat={(value) => setInput(value)}
            />
          </Resizable>
          <Preview code={code} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
