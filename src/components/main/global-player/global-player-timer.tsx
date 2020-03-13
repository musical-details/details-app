import React, {Dispatch} from "react"
import { convertToMMSSMS } from "../../../utils/index";
import "./global-player-timer.scss"


type PlayerTimerProps = {
    time: number;
}

type PlayerTimersProps = {
    currentTime: number;
    duration: number;
}

const GlobalPlayerTimer: React.FC<PlayerTimerProps> = (
    props: PlayerTimerProps
) => {
    const time = convertToMMSSMS(props.time);
    return (
        <div className="player-timer-block">
            {time.m}:{time.s}
        </div>
    )
}

class GlobalPlayerTimers extends React.Component<PlayerTimersProps> {
    constructor(props: PlayerTimersProps){
        super(props);
    }

    render() {
        return(
            <div className="player-timers-container">
                <GlobalPlayerTimer time={this.props.currentTime}/>
                <GlobalPlayerTimer time={this.props.duration}/>
            </div>
        )
    }
}

export default GlobalPlayerTimers;