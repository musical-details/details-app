import React from "react";

import "./rate.scss";
import { API_KEY } from "../../../core/soundcloud";
import { withRouter } from "react-router-dom";

class RateComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  async fetchTrackInfo(url: string): Promise<any> {
    const apiUrl = `https://api.soundcloud.com/resolve?url=${url}&client_id=${API_KEY}`;
    try {
      const response: Response = await fetch(apiUrl);
      const data: any = await response.json();
      this.props.history.push(`/track/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  handleKeyDown = (event: React.KeyboardEvent | any) => {
    if (event.key === "Enter") {
      this.fetchTrackInfo(event.target.value);
    }
  };

  render() {
    return (
      <div className="rate">
        <div>
          <input type="text" autoFocus onKeyDown={this.handleKeyDown} />
        </div>
      </div>
    );
  }
}

export default withRouter(RateComponent);
