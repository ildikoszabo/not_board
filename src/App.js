import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/game/:id/:player" component={Game} />
      </Switch>
    </div>
  );
}

export default App;
