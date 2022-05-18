import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bundler } from "../bundler";
import { useBundleActions, useCellActions } from "../hooks/use-actions";
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
  // const [code, setCode] = useState("");
  // const [err, setErr] = useState("");
  const bundle = useTypedSelector((state) => state.bundle[cell.id]);
  console.log(bundle);
  const dispatch = useAppDispatch();

  const { updateCell } = useCellActions();
  // const {createBundle} = useBundleActions()

  const changeHandler = (value: string) => {
    updateCell({ id: cell.id, content: value });
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      // const result = await bundler(cell.content);
      // setCode(result.code);
      // setErr(result.err);
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
        {/* <Preview code={code} err={err} /> */}
      </div>
    </Resizable>
  );
};

export default CodeCell;
