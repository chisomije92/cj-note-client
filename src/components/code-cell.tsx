import React, { useEffect, useState } from "react";
import { bundler } from "../bundler";
import { useCellActions } from "../hooks/use-actions";
import { Cell } from "../state";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  const { updateCell } = useCellActions();

  const changeHandler = (value: string) => {
    updateCell({ id: cell.id, content: value });
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await bundler(cell.content);
      setCode(result.code);
      setErr(result.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor defaultValue={cell.content} passValue={changeHandler} />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
