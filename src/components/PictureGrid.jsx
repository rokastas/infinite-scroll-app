import React, { useState, useEffect } from 'react';
import Picture from './Picture';
import FavoritesGallery from './FavoritesGallery';
import { fetchPictures } from '../utils/api';
import { favoritePictures, useFavoritePictures } from '../utils/pictureUtils';

function PictureGrid() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [favoritedPictures, toggleFavorite] = useFavoritePictures();
  const numPicturesToLoad = 30;

  useEffect(() => {
    loadPictures(numPicturesToLoad);
    window.addEventListener('scroll', handleScroll);
  }, []);

  const loadPictures = async (numPicsPerPage) => {
    setLoading(true);
    try {
      const newPictures = await fetchPictures(page, numPicsPerPage);
      const uniqueNewPictures = newPictures.filter(newPic =>
        !pictures.some(pic => pic.id === newPic.id)
      );

      setPictures(prevPictures => [...prevPictures, ...uniqueNewPictures]);
      setPage(prevPage => prevPage + 1);
      setErrorOccurred(false);
    } catch (error) {
      console.error('Error fetching more pictures:', error);
      setErrorOccurred(true);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight - 500)
        && !loading
        && !errorOccurred) {
      window.removeEventListener('scroll', handleScroll);
      loadPictures(numPicturesToLoad);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, errorOccurred]);

  const handleTryAgain = () => {
    setErrorOccurred(false);
    loadPictures(numPicturesToLoad);
  };

  return (
    <>
      <FavoritesGallery favoritePictures={favoritePictures(pictures, favoritedPictures)}/>
      <div id='picture-grid'>
        {pictures.map((picture) => (
          <Picture key={picture.id} picture={picture} onToggleFavorite={toggleFavorite} favorited={favoritedPictures.includes(picture.id)} />
        ))}
      </div>
      <div className="loading-field">
        {loading && <p className="loading">Loading...</p>}
        {errorOccurred &&
          <>
            <p>Error loading pictures. Please try again later.</p>
            <button className="btn-try-again" onClick={handleTryAgain}>Try Again</button>
          </>
        }
      </div>
    </>
  );
}

export default PictureGrid;
