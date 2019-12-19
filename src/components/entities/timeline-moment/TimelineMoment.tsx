import React from "react";

//import MomentProps from '../../../core/moment-props/MomentProps';
import { ReactComponent } from "*.svg";
import Timeline from "../timeline/Timeline";

import './TimeLineMoment.scss'
import CSS from 'csstype';
import { start } from "repl";

type TimelineMomentProps = {
    name: string;
    color: string;
    start: number;
    end: number;
    trackDuration: number;
}

type TimelineMomentState = {
    width: number;
    trackDuration: number;
}

class TimelineMoment extends React.Component<TimelineMomentProps, TimelineMomentState> {

    state = {
        width: 40,
        trackDuration: 360000
    }

    constructor(props: TimelineMomentProps) {
        super(props);
        this.setState({
            width: this.countWidth(this.props.start, this.props.end),
            trackDuration: this.props.trackDuration
        });
    }

    countWidth = (start: number, end: number) => {
        return end - start;
    }

    componentDidUpdate(prevProps: TimelineMomentProps){
        if(prevProps.start != this.props.start || prevProps.end != this.props.end)
        this.setState({
            width: this.countWidth(this.props.start, this.props.end)
        });
        if(prevProps.trackDuration != this.props.trackDuration)
        this.setState({
            trackDuration: this.props.trackDuration
        });
    }
    


    render () {
        let momentContainerStyle: CSS.Properties = {
            backgroundColor: this.props.color,
            width: `${this.state.width}px`, 
            transform: `translate(${(this.state.trackDuration - this.props.start)/1000}px)`,
            display: 'inline-block'
        }
         
        return (
            <div className="moment-container" style={momentContainerStyle}>
                <div className="moment-name">
                    {this.props.name}
                </div>
            </div>
        );
    }
    
}

export default TimelineMoment;