import { Provider } from "react-redux";
import { Main } from "./Main";
import { NextUIProvider } from '@nextui-org/react';
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Main />
      </NextUIProvider>
    </Provider>
  );
}

export default App;
