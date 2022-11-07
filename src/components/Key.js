import React from 'react'
import { AppContext } from '../App.js';
import { useContext } from 'react';

function Key({ keyVal, bigKey, disabled }) {
  const { onEnter, onDelete, onSelectLetter } = useContext(AppContext);
  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <div className='key' id={bigKey ? "big" : disabled && "disabled"} onClick={selectLetter}>
      {keyVal}
    </div>
  )
}

export default Key;