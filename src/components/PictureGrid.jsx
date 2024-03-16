import React, { useState, useEffect } from 'react';
import Picture from './Picture';
import FavoritesGallery from './FavoritesGallery';
import { fetchPictures } from '../utils/api';
import { favoritePictures, useFavoritePictures } from '../utils/pictureUtils';

function PictureGrid() {
  // State hooks for managing pictures, loading state, page number, error status and favorited pictures
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [favoritedPictures, toggleFavorite] = useFavoritePictures();

  // Number of pictures to load per page
  const numPicturesToLoad = 30;

  // Function to load pictures from the API
  const loadPictures = async (numPicsPerPage) => {
    setLoading(true);
    try {
      // Fetch pictures from API for the current page
      const newPictures = await fetchPictures(page, numPicsPerPage);

      // Filter out any duplicate pictures
      const uniqueNewPictures = newPictures.filter(newPic =>
        !pictures.some(pic => pic.id === newPic.id)
      );

      // Filter out any duplicate pictures
      if (uniqueNewPictures.length === 0) {
        setErrorOccurred(true);
        return;
      }

      // Update state with new pictures, increment page number, and reset error status
      setPictures(prevPictures => [...prevPictures, ...uniqueNewPictures]);
      setPage(prevPage => prevPage + 1);
      setErrorOccurred(false);
    } catch (error) {
      // Handling the error if there is one
      console.error('Error fetching more pictures:', error);
      setErrorOccurred(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the scroll event and trigger loading more pictures
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight - 500)
        && !loading
        && !errorOccurred) {
      window.removeEventListener('scroll', handleScroll);
      loadPictures(numPicturesToLoad);
    }
  };

  // Effect hook to load more pictures when scrolling
  useEffect(() => {
    loadPictures(numPicturesToLoad);
  }, []);

  // Effect hook to handle the scroll event and cleanup event listener dependencies
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, errorOccurred]);

  // Function to handle retrying loading pictures after an error
  const handleTryAgain = () => {
    setErrorOccurred(false);
    loadPictures(numPicturesToLoad);
  };

  // Render component with FavoritesGallery, Picture components, loading indicator, and error message
  return (
    <>
      {/* Display FavoritesGallery component */}
      <FavoritesGallery favoritePictures={favoritePictures(pictures, favoritedPictures)}/>

      {/* Display grid of pictures */}
      <div id='picture-grid'>
        {pictures.map((picture) => (
          <Picture key={picture.id} picture={picture} onToggleFavorite={toggleFavorite} favorited={favoritedPictures.includes(picture.id)} />
        ))}
      </div>

      {/* Display loading indicator and error message */}
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
