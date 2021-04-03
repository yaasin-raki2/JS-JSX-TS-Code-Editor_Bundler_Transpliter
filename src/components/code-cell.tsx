import { useEffect } from "react";
import { OnChange } from "@monaco-editor/react";

import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id, createBundle]);

  const onChange: OnChange = (value) => value && updateCell(cell.id, value);

  return (
    <div>
      <Resizable direction="vertical">
        <div
          style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}
        >
          <Resizable direction="horizontal">
            <CodeEditor
              value={cell.content}
              onChange={onChange}
              setformat={(value) => updateCell(cell.id, value)}
            />
          </Resizable>
          {bundle && <Preview code={bundle.code} err={bundle.err} />}
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
