// Button to open/close the Favorites Gallery

import React from 'react';

import Heart from '../../assets/heart.png';
import X from '../../assets/x.png';

function ButtonFavoritesGallery({ onClick, isGalleryOpen }) {
  const iconSrc = isGalleryOpen ? X : Heart;
  const iconAlt = isGalleryOpen ? 'Exit' : 'Favorites';
  const iconClass = isGalleryOpen ? 'exit' : 'heart';

  return (
    <button className='btn-favourite-gallery' onClick={onClick}>
      <img src={iconSrc} className={iconClass} alt={iconAlt} />
    </button>
  );
}

export default ButtonFavoritesGallery;
