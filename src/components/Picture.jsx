// Code to display a single picture, toggle favorite status, and handle image loading
// Uses ButtonFavorite component
// It is called by PictureGrid component

import React, { useState, useRef, useEffect } from 'react';
import ButtonFavorite from './buttons/ButtonFavorite';
import { hasAltText, ResponsivePicture } from '../utils/pictureUtils';

function Picture({ picture, onToggleFavorite, favorited }) {
  const [parentWidth, setParentWidth] = useState(0); // State to store parent width
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading status

  // Function to toggle favorite status
  const toggleFavorite = () => {
    onToggleFavorite(picture.id);
  };

  // Function to handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Initialize reference for the parent container,
  // used to get the width of parent picture container for responsive images
  const parentRef = useRef(null);

  // Effect to set parent width once component mounts
  useEffect(() => {
    if (parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="picture-container" data-testid="picture" ref={parentRef}>
      <div className="picture-info">
        <p className="alt">{hasAltText(picture) ? picture.alt : 'Untitled'}</p>
        <hr />
        <p className="photographer">{picture.photographer}</p>
        <ButtonFavorite
          onClick={toggleFavorite}
          favorited={favorited}
        />
      </div>
      <img
        className='picture'
        src={ResponsivePicture(picture, parentWidth)}
        alt={hasAltText(picture)
          ? picture.alt
          : `Picture from ${picture.photographer}`
        }
        onLoad={handleImageLoad}
        style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
        loading="lazy" />
      {!imageLoaded &&
        <div
          style={{ backgroundColor: picture.avg_color }}
          className="picture-container pulsating-background">
        </div>
      }
    </div>
  );
}

export default Picture;
