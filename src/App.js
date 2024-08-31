import { Preloader } from "./components/Preloader/Preloader";
import MainRoutes from "./routers/MainRoutes";

import React from "react";

const App = () => {
  return (
    <>
      <MainRoutes />
      <Preloader />
    </>
  );
};

export default App;
