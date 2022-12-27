import React from "react";
import Home from "./Home";
import Recipe from "./Recipe";
import Browse from "./Browse";
import NewRecipe from "./NewRecipe";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function Pages() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/browse" component={Browse} />
        <Route path="/cookbooks" component={NewRecipe} />
      </Routes>
    </Router>
  );
}

export default Pages;
