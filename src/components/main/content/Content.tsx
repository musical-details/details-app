import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Content.scss";
import TrackComponent from "../../pages/track/track";
import GlobalPlayer from "../global-player/global-player";

const Content: React.FC = () => {
  return (
    <div className="content">
      <div className="global-player-wrapper">
        <GlobalPlayer />
      </div>
      <div className="pages">
        <Route exact path="/" component={TrackComponent} />
      </div>
    </div>
  );
};

export default Content;
