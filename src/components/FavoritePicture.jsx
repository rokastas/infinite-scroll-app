import React from 'react';
import { hasAltText, ResponsivePicture } from '../utils/pictureUtils';
import ButtonPreviousPicture from './buttons/ButtonPreviousPicture';
import ButtonNextPicture from './buttons/ButtonNextPicture';

function FavoritePicture({ picture, counter, favoritePictures, handlePrevious, handleNext }) {
  const parentWidth = window.innerWidth;

  return (
    <>
      <div className='favorite-picture-container' >
        <img
          className='favorite-picture'
          src={ResponsivePicture(picture, parentWidth)}
          alt={hasAltText(picture) ? picture.alt : `Picture from ${picture.photographer}`}
          loading="lazy" />
        <div style={{ backgroundColor: picture.avg_color }} className="favorite-picture-container pulsating-background"></div>
        <div className='favorite-picture-info'>
          <div className='title'>{hasAltText(picture) ? picture.alt : 'Untitled'} | {picture.photographer}</div>
          <div className='counter'>{counter + 1}/{favoritePictures.length}</div>
        </div>
        <ButtonPreviousPicture onClick={handlePrevious} />
        <ButtonNextPicture onClick={handleNext} />
      </div>
    </>
  );
}

export default FavoritePicture;
