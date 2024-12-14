import React from "react";
import "./App.css";
import ProfileRouter from "./Components/Route/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ProfileRouter />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
