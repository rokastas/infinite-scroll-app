import React, { useState, useEffect } from 'react';
import Picture from './Picture';
import { fetchPictures } from '../utils/api';
import './Pictures.scss';

function PictureGrid() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const numInitialPictures = 60;
  const numPicturesToLoad = 30;

  // Initial fetch
  useEffect(() => {
    loadPictures(numInitialPictures);
  }, []);

  const loadPictures = async (numPicsPerPage) => {
    setLoading(true);
    try {
      const newPictures = await fetchPictures(page, numPicsPerPage);
      const uniqueNewPictures = newPictures.filter(newPic => !pictures.some(pic => pic.id === newPic.id));
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
    const buffer = 0.999;
    const triggerPoint = document.body.offsetHeight * buffer;
    if (window.innerHeight + window.scrollY >= triggerPoint && !loading && !errorOccurred) {
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
      <div id='picture-grid'>
        {pictures.map((picture) => (
          <Picture key={picture.id} picture={picture} />
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