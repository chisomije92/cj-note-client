import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from "./components/preview";
import React, { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import "./App.css";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

function App() {
  const ref = useRef<any>(null);

  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.14.38/esbuild.wasm",
    });
    ref.current = true;
  };

  useEffect(() => {
    if (!ref.current) {
      startService();
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

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    // console.log(result);
    setCode(result.outputFiles[0].text);
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
