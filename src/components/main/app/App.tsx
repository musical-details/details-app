import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Menu from "../menu/Menu";
import Content from "../content/Content";

import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <div className="menu-wrapper">
          <Menu />
        </div>
        <div className="content-wrapper">
          <Content />
        </div>
      </div>
    </Router>
  );
};

export default App;
