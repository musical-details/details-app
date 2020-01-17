import React, { Dispatch } from "react";
import CSS from "csstype";
import "./timeline-moment-contextmenu.scss";
import options from "./options.json";
import { AppState } from "../../../core/state/store";
import { connect, ConnectedComponent } from "react-redux";

const mapStateToProps = (
  state: AppState
): TimelineMomentContextmenuProps | any => ({
  isHidden: state.view.timelineMomentContextMenu.isHidden,
  x: state.view.timelineMomentContextMenu.position.x,
  y: state.view.timelineMomentContextMenu.position.y
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): TimelineMomentContextmenuProps | any => ({});

type TimelineMomentContextmenuProps = {
  isHidden: boolean;
  x: number;
  y: number;
};

type TimelineMomentContextmenuState = {};

class TimelineMomentContextmenu extends React.Component<
  TimelineMomentContextmenuProps,
  TimelineMomentContextmenuState
> {
  constructor(props: TimelineMomentContextmenuProps) {
    super(props);
  }

  render() {
    const { isHidden, x, y } = this.props;

    const TimelineMomentContextmenuStyles: CSS.Properties = {
      display: !isHidden ? "none" : "block",
      transform: `translate(${x}px, ${y}px)`
    };

    return (
      <div
        className="timeline-moment-contextmenu"
        style={TimelineMomentContextmenuStyles}
      >
        <div className="options-wrapper">
          <ul>
            {options.map(option => (
              <li>
                <i className={`${option.icon}`} />
                <span>{option.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const TimelineMomentContextmenuContainer: ConnectedComponent<
  typeof TimelineMomentContextmenu,
  any
> = connect(mapStateToProps, mapDispatchToProps)(TimelineMomentContextmenu);

export default TimelineMomentContextmenuContainer;
