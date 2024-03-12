import { useState } from 'react';
import ButtonFavourite from './ButtonFavourite';
import './Pictures.scss';

export default function Pictures({ pictures }) {
  // State to track favorited pictures
  const [favoritedPictures, setFavoritedPictures] = useState(() => {
    // Retrieve favorites from localStorage or initialize as an empty array
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites;
  });

  // Function to check if a picture is favorited
  const isFavorited = (id) => {
    return favoritedPictures.includes(id);
  };

  // Function to check if a picture has alt text
  const hasAltText = (picture) => {
    if (picture.alt.length > 0) {
      return true;
    }
  };

  // Function to handle adding a picture to favorites
  const addToFavorites = (id) => {
    // Update favorited pictures state
    if (!isFavorited(id)) {
      setFavoritedPictures(prevState => [...prevState, id]);
    } else {
      setFavoritedPictures(prevState => prevState.filter(picId => picId !== id));
    }
  };

  function chooseImageSize(picture) {
    if (window.innerWidth >= 1024) {
      return picture.src.large2x; // Use large size for large screens
    } else {
      return picture.src.large; // Use medium size for medium screens
    }
  }

  return (
    <div id='picture-grid'>
      {pictures.map((picture, index) => (
        <div className="picture-container" key={picture.id}>
          <div className="picture-info">
            <p className="alt">{ hasAltText(picture) ? picture.alt : 'Untitled'}</p>
            <hr></hr>
            <p className="photographer">{picture.photographer}</p>
            <ButtonFavourite onClick={() => addToFavorites(picture.id)} favorited={isFavorited(picture.id)} />
          </div>
          <img className='picture' src={chooseImageSize(picture)} alt={ hasAltText(picture) ? picture.alt : `picture from ${picture.photographer}`} loading="lazy"/>
        </div>
      ))}
    </div>
  );
}
