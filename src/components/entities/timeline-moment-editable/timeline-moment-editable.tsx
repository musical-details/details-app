import React, { SyntheticEvent } from "react";

import "./timeline-moment-editable.scss";
import TimelineMoment from "../timeline-moment/TimelineMoment";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { Resizable, ResizableBox, ResizeCallbackData } from "react-resizable";
import { Moment, Seconds, Pixels, MomentSection } from "../../../core/shared";

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
  sectionHeight: Pixels = 70;
  secondWidth: Pixels = 28;

  constructor(props: TimelineMomentEditableProps) {
    super(props);
  }

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
    const sectionNumber: number = data.lastY / this.sectionHeight;
    const section: MomentSection =
      sectionNumber >= 0 && sectionNumber <= 4
        ? (sectionNumber as MomentSection)
        : 0;

    const start: Seconds = data.lastX / this.secondWidth;

    this.props.onVerticalPositionChange(section);
    this.props.onHorizontalPositionChange(start);
  };

  handleNewMomentResizeStart = (
    event: SyntheticEvent,
    data: ResizeCallbackData
  ): void => {
    console.clear();
    console.log(data.size.width);
  };

  handleNewMomentResize = (
    event: SyntheticEvent,
    data: ResizeCallbackData
  ): void => {
    event.stopPropagation();
    const { handle, size } = data;
    const { secondWidth } = this;
    if (handle === "w") {
      const { start, end } = this.props.moment;
      const newStart: Seconds = -(size.width / secondWidth) + end;
      this.props.onLeftSideResize(newStart);
      console.log(start, "=> ", newStart);
      return;
    }
    if (handle === "e") {
      const { start, end } = this.props.moment;
      const newEnd: Seconds = size.width / secondWidth + start;
      this.props.onRightSideResize(newEnd);
      console.log(end, "=>", newEnd);
      return;
    }
  };

  handleNewMomentResizeStop = (
    event: SyntheticEvent,
    data: ResizeCallbackData
  ) => {};

  handleSelect = (event: SyntheticEvent): void => {
    event.preventDefault();
    return;
  };

  render() {
    const {
      secondWidth,
      sectionHeight,
      handleNewMomentDragStart,
      handleNewMomentDrag,
      handleNewMomentDragStop,
      handleNewMomentResizeStart,
      handleNewMomentResize,
      handleNewMomentResizeStop,
      handleSelect
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
          cancel=".react-resizable-handle-w, .react-resizable-handle-e"
        >
          <div className="draggable-zone" style={{ width: `${width}px` }}>
            <Resizable
              className="resizable-zone"
              width={width}
              height={sectionHeight}
              resizeHandles={["w", "e"]}
              onResizeStart={handleNewMomentResizeStart}
              onResize={handleNewMomentResize}
              onResizeStop={handleNewMomentResizeStop}
              draggableOpts={{ grid: [28, 5] }}
            >
              <div className="resizable-zone" onSelect={handleSelect}>
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
              </div>
            </Resizable>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default TimelineMomentEditable;
