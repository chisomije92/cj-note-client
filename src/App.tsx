import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useRef } from "react";
import { startService } from "./bundler";
import CodeCell from "./components/code-cell";

function App() {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) {
      setTimeout(async () => {
        await startService();
        ref.current = true;
      }, 10);
    }
    return;
  }, []);
  return (
    <div className="App">
      <CodeCell />
    </div>
  );
}

export default App;
