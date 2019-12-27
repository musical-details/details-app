import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Content.scss";
import TrackComponent from "../../pages/track/track";
import GlobalPlayer from "../global-player/global-player";
import { useParams } from "react-router";
import MyProfileComponent from "../../pages/my-profile/my-profile";

const Content: React.FC = () => {
  return (
    <div className="content">
      <div className="global-player-wrapper">
        <GlobalPlayer />
      </div>
      <div className="pages">
        <Route exact path="/track/:trackId/" component={TrackComponent} />
        <Route exact path="/my-profile" component={MyProfileComponent} />
      </div>
    </div>
  );
};

export default Content;
