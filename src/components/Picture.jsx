import React, { useState } from 'react';
import ButtonFavorite from './ButtonFavorite';
import { hasAltText, chooseImageSize } from '../utils/pictureUtils';
import '../styles/Picture.scss';

function Picture({ picture }) {
  const [favorited, setFavorited] = useState(false);

  const toggleFavorite = () => {
    setFavorited(!favorited);
    // Additional logic to store favorited state in localStorage if needed
  };

  return (
    <div className="picture-container">
      <div className="picture-info">
        <p className="alt">{hasAltText(picture) ? picture.alt : 'Untitled'}</p>
        <hr />
        <p className="photographer">{picture.photographer}</p>
        <ButtonFavorite onClick={toggleFavorite} favorited={favorited} />
      </div>
      <img className='picture' role='img' src={chooseImageSize(picture)} alt={hasAltText(picture) ? picture.alt : `Picture from ${picture.photographer}`} loading="lazy" />
    </div>
  );
}

export default Picture;
