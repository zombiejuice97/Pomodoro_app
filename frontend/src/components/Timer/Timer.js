import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../Timer/timer.css"
import ReactSlider from "react-slider";
import alarm from "../Timer/alarm/alarm.wav"

function Timer({ timerHandler, name }) {
  const [isPaused, setIsPaused] = useState(true)

  const red = "#ea0823";
  const green = "#05df12"

  const [workMinutes, setWorkMinutes] = useState(30)
  const [breakMinutes, setBreakMinutes] = useState(10)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [mode, setMode] = useState("work") //work,break,null
  

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);


  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);

  }

  

  function ring() {
    new Audio(alarm).play();
  }

  useEffect(() => {

    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? workMinutes : breakMinutes) * 60;
  
      setMode(nextMode);
      modeRef.current = nextMode;
      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return
      }
      if (secondsLeftRef.current == 0) {
        isPausedRef.current = true;
        ring();
        switchMode();
      }

      tick();
    }, 1000)

    return () => clearInterval(interval);
  }, [workMinutes, breakMinutes, setWorkMinutes,setBreakMinutes])

  const totalSeconds = mode === 'work' ? workMinutes * 60 : breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  return (
    <main>
      <div className="position-absolute top-50 start-50 translate-middle" style={{ width: 450, height: 300 }}>
        <h1 style={{color:"white"}}>{name}</h1>
        <br />
        <CircularProgressbar value={percentage} text={minutes + ':' + seconds}
          styles={buildStyles({
            rotation: 0.25,
            strokeLinecap: 'butt',
            textSize: '16px',
            pathTransitionDuration: 0.5,
            pathColor: mode === "work" ? red : green,
            textColor: '#f88',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })} />

        <div className="buttons">
          
            {isPaused ? <button onClick={() => { setIsPaused(false); isPausedRef.current = false }}>Play</button>
              :
              <button onClick={() => { setIsPaused(true); isPausedRef.current = true }}>Pause</button>}
          

        </div>

        <button className="back" onClick={() => timerHandler(name)}>Back</button>

        <div className="settings">
          <label>Work minutes:{workMinutes}</label>
          <ReactSlider
            className={'slider'}
            thumbClassName={'thumb'}
            trackClassName={'track'}
            onChange={newValue => setWorkMinutes(newValue)}
            value={workMinutes}
            min={10}
            max={60}
          />

          <label>Break minutes:{breakMinutes}</label>
          <ReactSlider
            className={'slider green'}
            thumbClassName={'thumb green'}
            trackClassName={'track'}
            onChange={newValue => setBreakMinutes(newValue)}
            value={breakMinutes}
            min={5}
            max={30}
          />
        </div>
      </div>
    </main>
  )
}

export default Timer;