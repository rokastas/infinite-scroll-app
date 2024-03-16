import React from 'react';
import Heart from '../../assets/heart.png';
import X from '../../assets/x.png';

function ButtonFavoritesGallery({ onClick, isPopUpOpen }) {
  const iconSrc = isPopUpOpen ? X : Heart;
  const iconAlt = isPopUpOpen ? 'Exit' : 'Favorites';
  const iconClass = isPopUpOpen ? 'exit' : 'heart';

  return (
    <button className='btn-favourite-popup' onClick={onClick}>
      <img src={iconSrc} className={iconClass} alt={iconAlt} />
    </button>
  );
}

export default ButtonFavoritesGallery;
