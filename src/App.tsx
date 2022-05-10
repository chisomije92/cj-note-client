import React, { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import "./App.css";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

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
    if (ref.current) {
      return;
    }
    startService();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    if (!ref.current) {
      return;
    }
    // const result = await esbuild.transform(input, {
    //   loader: "jsx",
    //   target: "es2015",
    // });
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    console.log(result);
    setCode(result.outputFiles[0].text);
  };
  return (
    <div className="App">
      <textarea value={input} onChange={handleChange}></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
