import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import "./style2.css";
import CreateNamesTable from "./exercises/Exercise1";
import GetRandomJokes from "./exercises/Exercise2";
import Persons from "./exercises/Exercise3";

// LINK TO DEPLOYED APP ON SURGE: https://react-router-ex.surge.sh/

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/exercise-1">
            <CreateNamesTable />
          </Route>
          <Route path="/exercise-2">
            <GetRandomJokes />
          </Route>
          <Route path="/exercise-3">
            <Persons />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

const Header = () => (
  <ul className="header">
  <li>
    <NavLink exact to="/">Home</NavLink>
  </li>
  <li>
    <NavLink exact activeClassName="selected" to="/exercise-1">Exercise 1</NavLink>
  </li>
  <li>
    <NavLink exact activeClassName="selected" to="/exercise-2">Exercise 2</NavLink>
  </li>
  <li>
    <NavLink exact activeClassName="selected" to="/exercise-3">Exercise 3</NavLink>
  </li>
</ul>
);

function Home() {
  return (
    <div>
      <h2>Check out some of the exercises above</h2>
    </div>
  );
}

