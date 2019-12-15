import React from "react";

import "./global-player.scss";

class GlobalPlayer extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="global-player">
        <div>
          <div>
            <i className="icon-play"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalPlayer;
