import { useState } from "react";
import { bundler } from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizabe";

function CodeCell() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const changeHandler = (value: string) => {
    setInput(value);
  };

  const handleClick = async () => {
    const result = await bundler(input);
    setCode(result);
  };
  return (
    <Resizable direction="horizontal">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="vertical">
          <CodeEditor defaultValue="const a = 1" passValue={changeHandler} />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
