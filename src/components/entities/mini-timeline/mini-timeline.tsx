import React, { Dispatch } from "react";

import { AppState } from "../../../core/state/store";
import { connect, ConnectedComponent } from "react-redux";
import { Moment } from "../../../core/state/ducks/viewed-track/viewed-track.state";
import viewedTrackSelectors from "../../../core/state/ducks/viewed-track/viewed-track.selectors"
import trackActions from "../../../core/state/ducks/track/track.actions";

import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

import CSS from "csstype";
import "./mini-timeline.scss";

type momentsArrProps = {
    name: string,
    description: string,
    color: string,
    start: number,
    end: number,
    timelineSection: 1 | 2 | 3 | 4 | 5
}

const mapStateToProps = (state: AppState): MiniTimelineProps | any => ({
    currentTime: state.track.currentTime,
    duration: state.track.duration,
    moments: viewedTrackSelectors.getSelectedMoments(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>): MiniTimelineProps | any => ({
    onNewCurrentTime: (time: number) => {dispatch(trackActions.setAudioNewTime(time));}
})

type MiniTimelineProps = {
    currentTime: number;
    duration: number;
    moments: Array<Moment>;
    onNewCurrentTime: (time: number) => void;
}

type MiniTimelineMomentProps = {
    width: number;
    color: string;
    start: number;
    end: number;
}

type MiniTimelineState = {
    dragStartPosition: number;
    fullOffset: number;
    
}

class MiniTimeline extends React.Component <MiniTimelineProps, MiniTimelineState>{

    state: MiniTimelineState = {
        dragStartPosition: 0,
        fullOffset: 0
    }
        
    constructor(props: MiniTimelineProps) {
        super(props);
    }

    createMoments(): Array<JSX.Element> {
        let moments: Array<JSX.Element> = [];
        let containerStyle: CSS.Properties;
        let momentStyle: CSS.Properties;

        let secondsFactor = 7;

        for(let moment of this.props.moments) {

            containerStyle = {
                width: `${((moment.end - moment.start)*secondsFactor)}px`,
                maxHeight: 'calc(100% - 20%)',
                top: `${moment.timelineSection * 20 - 20}%`,
                transform: `translate(${moment.start *secondsFactor}px)`,
            }

            momentStyle = {
                backgroundColor: moment.color
            }

            moments.push(
                <div className="mini-moment-container" style={containerStyle}>
                    <div className="mini-moment" style={momentStyle}></div>
                </div>
            );
        }
        return moments
    }

    handleActiveBoxDrag = (event: DraggableEvent, data: DraggableData): void =>{         
        this.setActiveBoxLeftProperty(data.x)
    }

    handleActiveBoxStart = (event: DraggableEvent, data: DraggableData): void => {
        this.setState({
            dragStartPosition: data.x
        })
    }

    handleActiveBoxEnd = (event: DraggableEvent, data: DraggableData): void => {
        const delta = data.x - this.state.dragStartPosition;
        const newTime = this.props.currentTime + (delta / 7) * (this.props.duration * 7 / 840);
        this.props.onNewCurrentTime(newTime);     
    }

    setActiveBoxLeftProperty = (positionX: number): void => {
        let offset = -( positionX *(this.props.duration * 7 / 840) ) / (this.props.duration * 7 / 840)
        this.setState({
            fullOffset: offset
        })
    }

    render() {

        let fullStyle: CSS.Properties = {
            width: this.props.duration * 7 + "px",
            transform: `translate(${this.state.fullOffset}px)`
        }

        return (    
            <div className="mini-timeline-container">
                <div className="draggable-container">
                    <Draggable
                        axis="x"
                        bounds=".draggable-container"
                        onStart={this.handleActiveBoxStart}
                        onDrag={this.handleActiveBoxDrag}
                        onStop={this.handleActiveBoxEnd}
                        cancel=".react-resizable-handle-w, .react-resizable-handle-e"
                    >
                    <div className="mini-timeline-active-box"></div>
                    </Draggable>
                </div>
                <div className="mini-timeline-full" style={fullStyle}>
                    {this.createMoments()}
                </div>
            </div>
        )
    }
}


const MiniTimelineContainer: ConnectedComponent<typeof MiniTimeline, any> = connect(mapStateToProps, mapDispatchToProps)(MiniTimeline);

export default MiniTimelineContainer;