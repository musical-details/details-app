import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { Store } from "redux";
import getStore from "../../../core/state/store";

import Menu from "../menu/Menu";
import Content from "../content/Content";

import "./App.scss";

const store: Store = getStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
