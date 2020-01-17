import React, { SyntheticEvent } from "react";

import "./timeline-moment-editable.scss";
import TimelineMoment from "../timeline-moment/TimelineMoment";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

import { Moment, Seconds, Pixels, MomentSection } from "../../../core/shared";
import Resizable, {
  ResizeCallbackData
} from "../../shared/resizable/resizable";

type TimelineMomentEditableProps = {
  moment: Moment;
  currentTime: Seconds;
  onVerticalPositionChange: (newSection: MomentSection) => void;
  onHorizontalPositionChange: (newStart: Seconds) => void;
  onLeftSideResize: (newStart: Seconds) => void;
  onRightSideResize: (newEnd: Seconds) => void;
};

type TimelineMomentEditableState = {};

class TimelineMomentEditable extends React.Component<
  TimelineMomentEditableProps,
  TimelineMomentEditableState
> {
  static sectionHeight: Pixels = 70;
  static secondWidth: Pixels = 28;
  timeout: NodeJS.Timeout = setTimeout(() => {}, 0);

  state: TimelineMomentEditableState = {};

  constructor(props: TimelineMomentEditableProps) {
    super(props);
  }

  componentDidMount() {}

  handleNewMomentDragStart = (
    event: DraggableEvent,
    data: DraggableData
  ): void => {};

  handleNewMomentDrag = (
    event: DraggableEvent,
    data: DraggableData
  ): void => {};

  handleNewMomentDragStop = (
    event: DraggableEvent,
    data: DraggableData
  ): void => {
    const { secondWidth, sectionHeight } = TimelineMomentEditable;
    const sectionNumber: number = data.lastY / sectionHeight;
    const section: MomentSection =
      sectionNumber >= 0 && sectionNumber <= 4
        ? (sectionNumber as MomentSection)
        : 0;

    const start: Seconds = data.lastX / secondWidth;

    this.props.onVerticalPositionChange(section);
    this.props.onHorizontalPositionChange(start);
  };

  handleNewMomentResizeStart = (
    event: DraggableEvent,
    data: ResizeCallbackData
  ): void => {
    console.clear();
    console.log(data.size.width);
  };

  handleNewMomentResize = (
    event: DraggableEvent,
    data: ResizeCallbackData
  ): void => {
    const { handler, size } = data;
    const { secondWidth } = TimelineMomentEditable;

    if (handler === "w") {
      const { end } = this.props.moment;
      const newStart: Seconds = -(size.width / secondWidth) + end;
      this.props.onLeftSideResize(newStart);
      return;
    }
    if (handler === "e") {
      const { start } = this.props.moment;
      const newEnd: Seconds = size.width / secondWidth + start;
      this.props.onRightSideResize(newEnd);
      return;
    }
  };

  handleNewMomentResizeStop = (
    event: DraggableEvent,
    data: ResizeCallbackData
  ) => {};

  handleSelect = (event: SyntheticEvent): void => {
    event.preventDefault();
    return;
  };

  handleContextMenu = (event: SyntheticEvent): void => {
    return;
  };

  render() {
    const { secondWidth, sectionHeight } = TimelineMomentEditable;
    const {
      handleNewMomentDragStart,
      handleNewMomentDrag,
      handleNewMomentDragStop,
      handleNewMomentResizeStart,
      handleNewMomentResize,
      handleNewMomentResizeStop,
      handleSelect,
      handleContextMenu
    } = this;
    const { start, end, section } = this.props.moment;

    const xPosition: number = start * secondWidth;
    const yPosition: number = section * sectionHeight;
    const width: number = (end - start) * secondWidth;

    return (
      <div className="timeline-moment-editable">
        <Draggable
          axis="both"
          bounds=".timeline-full"
          grid={[secondWidth / 2, sectionHeight]}
          position={{ x: xPosition, y: yPosition }}
          onStart={handleNewMomentDragStart}
          onDrag={handleNewMomentDrag}
          onStop={handleNewMomentDragStop}
          cancel=".resizable-handle"
        >
          <div className="draggable-zone" style={{ width: `${width}px` }}>
            <Resizable
              className="resizable-zone"
              realWidth={width}
              realHeight={sectionHeight}
              directions={["w", "e"]}
              onResizeStart={handleNewMomentResizeStart}
              onResize={handleNewMomentResize}
              onResizeStop={handleNewMomentResizeStop}
              draggableOpts={{ bounds: ".timeline-full" }}
            >
              <div
                className="resizable-zone"
                onSelect={handleSelect}
                onContextMenu={handleContextMenu}
              >
                <>
                  <TimelineMoment
                    moment={{
                      ...this.props.moment,
                      start: 0,
                      end: 0,
                      section: 0
                    }}
                    isFullWidth={true}
                    currentTime={this.props.currentTime}
                  />
                </>
              </div>
            </Resizable>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default TimelineMomentEditable;
