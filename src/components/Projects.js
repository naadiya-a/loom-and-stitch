import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Projects = () => {
  return (
    <Router>
      <div className="grid grid-cols-8 md:grid-cols-12 gap-2 text-center">
        <Link to="#" className="col-start-7 md:col-start-11 col-span-1">
          Account
        </Link>
        <Link to="#" className="col-start-8 md:col-start-12 col-span-1">
          Sign out
        </Link>
      </div>

      <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
        <button className="col-start-1 col-span-1">Edit</button>
        <button className="col-start-2 col-span-1">+</button>
      </div>

      <div className="grid grid-cols-8 md:grid-cols-12 gap-2 text-center project-boards">
        <button className="col-start-1 col-span-4 project-box">
          New Project
        </button>
        <p className="col-start-6 col-span-7 project-box">
          Select a project to view
        </p>
      </div>
    </Router>
  );
};

export default Projects;
