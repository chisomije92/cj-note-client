import React, { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import "./App.css";

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
    startService();
    if (ref.current) {
      return;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) {
      return;
    }
    const result = await esbuild.transform(input, {
      loader: "jsx",
      target: "es2015",
    });
    // const result = esbuild.build({

    // })
    console.log(result);
    setCode(result.code);
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
