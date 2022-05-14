import "bulmaswatch/superhero/bulmaswatch.min.css";
import { startService } from "./bundler";
import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

function App() {
  startService();

  return (
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
}

export default App;
