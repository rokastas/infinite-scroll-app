// Code to display a gallery of favorite pictures and navigate through them
// Uses FavoritePicture and ButtonFavoritesGallery components
// It is called by PictureGrid component

import React, { useState, useEffect } from 'react';
import FavoritePicture from './FavoritePicture';
import ButtonFavoritesGallery from './buttons/ButtonFavoritesGallery';

function FavoritesGallery({ favoritePictures }) {
  const [isGalleryOpen, setisGalleryOpen] = useState(false);
  const [counter, setCounter] = useState(0); // State to keep track of the currently displayed picture number

  // Function to toggle the gallery open/close state
  const toggleFavoritesGallery = () => {
    setisGalleryOpen(!isGalleryOpen);
  };

  // Keyboard navigation and closing the gallery
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isGalleryOpen) return; // Do nothing if the gallery is not open

      if (event.key === 'ArrowLeft') {
        goToPreviousPic();
      } else if (event.key === 'ArrowRight') {
        goToNextPic();
      } else if (event.key === 'Escape') {
        setisGalleryOpen(false);
      }
    };

    // Event listener for keyboard navigation and closing the gallery
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isGalleryOpen, counter]);

  function goToNextPic() {
    if (counter < favoritePictures.length - 1) {
      setCounter((prevCounter) => prevCounter + 1);
    } else {
      setCounter(0); // Go to the first picture if already at the last one
    }
  }

  function goToPreviousPic() {
    if (counter > 0) {
      setCounter((prevCounter) => prevCounter - 1);
    } else {
      setCounter(favoritePictures.length - 1); // Go to the last picture if already at the first one
    }
  }

  // Disable the picture grid when the gallery is open
  if (isGalleryOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  // Render the button to open the gallery if it's closed
  if (!isGalleryOpen) {
    return <ButtonFavoritesGallery onClick={toggleFavoritesGallery} />;
  }

  // Get the currently displayed picture
  let picture = favoritePictures[counter];

  // Render the gallery with the favorite picture and overlay behind it
  return (
    <>
      <div className="favorites-container">
        {favoritePictures.length === 0 && <div>No favorite pictures yet</div>}
        {favoritePictures.length > 0 &&
          <FavoritePicture
            key={picture.id}
            picture={picture}
            counter={counter}
            favoritePictures={favoritePictures}
            goToPreviousPic={goToPreviousPic}
            goToNextPic={goToNextPic} />
          }
      </div>
      <div className="overlay"></div>
      <ButtonFavoritesGallery onClick={toggleFavoritesGallery} isGalleryOpen={isGalleryOpen} />
    </>
  );
}

export default FavoritesGallery;
