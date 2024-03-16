import React, { useState, useRef, useEffect } from 'react';
import ButtonFavorite from './buttons/ButtonFavorite';
import { hasAltText, ResponsivePicture } from '../utils/pictureUtils';

function Picture({ picture, onToggleFavorite, favorited }) {
  const toggleFavorite = () => {
    onToggleFavorite(picture.id);
  };

  const parentRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);

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
        <ButtonFavorite onClick={toggleFavorite} favorited={favorited} />
      </div>
      <img
        className='picture'
        src={ResponsivePicture(picture, parentWidth)}
        alt={hasAltText(picture) ? picture.alt : `Picture from ${picture.photographer}`}
        loading="lazy" />
      <div style={{ backgroundColor: picture.avg_color }} className="picture-container pulsating-background"></div>
    </div>
  );
}

export default Picture;
