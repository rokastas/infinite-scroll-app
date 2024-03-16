import React from 'react';
import Arrow from '../../assets/arrow.png';

function ButtonNextPicture({onClick, style}) {

  return (
    <button className='btn-next-picture' onClick={onClick}>
      <img
        src={Arrow}
        className='btn-next-picture-icon'
        alt="Next"
        style={style} />
    </button>
  );
}

export default ButtonNextPicture;
