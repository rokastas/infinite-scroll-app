import React, { useState } from 'react';
import '../styles/Buttons.scss';

function FavoritesPopupButton({onClick}) {

  return (
    <button className='btn-favourite-popup' onClick={onClick}>
      ★
    </button>
  );
}

export default FavoritesPopupButton;
