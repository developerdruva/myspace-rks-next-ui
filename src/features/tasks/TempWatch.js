"use client";
import { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material';

const TempWatch = () => {
    const [runner, setRunner] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currTime, setCurrTime] = useState(0);
    const intervalRef = useRef(null);
    // const startTimeRef = useRef(0);
    // const [intervalRef, setIntervalRef] = useState(0)



    useEffect(() => {
        console.log('hi there')
        if (runner) {
            intervalRef.current = setInterval(() => {
                // setTimeElapsed(Date.now() - startTimeRef.current)
                setTimeElapsed(Date.now() - currTime)
            }, 10);
        }

        return () => {
            clearInterval(intervalRef.current)
        }
    }, [runner])

    const timeFormat = () => {
        let hours = Math.floor((timeElapsed) / (1000 * 60 * 60))
        let minutes = Math.floor((timeElapsed) / (1000 * 60) % 60)
        let seconds = Math.floor((timeElapsed) / (1000) % 60)
        let milliseconds = Math.floor((timeElapsed % 1000) / 60)
        hours = String(hours).padStart(2, '0')
        minutes = String(minutes).padStart(2, '0')
        seconds = String(seconds).padStart(2, '0')
        milliseconds = String(milliseconds).padStart(2, '0')

        return `${hours}: ${minutes}: ${seconds}: ${milliseconds}`
    }
    const start = () => {
        setRunner(true);
        // startTimeRef.current = Date.now() - timeElapsed;
        setCurrTime(Date.now() - timeElapsed);
        // console.log('startime ref ', startTimeRef.current);
    }
    const pause = () => {
        setRunner(!runner)
    }
    const stop = () => {
        setRunner(false)
        setTimeElapsed(0)
    }
    // let arr = [1,['no',{name:'test', email:'test@test.com',[1,2,[3,4]], {abc:false}}]];
    // [1,'no',{name:'test'},1,2,3,4,{abc:flase}]
    return (
        <div>
            <h1>{intervalRef.current}- {timeElapsed}</h1>
            <div>
                {timeFormat()}
            </div>
            <div className=''>
                <Button onClick={() => start()} >Start</Button>
                <Button onClick={() => pause()} >Pause</Button>
                <Button onClick={() => stop()} >Stop</Button>
                {/* <Button onClick={()=>start()} >Start</Button> */}
            </div>
        </div>
    )
}

export default TempWatch