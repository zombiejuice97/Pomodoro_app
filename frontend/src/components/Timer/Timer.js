import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../Timer/timer.css"
import ReactSlider from "react-slider";

function Timer({ timerHandler }) {
  const percentage = '60';
  return (
    <main>
      <div className="position-absolute top-50 start-50 translate-middle" style={{ width: 450, height: 300 }}>
        <CircularProgressbar value={60} text={'60%'}
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
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: '#f88',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })} />
          
        <div className="buttons">
          <button>Play</button>
          <button>Pause</button>
          <button onClick={() => timerHandler()}>Back</button>
        </div>

        <div className="settings">
          <label>Work minutes:</label>
          <ReactSlider
            className={'slider'}
            thumbClassName={'thumb'}
            trackClassName={'track'}
            value={45}
            min={10}
            max={120}
          />

          <label>Break minutes:</label>
          <ReactSlider
            className={'slider green'}
            thumbClassName={'thumb green'}
            trackClassName={'track'}
            value={20}
            min={5}
            max={30}
          />
        </div>
      </div>
    </main>
  )
}

export default Timer;