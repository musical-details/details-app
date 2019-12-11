import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Content.scss";
import TrackComponent from "../../pages/track/track";

const Content: React.FC = () => {
  return (
    <div className="content">
      <Route exact path="/" component={TrackComponent} />
    </div>
  );
};

export default Content;
