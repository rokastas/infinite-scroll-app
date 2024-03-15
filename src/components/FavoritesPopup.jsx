import React from 'react';
import { useState, useEffect } from 'react';
import { hasAltText, chooseImageSize, isFavorited } from '../utils/pictureUtils';
import '../styles/FavoritesPopup.scss';
import Picture from './Picture';
import ButtonFavoritesPopup from './ButtonFavoritesPopup';

function FavoritesPopup({ favoritePictures }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const toggleFavoritesPopup = () => {
    setIsPopUpOpen(!isPopUpOpen);
    console.log('popUp:', isPopUpOpen);
  }

  useEffect(() => {
    if (isPopUpOpen) {
      // Prevent scrolling on the body when popup is open
      document.body.classList.add('no-scroll');
    } else {
      // Enable scrolling on the body when popup is closed
      document.body.classList.remove('no-scroll');
    }
  }, [isPopUpOpen]);

  if (!isPopUpOpen) {
    return (
      <ButtonFavoritesPopup onClick={toggleFavoritesPopup}/>
    )
  }
  return (
    <div className="favorites-popup-background">
      <div className="overlay"></div>
      <div className="favorites-popup">
        {favoritePictures.map((picture) => (
          <Picture key={picture.id} picture={picture} />
        ))}
      </div>
      <ButtonFavoritesPopup onClick={toggleFavoritesPopup}/>
    </div>
  )
};

export default FavoritesPopup;
