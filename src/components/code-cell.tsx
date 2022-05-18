import React, { useEffect } from "react";
import { useCellActions } from "../hooks/use-actions";
import { useAppDispatch } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { Cell, createBundle } from "../state";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  //
  const bundle = useTypedSelector((state) => state.bundle[cell.id]);

  const dispatch = useAppDispatch();

  const { updateCell } = useCellActions();

  const changeHandler = (value: string) => {
    updateCell({ id: cell.id, content: value });
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      dispatch(createBundle(cell.id, cell.content));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id, dispatch]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor defaultValue={cell.content} passValue={changeHandler} />
        </Resizable>
        {bundle && <Preview code={bundle.code} err={bundle.err} />}
      </div>
    </Resizable>
  );
};

export default CodeCell;
