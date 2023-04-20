import React, { useState } from 'react';

const ToggleButton = () => {
  const [toggleOn, setToggleOn] = useState(false);

  const handleToggle = () => {
    setToggleOn(!toggleOn);
  };

  return (
    <div className={`toggle-button ${toggleOn ? 'on' : 'off'}`} onClick={handleToggle}>
      <div className="toggle-button__thumb"></div>
    </div>
  );
};

export default ToggleButton;