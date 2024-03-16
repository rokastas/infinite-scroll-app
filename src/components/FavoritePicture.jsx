// Code to display a single favorite picture, navigate through them
// Uses ButtonPreviousPicture and ButtonNextPicture components
// It is called by FavoritesGallery component

import React, { useState } from 'react';
import { hasAltText, ResponsivePicture } from '../utils/pictureUtils';
import ButtonPreviousPicture from './buttons/ButtonPreviousPicture';
import ButtonNextPicture from './buttons/ButtonNextPicture';

function FavoritePicture({ picture, counter, favoritePictures, goToPreviousPic, goToNextPic }) {
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading status

  // Calculate parent width, in the case of the gallery - the window width
  const parentWidth = window.innerWidth;

  // Update the image loading state once it has loaded
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <div className='favorite-picture-container' >
        <img
          className='favorite-picture'
          src={ResponsivePicture(picture, parentWidth)}
          alt={hasAltText(picture) ? picture.alt : `Picture from ${picture.photographer}`}
          onLoad={handleImageLoad}
          style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
          loading="lazy"
        />

        {/* Loading animation */}
        <div
          style={{ backgroundColor: picture.avg_color }}
          className="favorite-picture-loading">
        </div>

        <div className='favorite-picture-info'>
          <div className='title'>
            {hasAltText(picture) ? picture.alt : 'Untitled'} | {picture.photographer}
          </div>
          <div className='counter'>{counter + 1}/{favoritePictures.length}</div>
        </div>

        <ButtonPreviousPicture
          onClick={goToPreviousPic}
          style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
        />

        <ButtonNextPicture
          onClick={goToNextPic}
          style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
        />
      </div>
    </>
  );
}

export default FavoritePicture;
