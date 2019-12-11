import React from "react";
import Timeline from '../../entities/timeline/Timeline'

class TrackComponent extends React.Component {
  render() {
    return (
      <div>
        <div>"Track Info & Player" section</div>
        <div>"Track Waver" section</div>
        <Timeline />
        <div>"Track Description" section</div>
      </div>
    );
  }
}

export default TrackComponent;
