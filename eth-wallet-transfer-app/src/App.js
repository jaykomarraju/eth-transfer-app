import React from "react";
import "./App.css";
import Main from "./components/main.component";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Main}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
