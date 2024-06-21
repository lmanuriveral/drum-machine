import React, { useState, useEffect } from 'react';
import DrumPad from './components/DrumPad';
import Display from './components/Display';
import './App.css';

const clips = [
  { keyCode: 81, keyTrigger: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { keyCode: 87, keyTrigger: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { keyCode: 69, keyTrigger: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { keyCode: 65, keyTrigger: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { keyCode: 83, keyTrigger: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { keyCode: 68, keyTrigger: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { keyCode: 90, keyTrigger: 'Z', id: 'Kick-n-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { keyCode: 88, keyTrigger: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { keyCode: 67, keyTrigger: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

function App() {
  const [display, setDisplay] = useState('');

  const handlePlaySound = (key) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error attempting to play audio:", error);
        });
      }
    }
    const clip = clips.find(c => c.keyTrigger === key);
    if (clip) {
      setDisplay(clip.id);
    }
  };

  const handleKeyPress = (event) => {
    const clip = clips.find(c => c.keyCode === event.keyCode);
    if (clip) {
      handlePlaySound(clip.keyTrigger);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine">
      <Display text={display} />
      <div className="pads-container">
        {clips.map(clip => (
          <DrumPad
            key={clip.id}
            clipId={clip.id}
            clip={clip.url}
            keyTrigger={clip.keyTrigger}
            handleClick={handlePlaySound}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
