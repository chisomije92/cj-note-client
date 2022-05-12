import { useState } from "react";
import { bundler } from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";

function CodeCell() {
  //   const ref = useRef<any>(null);

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
    <div className="App">
      <CodeEditor defaultValue="const a = 1" passValue={changeHandler} />
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
}

export default CodeCell;
