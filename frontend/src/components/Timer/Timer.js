import React, { useState,useEffect,useRef } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../Timer/timer.css"
import ReactSlider from "react-slider";

function Timer({ timerHandler,name }) {
  const [isPaused,setIsPaused] = useState(true)
  
  const red = "#ea0823";
  const green = "#15f207"

  const [workMinutes,setWorkMinutes] = useState(30)
  const [breakMinutes,setBreakMinutes] = useState(10)
  const[secondsLeft,setSecondsLeft] = useState(0)
  const [mode,setMode]=useState("work") //work,break,null

  const secondsLeftRef =useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);


  function initTimer(){
    setSecondsLeft(workMinutes*60);
  }

  function tick(){
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
    
  }

 function switchMode(){
  const nextMode = modeRef.current === 'work'? 'break' : 'work';
  const nextSeconds = (nextMode === 'work'? workMinutes : breakMinutes) * 60;
  
  setMode(nextMode);
  modeRef.current = nextMode;
  setSecondsLeft(nextSeconds);
  secondsLeftRef.current = nextSeconds;
 }

  function setAlarm(){
    return 
  }

  useEffect(()=>{
    initTimer()
    
    const interval = setInterval(()=>{
      if (isPausedRef.current){
        return
      }
      if(secondsLeftRef.current==0){
        // setIsPaused(true);
        // setAlarm();
        switchMode();
      }

      tick();
    },1000)

    return ()=>clearInterval(interval);
  },[workMinutes,breakMinutes,isPaused,secondsLeft])

  const totalSeconds = mode === 'work' ? workMinutes * 60 : breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100); 

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if(seconds < 10) seconds = '0'+seconds;

  return (
    <main>
      <div className="position-absolute top-50 start-50 translate-middle" style={{ width: 450, height: 300 }}>
        <h1>{name}</h1>
        <br />
        <CircularProgressbar value={percentage} text={minutes + ':' + seconds}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',

            // Text size
            textSize: '16px',

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: mode === "work"? red : green,
            textColor: '#f88',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })} />
          
        <div className="buttons">
          <div>
            {isPaused?<button onClick={()=>{setIsPaused(false); isPausedRef.current = false}}>Play</button>
            :
            <button onClick={()=>{setIsPaused(true); isPausedRef.current = true}}>Pause</button>}
          
          
          </div>
          
          <button onClick={() => timerHandler(name)}>Back</button>
        </div>

        <div className="settings">
          <label>Work minutes:{workMinutes}</label>
          <ReactSlider
            className={'slider'}
            thumbClassName={'thumb'}
            trackClassName={'track'}
            onChange={newValue=> setWorkMinutes(newValue)}
            value={workMinutes}
            min={10}
            max={60}
          />

          <label>Break minutes:{breakMinutes}</label>
          <ReactSlider
            className={'slider green'}
            thumbClassName={'thumb green'}
            trackClassName={'track'}
            onChange={newValue=>setBreakMinutes(newValue)}
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