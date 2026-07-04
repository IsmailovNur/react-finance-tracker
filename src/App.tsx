import { RouterProvider } from "react-router-dom";

import { router } from "./routing/router.tsx";

import './App.css';

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
