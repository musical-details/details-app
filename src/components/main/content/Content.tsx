import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Content.scss";
import TrackComponent from "../../pages/TrackPage/TrackPage";
import GlobalPlayer from "../global-player/global-player";
import MyProfileComponent from "../../pages/ProfilePage/ProfilePage";
import RateComponent from "../../pages/RatePage/rate";
import AccessContainer from "../../pages/JoinPage/JoinPage";

const Content: React.FC = () => {
  return (
    <div className="content">
      <div className="global-player-wrapper">
        <GlobalPlayer />
      </div>
      <div className="pages">
        <Route
          exact
          path="/track/:trackId/(rating)?/:ratingId?"
          component={TrackComponent}
        />
        <Route exact path="/my-profile" component={MyProfileComponent} />
        <Route exact path="/rate" component={RateComponent} />
        <Route exact path="/access" component={AccessContainer} />
      </div>
    </div>
  );
};

export default Content;
