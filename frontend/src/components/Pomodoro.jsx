import React, { useState, useEffect, useRef } from "react";
import "../styles/Pomodoro.css";

function Pomodoro() {
    const [time, setTime] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("Pomodoro");
    const timerRef = useRef(null);

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60).toString().padStart(2, "0");
        let seconds = (time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setTime((time) => {
                    if (time >= 1) {
                        return time - 1;
                    } else {
                        clearInterval(timerRef.current);
                        setIsRunning(false);
                        alert(`${mode} is over!`);
                        return 0;
                    };
                });
            }, 1000); // every second
        }
    };

    const stopTimer = () => {
        if (isRunning){
            clearInterval(timerRef.current);
            setIsRunning(false);
        }
    };

    const resetTimer = () => {
        stopTimer();
        if (mode === "Pomodoro") {
            setTime(25 * 60);
        } else if (mode === "Short Break") {
            setTime(5 * 60);
        } else {
            setTime(15 * 60);
        }
    };

    const setModeAndTime = (newMode, newTime) => {
        stopTimer();
        setMode(newMode);
        setTime(newTime);
    };

    // cleanup function to clear the interval when the component is unmounted
    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    return (
        <>
        <div className="Pomodoro">
            <h1> {mode} </h1>
            <div className="timer">{formatTime(time)}</div>
            <div className="controls">
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
            <div className="mode-controls">
                <button onClick={() => setModeAndTime("Pomodoro", 25*60)}>Pomodoro</button>
                <button onClick={() => setModeAndTime("Short Break", 5*60)}>Short Break</button>
                <button onClick={() => setModeAndTime("Long Break", 15*60)}>Long Break</button>
            </div>
        </div>
        </>
    );
}

export default Pomodoro;
