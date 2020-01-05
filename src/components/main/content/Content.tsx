import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Content.scss";
import TrackComponent from "../../pages/track/track";
import GlobalPlayer from "../global-player/global-player";
import { useParams } from "react-router";
import MyProfileComponent from "../../pages/my-profile/my-profile";
import RateComponent from "../../pages/rate/rate";
import AccessContainer from "../../pages/access/access";

const Content: React.FC = () => {
  return (
    <div className="content">
      <div className="global-player-wrapper">
        <GlobalPlayer />
      </div>
      <div className="pages">
        <Route exact path="/track/:trackId/" component={TrackComponent} />
        <Route exact path="/my-profile" component={MyProfileComponent} />
        <Route exact path="/rate" component={RateComponent} />
        <Route exact path="/access" component={AccessContainer} />
      </div>
    </div>
  );
};

export default Content;
