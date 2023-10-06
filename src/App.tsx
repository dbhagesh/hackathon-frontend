import "./App.css";
import RouteController from "./routes";
import { GlobalStoreProvider } from "./stores/global";

function App() {
  return (
    <div className="App">
      <GlobalStoreProvider>
        <RouteController />
      </GlobalStoreProvider>
    </div>
  );
}

export default App;
