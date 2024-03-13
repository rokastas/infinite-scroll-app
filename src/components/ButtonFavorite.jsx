import React from 'react';
import '../styles/Buttons.scss';

function ButtonFavorite({ onClick, favorited }) {
  return (
    <button className={`btn-favourite ${favorited ? 'favorited' : ''}`} onClick={onClick}>
      {favorited ? 'Favorited' : 'Favorite'}
    </button>
  );
}

export default ButtonFavorite;
