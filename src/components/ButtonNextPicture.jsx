import React from 'react';
import Arrow from '../assets/arrow.png';

function ButtonNextPicture({onClick}) {

  return (
    <button onClick={onClick}>
      <img src={Arrow} className='btn-next-picture' alt="Next" />
    </button>
  );
}

export default ButtonNextPicture;
