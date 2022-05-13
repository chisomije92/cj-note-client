import "bulmaswatch/superhero/bulmaswatch.min.css";
import { startService } from "./bundler";
import CodeCell from "./components/code-cell";

function App() {
  startService();

  return (
    <div>
      <CodeCell />
    </div>
  );
}

export default App;
