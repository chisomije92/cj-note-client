import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import store from "./state";

import { startService } from "./bundler";
import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

function App() {
  startService();

  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
}

export default App;
