import React, { useState, useEffect } from 'react';
import FavoritePicture from './FavoritePicture';
import ButtonFavoritesPopup from './ButtonFavoritesPopup';
import ButtonPreviousPicture from './ButtonPreviousPicture';
import ButtonNextPicture from './ButtonNextPicture';

function FavoritesPopup({ favoritePictures }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  const toggleFavoritesPopup = () => {
    setIsPopUpOpen(!isPopUpOpen);
    console.log('popUp:', isPopUpOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsPopUpOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isPopUpOpen) return; // Do nothing if the popup is not open

      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPopUpOpen, counter, favoritePictures.length]);

  function handleNext() {
    if (counter < favoritePictures.length - 1) {
      setCounter((prevCounter) => prevCounter + 1);
    } else {
      setCounter(0);
    }
  }

  function handlePrevious() {
    if (counter > 0) {
      setCounter((prevCounter) => prevCounter - 1);
    } else {
      setCounter(favoritePictures.length - 1);
    }
  }

  if (isPopUpOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  if (!isPopUpOpen) {
    return <ButtonFavoritesPopup onClick={toggleFavoritesPopup} />;
  }

  let picture = favoritePictures[counter];

  return (
    <>
      <div className="overlay"></div>
      <div className="favorites-container">
        <FavoritePicture key={picture.id} picture={picture} counter={counter} favoritePictures={favoritePictures}/>
      </div>
      <ButtonFavoritesPopup onClick={toggleFavoritesPopup} isPopUpOpen={isPopUpOpen} />
      <ButtonPreviousPicture onClick={handlePrevious} />
      <ButtonNextPicture onClick={handleNext} />
    </>
  );
}

export default FavoritesPopup;
