import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(input);
  };
  return (
    <div className="App">
      <textarea value={input} onChange={handleChange}></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre></pre>
    </div>
  );
}

export default App;
