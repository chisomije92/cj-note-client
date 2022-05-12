import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from "./components/preview";
import React, { useEffect, useRef, useState } from "react";

import "./App.css";

import CodeEditor from "./components/code-editor";
import { bundler, startService } from "./bundler";

function App() {
  const ref = useRef<any>(null);

  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  // const startService = async () => {
  //   await esbuild.initialize({
  //     worker: true,
  //     wasmURL: "https://unpkg.com/esbuild-wasm@0.14.38/esbuild.wasm",
  //   });
  //   ref.current = true;
  // };

  useEffect(() => {
    if (!ref.current) {
      startService();
      ref.current = true;
    }
    return;
  }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setInput(e.target.value);
  // };

  const changeHandler = (value: string) => {
    setInput(value);
  };

  const handleClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await bundler(input);
    console.log(result);
    // console.log(result);
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

export default App;
