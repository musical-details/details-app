import React, { Dispatch } from "react";

import "./view.scss";
import { AppState } from "../../../core/state/store";
import { connect, ConnectedComponent } from "react-redux";
import TimelineMomentContextmenu from "../../entities/timeline-moment-contextmenu/timeline-moment-contextmenu";

import * as tasks from "../../../core/state/ducks/tasks";

const mapStateToProps = (state: AppState): ViewProps | any => ({
  isContextMenuHidden: state.view.timelineMomentContextMenu.isHidden
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ViewProps | any => ({
  onCloseContextMenu: () => {
    dispatch(tasks.viewActions.hideTimelineMomentContextMenu());
  }
});

type ViewProps = {
  isContextMenuHidden: boolean;
  onCloseContextMenu: () => void;
};
type ViewState = {};

class View extends React.Component<ViewProps, ViewState> {
  constructor(props: ViewProps) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("contextmenu", event => {
      event.preventDefault();
    });
    document.addEventListener("click", event => {
      event.preventDefault();
      this.props.onCloseContextMenu();
    });
    document.addEventListener("scroll", event => {
      if (this.props.isContextMenuHidden) return;
      this.props.onCloseContextMenu();
    });
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
