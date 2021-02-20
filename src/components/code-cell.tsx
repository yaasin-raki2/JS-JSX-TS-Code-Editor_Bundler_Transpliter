import { useState, useEffect } from "react";
import { OnChange } from "@monaco-editor/react";

import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [err, setErr] = useState("");
  const [code, setCode] = useState("");

  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  const onChange: OnChange = (value) => value && updateCell(cell.id, value);

  return (
    <div>
      <Resizable direction="vertical">
        <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
          <Resizable direction="horizontal">
            <CodeEditor
              value={cell.content}
              onChange={onChange}
              setformat={(value) => updateCell(cell.id, value)}
            />
          </Resizable>
          <Preview code={code} err={err} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
