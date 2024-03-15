export function hasAltText(picture) {
  if (picture && picture.alt && picture.alt.length > 0) {
    return true;
  }
  return false;
}

export function chooseImageSize(picture) {
  return window.innerWidth >= 1024 ? picture.src.large2x : picture.src.large;
}

// Example of function to check if picture is favorited
export function isFavorited(favorites, id) {
  return favorites.includes(id);
}

export function favoritePictures(pictures, favorites) {
  return pictures.filter(picture => favorites.includes(picture.id));
}
