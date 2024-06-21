//representará cada pad de la drum machine.
import React from 'react';

function DrumPad({ clipId, clip, keyTrigger, handleClick }) {
  return (
    <div className="drum-pad" id={clipId} onClick={() => handleClick(keyTrigger)}>
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={clip}></audio>
    </div>
  );
}

export default DrumPad;
