import React from 'react';

function ButtonFavorite({ onClick, favorited }) {
  return (
    <button className={`btn-favourite ${favorited ? 'favorited' : ''}`} onClick={onClick}>
      {favorited ? 'Favorited' : 'Favorite'}
    </button>
  );
}

export default ButtonFavorite;
