import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import store from "./state";

import { startService } from "./bundler";
import CellList from "./components/cell-list";

function App() {
  startService();

  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
