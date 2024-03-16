// This file contains utility functions to manage pictures and favorites

import { useState, useEffect } from 'react';

export function hasAltText(picture) {
  if (picture && picture.alt && picture.alt.length > 0) {
    return true;
  }
  return false;
}

// Function to get the favorite pictures from pictures
export function favoritePictures(pictures, favorites) {
  return pictures.filter(picture => favorites.includes(picture.id));
}

// Function to determine the picture size based on the parent component width
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
  }, [pictureLarge, pictureLarge2x, parentWidth]);

  return (pictureUrl);
}

// Function to manage favorite pictures
export function useFavoritePictures () {
  const [favoritedPictures, setFavoritedPictures] = useState([]);

  // Load favorites from local storage
  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoritedPictures(favoritesFromStorage);
  }, []);

  // Function to toggle favorite status
  const toggleFavorite = (pictureId) => {
    const updatedFavorites = favoritedPictures.includes(pictureId)
      ? favoritedPictures.filter(id => id !== pictureId)
      : [...favoritedPictures, pictureId];

    setFavoritedPictures(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return [favoritedPictures, toggleFavorite];
}
