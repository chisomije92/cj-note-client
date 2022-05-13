import "bulmaswatch/superhero/bulmaswatch.min.css";

import { startService } from "./bundler";
import CodeCell from "./components/code-cell";

function App() {
  // useEffect(() => {
  //   if (!ref.current) {
  //     setTimeout(async () => {
  //       await startService().then(() => {});
  //       ref.current = true;
  //     }, 0);
  //   }
  // }, []);
  startService();
  return (
    <div className="App">
      <CodeCell />
    </div>
  );
}

export default App;
