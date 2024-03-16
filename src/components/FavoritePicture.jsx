import React, { useState } from 'react';
import { hasAltText, ResponsivePicture } from '../utils/pictureUtils';
import ButtonPreviousPicture from './buttons/ButtonPreviousPicture';
import ButtonNextPicture from './buttons/ButtonNextPicture';

function FavoritePicture({ picture, counter, favoritePictures, handlePrevious, handleNext }) {
  const [imageLoaded, setImageLoaded] = useState(false);

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
          loading="lazy" />
        <div className='favorite-picture-info'>
          <div className='title'>{hasAltText(picture) ? picture.alt : 'Untitled'} | {picture.photographer}</div>
          <div className='counter'>{counter + 1}/{favoritePictures.length}</div>
        </div>
        <ButtonPreviousPicture
          onClick={handlePrevious}
          style={{ visibility: imageLoaded ? 'visible' : 'hidden' }} />
        <ButtonNextPicture
          onClick={handleNext}
          style={{ visibility: imageLoaded ? 'visible' : 'hidden' }} />
      </div>
    </>
  );
}

export default FavoritePicture;
