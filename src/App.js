import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Projects from "./components/Projects";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <div className="header">
        <h1>
          <Link to="/">Loom &amp; Stitch</Link>
        </h1>
        <div>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>

      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
