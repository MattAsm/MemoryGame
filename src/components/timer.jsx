import React, {useRef, useEffect, useState} from "react";
import './timer.css';

function Timer(){

    const [startTime, setStartTime] = useState(Date.now());
    const [timePassed, setTimePassed] = useState(0);

    useEffect(() =>{
       const timeTracker = setInterval(() => {
            const newTimePassed = Date.now() - startTime;
            setTimePassed(newTimePassed);
        }, 1000)

        return () => {
            clearInterval(timeTracker);
        };
   });
    
    function timeDisplay(){
        let minutes = Math.floor(timePassed / (1000 * 60));
        let seconds = Math.floor((timePassed / 1000) % 60);

        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${minutes}:${seconds}`;
    }

    return(
        <h1 id="timer">{timeDisplay()}</h1>
    );
}

export default Timer;