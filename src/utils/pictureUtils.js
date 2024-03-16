import React, { useState, useEffect } from 'react';

export function hasAltText(picture) {
  if (picture && picture.alt && picture.alt.length > 0) {
    return true;
  }
  return false;
}

// Example of function to check if picture is favorited
export function isFavorited(favorites, id) {
  return favorites.includes(id);
}

export function favoritePictures(pictures, favorites) {
  return pictures.filter(picture => favorites.includes(picture.id));
}

export function ResponsivePicture(picture, parentWidth) {
  const [pictureUrl, setPictureUrl] = useState('');

  const pictureLarge = picture.src.large;
  const pictureLarge2x = picture.src.large2x;

  useEffect(() => {
    let newImageUrl = '';

    if (parentWidth < 768) {
      newImageUrl = pictureLarge;
    } else {
      newImageUrl = pictureLarge2x;
    }

    setPictureUrl(newImageUrl);
  }, [pictureLarge, pictureLarge2x]);

  return (pictureUrl);
}
