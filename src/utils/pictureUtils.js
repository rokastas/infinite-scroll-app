export function hasAltText(picture) {
  return picture.alt.length > 0;
}

export function chooseImageSize(picture) {
  return window.innerWidth >= 1024 ? picture.src.large2x : picture.src.large;
}

// Example of function to check if picture is favorited
export function isFavorited(favorites, id) {
  return favorites.includes(id);
}
