import React, { RefObject, ReactElement } from "react";
import { DraggableCore, DraggableEvent, DraggableData } from "react-draggable";
import CSS from "csstype";

import "./ResizePanel.scss";

type Direction = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

export type ResizeCallbackData = {
  size: { width: number; height: number };
  handler: Direction;
};

type ResizePanelProps = {
  children?: ReactElement<any>;
  className?: string;
  realWidth: number;
  realHeight: number;
  directions: Array<Direction>;
  onResizeStop: (event: DraggableEvent, data: ResizeCallbackData) => any;
  onResizeStart: (event: DraggableEvent, data: ResizeCallbackData) => any;
  onResize: (event: DraggableEvent, data: ResizeCallbackData) => any;
  draggableOpts?: Object;
};

type ResizePanelState = {
  virtualStartWidth: number;
  virtualDeltaWidth: number;
  virtualCurrentWidth: number;
  virtualStartHeight: number;
  virtualDeltaHeight: number;
  virtualCurrentHeight: number;
  startClientX: number;
  startClientY: number;
};

class ResizePanel extends React.Component<ResizePanelProps, ResizePanelState> {
  state: ResizePanelState = {
    virtualStartWidth: 0,
    virtualDeltaWidth: 0,
    virtualCurrentWidth: 0,
    virtualStartHeight: 0,
    virtualDeltaHeight: 0,
    virtualCurrentHeight: 0,
    startClientX: 0,
    startClientY: 0
  };

  constructor(props: ResizePanelProps) {
    super(props);
  }

  isHorizontal = (direction: Direction): boolean =>
    direction === "w" || direction === "e";

  isInverted = (direction: Direction): boolean =>
    direction === "s" || direction === "e";

  componentDidMount() {
    this.setState({
      virtualStartWidth: this.props.realWidth,
      virtualStartHeight: this.props.realHeight
    });
  }

  getNextWidth = (handler: Direction) => {
    const { virtualStartWidth, virtualDeltaWidth } = this.state;
    const factor: number = this.isInverted(handler) ? -1 : 1;
    return Math.max(10, virtualStartWidth - virtualDeltaWidth * factor);
  };

  handleDrag = (handler: Direction, event: DraggableEvent) => {
    const { virtualCurrentWidth, virtualCurrentHeight } = this.state;

    const nextWidth: number = this.getNextWidth(handler);
    this.setState({ virtualCurrentWidth: nextWidth });
    this.props.onResize(event, {
      handler: handler,
      size: { width: virtualCurrentWidth, height: virtualCurrentHeight }
    });
  };

  handleDragStart = (event: DraggableEvent | any, data: DraggableData) => {
    this.setState({
      virtualCurrentWidth: this.state.virtualStartWidth,
      startClientX: event.clientX
    });
  };

  handleStop = (event: DraggableEvent | any, data: DraggableData) => {
    this.setState({
      virtualDeltaWidth: event.clientX - this.state.startClientX,
      virtualStartWidth: this.props.realWidth
    });
  };

  createHandler = (direction: Direction): JSX.Element => {
    const onDrag = (event: DraggableEvent | any, data: DraggableData) => {
      const newDelta: number = event.clientX - this.state.startClientX;
      this.setState({ virtualDeltaWidth: newDelta });
      this.handleDrag(direction, event);
    };

    return (
      <DraggableCore
        key={`handle-${direction}`}
        onStart={this.handleDragStart}
        onDrag={onDrag}
        onStop={this.handleStop}
        {...this.props.draggableOpts}
      >
        <span className={`resizable-handle ${direction}`} />
      </DraggableCore>
    );
  };

  render() {
    const { realWidth, realHeight } = this.props;
    const resizableWrapperStyles: CSS.Properties = {
      width: `${realWidth}px`,
      height: `${realHeight}px`
    };
    return (
      <div className="resizable-wrapper" style={resizableWrapperStyles}>
        {this.createHandler("e")}
        {this.createHandler("w")}
        {this.props.children}
      </div>
    );
  }
}

export default ResizePanel;
