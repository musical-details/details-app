import React, { Dispatch } from "react";

import { AppState } from "../../../core/state/store";
import { connect, ConnectedComponent } from "react-redux";
import { Moment } from "../../../core/state/ducks/viewed-track/viewed-track.state";

import viewedTrackSelectors from "../../../core/state/ducks/viewed-track/viewed-track.selectors"
import TimelineMoment from "../timeline-moment/TimelineMoment";

import CSS from "csstype";
import "./mini-timeline.scss"

type momentsArrProps = {
    name: string,
    description: string,
    color: string,
    start: number,
    end: number,
    timelineSection: number
}

const momentsTmp: Array<momentsArrProps> = [
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
        start:6,
        end:7,
        timelineSection:3
    },
    {
        name:"Groove",
        description:"",
        color:"#ff8870",
        start: 100,
        end: 120,
        timelineSection:2
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
        end:322,
        timelineSection:2
    }
]

const mapStateToProps = (state: AppState): MiniTimelineProps | any => ({
    currentTime: state.track.currentTime,
    duration: state.track.duration,
    moments: viewedTrackSelectors.getSelectedMoments(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>): MiniTimelineProps | any => ({

})

type MiniTimelineProps = {
    currentTime: number;
    duration: number;
    moments: Array<Moment>;
}

type MiniTimelineMomentProps = {
    width: number;
    color: string;
    start: number;
    end: number;
}

class MiniTimeline extends React.Component <MiniTimelineProps>{

    constructor(props: MiniTimelineProps) {
        super(props);
    }

    
    MiniTimelineMoment = (): JSX.Element | any => {

    }

    createMoments(): Array<JSX.Element> {
        let moments: Array<JSX.Element> = [];
        let containerStyle: CSS.Properties;

        for(let moment of momentsTmp) {
            
            containerStyle = {
                width: `${((moment.end - moment.start)*7)}px`,
                height: '20%',
                top: `${moment.timelineSection * 20}%`,
                transform: `translate(${moment.start * 7}px)`,
                backgroundColor: moment.color
            }
            moments.push(
                <div className="mini-moment-container" style={containerStyle}>
                </div>
            );
        }

        return moments
    }


    render() {
        return (    
            <div className="mini-timeline-container">
                {this.createMoments()}
            </div>
        )
    }
}


const MiniTimelineContainer: ConnectedComponent<typeof MiniTimeline, any> = connect(mapStateToProps, mapDispatchToProps)(MiniTimeline);

export default MiniTimelineContainer;