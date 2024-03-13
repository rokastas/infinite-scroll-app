import React from 'react';
import { useState, useEffect } from 'react';
import Pictures from './components/Pictures';
import './index.scss'

const fetchPictures = async (page, perPage) => {
  const API_KEY = 'Wtjxn62N4fHxioQLTxrNoNEodlgEZtDmZGOfJRKKW1oMtzwyEN5Vu14T';

  try {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`, {
      headers: {
        Authorization: API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch pictures');
    }

    const data = await response.json();
    return data.photos;
  } catch (error) {
    console.error('Error fetching pictures:', error.message);
    throw error; // Re-throw the error to propagate it
  }
};

function App() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [errorOccurred, setErrorOccurred] = useState(false); // State to track if an error occurred
  const initialPictureCount = 60;
  const extraPictureCount = 30;

  const fetchMorePictures = async (perPage) => {
    setLoading(true);
    try {
      if (!errorOccurred) {
        const newPictures = await fetchPictures(page, perPage);
        // Filter out duplicates
        const uniqueNewPictures = newPictures.filter(newPic => !pictures.some(pic => pic.id === newPic.id));
        setPictures(prevPictures => [...prevPictures, ...uniqueNewPictures]);
        setPage(prevPage => prevPage + 1);
        setErrorOccurred(false); // Reset error state if fetch is successful
      }
    } catch (error) {
      console.error('Error fetching more pictures:', error);
      setErrorOccurred(true); // Set error occurred flag
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   // Fetch data when component mounts
  //   console.log(`page: ${page}`);
  //   console.log(`pictures length: ${pictures.length}`);
  // }, [page, pictures.length]);

  const handleScroll = () => {
    const buffer = 0.999;
    const triggerPoint = document.body.offsetHeight * buffer;
    if (window.innerHeight + window.scrollY >= triggerPoint && !loading && !errorOccurred) { // Check if there is no error
      window.removeEventListener('scroll', handleScroll);
      fetchMorePictures(extraPictureCount);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchMorePictures(initialPictureCount);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, errorOccurred]); // Add error occurred flag as a dependency

  const handleTryAgain = () => {
    setErrorOccurred(false);
    fetchMorePictures(extraPictureCount);
  };

  return (
    <>
      <Pictures pictures={pictures} />
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

export default App;
