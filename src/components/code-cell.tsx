import { useEffect, useState } from "react";
import { bundler } from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

function CodeCell() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const changeHandler = (value: string) => {
    setInput(value);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await bundler(input);
      setCode(result);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor defaultValue="const a = 1" passValue={changeHandler} />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
