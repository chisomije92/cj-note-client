import "./code-cell.css";
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
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const cumulativeCode = [
      `
      import _React from 'react';
      import _ReactDOM from 'react-dom'
      const show = (value) => {
      const root = document.getElementById("root");
      if(typeof value === "object") {
        if(value.$$typeof && value.props){
          _ReactDOM.render(value, root);
        }else{
          root.innerHTML = JSON.stringify(value);
        }
      }else{
        root.innerHTML = value;
      }
    
    }
    `,
    ];
    for (let c of orderedCells) {
      if (c.type === "code") {
        cumulativeCode.push(c.content);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  // console.log(cumulativeCode);
  const dispatch = useAppDispatch();

  const { updateCell } = useCellActions();

  const changeHandler = (value: string) => {
    updateCell({ id: cell.id, content: value });
  };

  useEffect(() => {
    if (!bundle) {
      dispatch(createBundle(cell.id, cumulativeCode.join("\n")));
      return;
    }
    const timer = setTimeout(async () => {
      dispatch(createBundle(cell.id, cumulativeCode.join("\n")));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join("\n"), cell.id, dispatch]);

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
        </Resizable>{" "}
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
