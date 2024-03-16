// Code to display a grid of pictures, load more pictures on scroll, and handle errors
// Uses Picture and FavoritesGallery components
// It is called by App component

import React, { useState, useEffect } from 'react';
import Picture from './Picture';
import FavoritesGallery from './FavoritesGallery';
import { fetchPictures } from '../utils/api';
import { favoritePictures, useFavoritePictures } from '../utils/pictureUtils';

function PictureGrid() {
  const [pictures, setPictures] = useState([]); // State to store pictures
  const [loading, setLoading] = useState(false); // State to track loading status
  const [page, setPage] = useState(1); // State to track the current page number
  const [errorOccurred, setErrorOccurred] = useState(false); // State to track error status
  const [favoritedPictures, toggleFavorite] = useFavoritePictures(); // Custom hook to manage favorite pictures

  const numPicturesToLoad = 30; // Number of pictures to load per page

  // Function to fetch and then load pictures from the API
  const loadPictures = async (numPicsPerPage) => {
    setLoading(true);
    try {
      // Fetch pictures from API for the current page
      const newPictures = await fetchPictures(page, numPicsPerPage);

      // Filter out any duplicate pictures
      const uniqueNewPictures = newPictures.filter(newPic =>
        !pictures.some(pic => pic.id === newPic.id)
      );

      // Raise error if no new pictures are fetched
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

  // Effect hook to load more pictures when the component mounts
  useEffect(() => {
    loadPictures(numPicturesToLoad);
  }, []);

  // Effect hook to handle the scroll event
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, errorOccurred]);

  // Function to handle retrying loading pictures after an error
  const handleTryAgain = () => {
    setErrorOccurred(false);
    loadPictures(numPicturesToLoad);
  };

  // Render component with Picture components, loading indicator,
  // error message and FavoritesGallery
  return (
    <>
      {/* Display grid of pictures */}
      <div id='picture-grid'>
        {pictures.map((picture) => (
          <Picture
            key={picture.id}
            picture={picture}
            onToggleFavorite={toggleFavorite}
            favorited={favoritedPictures.includes(picture.id)}
          />
        ))}
      </div>

      {/* Display loading indicator or error message */}
      <div className="loading-field">
        {loading && <p className="loading">Loading...</p>}
        {errorOccurred &&
          <>
            <p>Error loading pictures. Please try again later.</p>
            <button className="btn-try-again" onClick={handleTryAgain}>
              Try Again
            </button>
          </>
        }
      </div>

      {/* Display FavoritesGallery */}
      <FavoritesGallery
        favoritePictures={favoritePictures(pictures, favoritedPictures)}
      />
    </>
  );
}

export default PictureGrid;
