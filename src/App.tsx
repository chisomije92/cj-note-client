import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useRef } from "react";

import "./App.css";
import { startService } from "./bundler";
import CodeCell from "./components/code-cell";

function App() {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) {
      startService();
      ref.current = true;
    }
    return;
  }, []);
  return (
    <div className="App">
      <CodeCell />
      <CodeCell />
    </div>
  );
}

export default App;
