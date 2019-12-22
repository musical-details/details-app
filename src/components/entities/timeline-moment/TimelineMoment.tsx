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
    currentTime: number;
}

class TimelineMoment extends React.Component<TimelineMomentProps> {

    constructor(props: TimelineMomentProps) {
        super(props);
        
    }

    countWidth = () => {
        return (this.props.end - this.props.start)/1000*28;
    }


    
    render () {
        let momentContainerStyleNormal: CSS.Properties = {
            width: `${this.countWidth()}px`, 
            transform: `translate(${(this.props.start)*28/1000}px)`,
            display: 'inline-block',
            borderBottom: `6px solid ${this.props.color}`,
            backgroundColor: this.props.color + '50'
        }

        let momentContainerStyleHighlight: CSS.Properties = {
            width: `${this.countWidth()}px`, 
            transform: `translate(${(this.props.start)*28/1000}px)`,
            display: 'inline-block',
            borderBottom: `6px solid ${this.props.color}`,
            backgroundColor: this.props.color + '90'
        }
        

        let getMomentContainerStyle = (): CSS.Properties => {
            return (this.props.currentTime >= this.props.start/1000 && this.props.currentTime <= this.props.end/1000)
           ? momentContainerStyleHighlight
           : momentContainerStyleNormal;
        }
        
        return (
            <div className="moment-container" style={getMomentContainerStyle()}>
                <div className="moment-name" style={{color: this.props.color}}>
                    {this.props.name}
                </div>
            </div>
        );
    }
    
}

export default TimelineMoment;