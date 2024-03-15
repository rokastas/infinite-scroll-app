import React, { useState } from 'react';
import { hasAltText, chooseImageSize } from '../utils/pictureUtils';
import ButtonPreviousPicture from './ButtonPreviousPicture';
import ButtonNextPicture from './ButtonNextPicture';

function FavoritePicture({ picture, counter, favoritePictures, onToggleFavorite, favorited, handlePrevious, handleNext }) {
  // const toggleFavorite = () => {
  //   onToggleFavorite(picture.id);
  // };

  return (
    <>
      <div className='favorite-picture-container'>
        <img
          className='favorite-picture'
          src={picture.src.large2x}
          alt={hasAltText(picture) ? picture.alt : `Picture from ${picture.photographer}`}
          loading="lazy" />
        <div className="favorite-picture-info">
          <div className="title">{hasAltText(picture) ? picture.alt : 'Untitled'} | {picture.photographer}</div>
          <div className="counter">{counter + 1}/{favoritePictures.length}</div>
        </div>
        <ButtonPreviousPicture onClick={handlePrevious} />
        <ButtonNextPicture onClick={handleNext} />
      </div>
    </>
  );
}

export default FavoritePicture;
