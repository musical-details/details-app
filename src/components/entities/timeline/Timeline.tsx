import React from "react";

import TrackProps from '../../../core/track-props/TrackProps';
import MomentProps from '../../../core/moment-props/MomentProps';

import './Timeline.scss';


class Timeline extends React.Component{

    track: TrackProps;
    moments_arr: MomentProps[];
    curr_time: number;

    constructor(track: TrackProps, moments_arr: MomentProps[], curr_time: number){
        super(track, moments_arr);
        this.track = track; 
        this.moments_arr = moments_arr;
        this.curr_time = curr_time;
    }

    render() {
        return (
            <div id="timeline-container">
                
            </div>
        );
    }
}

export default Timeline; 