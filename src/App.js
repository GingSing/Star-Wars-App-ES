import React from "react";
import "./App.css";
import {
  Films,
  Film,
  Character,
  Planet,
  Species,
  Vehicle,
  Starship,
  Error,
} from "./pages";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Films} />
        <Route path="/films/:id" component={Film} />
        <Route path="/characters/:id" component={Character} />
        <Route path="/planets/:id" component={Planet} />
        <Route path="/species/:id" component={Species} />
        <Route path="/vehicles/:id" component={Vehicle} />
        <Route path="/starships/:id" component={Starship} />
        <Route path="*" exact component={Error} />
      </Switch>
    </div>
  );
};

export default App;
