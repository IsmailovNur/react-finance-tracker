import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import App from "./App.tsx";
import { ConfigProvider, theme } from "antd";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <App />
    </ConfigProvider>
  </Provider>,
);
