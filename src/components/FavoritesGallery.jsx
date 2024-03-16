import React, { useState, useEffect } from 'react';
import FavoritePicture from './FavoritePicture';
import ButtonFavoritesPopup from './buttons/ButtonFavoritesPopup';

function FavoritesPopup({ favoritePictures }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  const toggleFavoritesPopup = () => {
    setIsPopUpOpen(!isPopUpOpen);
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
        {favoritePictures.length === 0 && <div>No favorite pictures yet</div>}
        {favoritePictures.length > 0 &&
          <FavoritePicture
            key={picture.id}
            picture={picture}
            counter={counter}
            favoritePictures={favoritePictures}
            handlePrevious={handlePrevious}
            handleNext={handleNext} />
        }
      </div>
      <ButtonFavoritesPopup onClick={toggleFavoritesPopup} isPopUpOpen={isPopUpOpen} />
    </>
  );
}

export default FavoritesPopup;
