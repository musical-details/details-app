import React, { Dispatch } from "react";

import { AppState } from "../../../core/state/store";
import { connect, ConnectedComponent } from "react-redux";
import { Moment } from "../../../core/state/ducks/viewed-track/viewed-track.state";

import viewedTrackSelectors from "../../../core/state/ducks/viewed-track/viewed-track.selectors"

import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

import CSS from "csstype";
import "./mini-timeline.scss";
import { runInThisContext } from "vm";
import viewedTrackActions from "../../../core/state/ducks/viewed-track/viewed-track.actions";
import viewedTrackOperations from "../../../core/state/ducks/viewed-track/viewed-track.operations";
import { viewedTrack } from "../../../core/state/ducks";
import trackActions from "../../../core/state/ducks/track/track.actions";

type momentsArrProps = {
    name: string,
    description: string,
    color: string,
    start: number,
    end: number,
    timelineSection: 1 | 2 | 3 | 4 | 5
}

const momentsTmp: Array<momentsArrProps> = [
    {
        name:"Drums",
        description:"",
        color:"#e0d942",
        start:10,
        end:12,
        timelineSection:1,
    },
    {
        name:"Drums",
        description:"",
        color:"#e0d942",
        start:13,
        end:22,
        timelineSection:2,
    },
    {
        name:"Snare",
        description:"",
        color:"#f94922",
        start:18,
        end:20,
        timelineSection:3
    },
    {
        name:"Drop",
        description:"",
        color:"#bc209b",
        start:25,
        end:32,
        timelineSection:4
    },
    {
        name:"Buildup",
        description:"",
        color:"#e0d942",
        start:28,
        end:32,
        timelineSection:2
    },
    {
        name:"Keys",
        description:"",
        color:"#755e7b",
        start: parseFloat("6.800"),
        end:parseFloat("6.900"),
        timelineSection:3
    },
    {
        name:"Groove",
        description:"",
        color:"#ff8870",
        start: 100,
        end: 101,
        timelineSection:2
    },
    {
        name:"Groove",
        description:"",
        color:"#755e7b",
        start: 90,
        end: 101,
        timelineSection:4
    },
    {
        name:"Hi-Hats",
        description:"",
        color:"#c36fda",
        start:230,
        end:240,
        timelineSection:2
    },
    {
        name:"Hi-Hats",
        description:"",
        color:"#c36fda",
        start:0,
        end:3,
        timelineSection:5
    }
]

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
   
}

class MiniTimeline extends React.Component <MiniTimelineProps, MiniTimelineState>{

    state: MiniTimelineState = {
        dragStartPosition: 0
    }
        
    constructor(props: MiniTimelineProps) {
        super(props);
    }

    createMoments(): Array<JSX.Element> {
        let moments: Array<JSX.Element> = [];
        let containerStyle: CSS.Properties;
        let momentStyle: CSS.Properties;

        let secondsFactor = 7;

        for(let moment of momentsTmp) {

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
        console.log(event);
        console.log(data);
        const value = this.props.duration * 7 / 840;
        
    }

    handleActiveBoxStart = (event: DraggableEvent, data: DraggableData): void => {
        //console.log(data)
        this.setState({
            dragStartPosition: data.x
        })
    }

    handleActiveBoxEnd = (event: DraggableEvent, data: DraggableData): void => {
        const delta = data.x - this.state.dragStartPosition;
        const newTime = this.props.currentTime + (delta / 7)*(this.props.duration * 7 / 840);
        this.props.onNewCurrentTime(newTime);
    }

    countNewCurrentTime = (): void => {

    }

    render() {
        
        const value = this.props.duration * 7 / 840;
        console.log(value);

        let fullStyle: CSS.Properties = {
            width: this.props.duration * 7 + "px"
        }

        // let draggableContainerStyle: CSS.Properties = {
        //     width: this.props.duration * 7 + 200 + "px"
        // }

        return (    
            <div className="mini-timeline-container">
                <div className="draggable-container">
                    <Draggable
                        axis="x"
                        bounds=".draggable-container"
                        
                        //grid={[secondWidth / 2, sectionHeight]}
                        //position={{ x: xPosition, y: yPosition }}
                        onStart={this.handleActiveBoxStart}
                        //onDrag={this.handleActiveBoxDrag}
                        onStop={this.handleActiveBoxEnd}
                        cancel=".react-resizable-handle-w, .react-resizable-handle-e"
                    >
                    <div className="mini-timeline-active-box">
                        {/* <div className="active-box-cursor"></div> */}
                    </div>
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