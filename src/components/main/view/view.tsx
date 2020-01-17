import React, { Dispatch } from "react";

import "./view.scss";
import { AppState } from "../../../core/state/store";
import { connect, ConnectedComponent } from "react-redux";
import TimelineMomentContextmenu from "../../entities/timeline-moment-contextmenu/timeline-moment-contextmenu";

const mapStateToProps = (state: AppState): ViewProps | any => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>): ViewProps | any => ({});

type ViewProps = {};
type ViewState = {};

class View extends React.Component<ViewProps, ViewState> {
  constructor(props: ViewProps) {
    super(props);
  }

  render() {
    return (
      <div className="view">
        <TimelineMomentContextmenu />
      </div>
    );
  }
}

const ViewContainer: ConnectedComponent<typeof View, any> = connect(
  mapStateToProps,
  mapDispatchToProps
)(View);

export default ViewContainer;
