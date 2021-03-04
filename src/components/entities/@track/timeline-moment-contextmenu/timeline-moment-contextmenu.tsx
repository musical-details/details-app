import React, { Dispatch, RefObject } from "react";
import CSS from "csstype";
import "./timeline-moment-contextmenu.scss";
import options from "./options.json";
import { AppState } from "../../../../core/store/store";
import { connect, ConnectedComponent } from "react-redux";

const mapStateToProps = (
  state: AppState
): TimelineMomentContextmenuProps | any => ({
  isHidden: state.view.timelineMomentContextMenu.isHidden,
  x: state.view.timelineMomentContextMenu.position.x,
  y: state.view.timelineMomentContextMenu.position.y,
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
  contextMenuRef: React.RefObject<HTMLDivElement>;
  constructor(props: TimelineMomentContextmenuProps) {
    super(props);
    this.contextMenuRef = React.createRef();
  }

  render() {
    const { isHidden, x, y } = this.props;

    const TimelineMomentContextmenuStyles: CSS.Properties = {
      display: isHidden ? "none" : "block",
      transform: `translate(${x}px, ${y}px)`,
    };

    return (
      <div
        className="timeline-moment-contextmenu"
        style={TimelineMomentContextmenuStyles}
        ref={this.contextMenuRef}
      >
        <div className="options-wrapper">
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <i
                  className={`${option.icon}`}
                  style={{ color: option.color }}
                />
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
