import React, { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import "./App.css";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

function App() {
  const ref = useRef<any>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const [input, setInput] = useState("");
  // const [code, setCode] = useState("");

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

  const html = `
  <html>
  <head></head>
  <body>
  <div id='root'></div>
  <script>
  window.addEventListener('message', (event) => {
    try{
      eval(event.data);
    }catch(e){
 const root = document.querySelector('#root');
 root.innerHTML = '<div style="color: red"> <h4>Runtime Error</h4>' + e.message + '</div>';
console.log(e);
   }
  }, false)</script></body>
  </html>`;
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    if (!ref.current) {
      return;
    }
    if (iframe.current) {
      iframe.current.srcdoc = html;
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
    console.log(result);
    // setCode(result.outputFiles[0].text);
    iframe.current?.contentWindow?.postMessage(result.outputFiles[0].text, "*");
  };
  return (
    <div className="App">
      <CodeEditor />
      <textarea value={input} onChange={handleChange}></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <iframe
        sandbox="allow-scripts"
        ref={iframe}
        srcDoc={html}
        title="preview"
      />
    </div>
  );
}

export default App;
