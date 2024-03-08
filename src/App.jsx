import React, { useState, useEffect } from 'react';
import './App.css';

const fetchPictures = async () => {
  const API_KEY = 'Wtjxn62N4fHxioQLTxrNoNEodlgEZtDmZGOfJRKKW1oMtzwyEN5Vu14T';
  const perPage = 9; // Limit to 9 pictures per page

  try {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=${perPage}`, {
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
    return [];
  }
};

function App() {
  // State for the list of pictures
  const [pictures, setPictures] = useState([]);

  // Fetch more pictures from the API
  const fetchMorePictures = async () => {
    const newPictures = await fetchPictures();
    setPictures((prevPictures) => [...prevPictures, ...newPictures]);
  };

  // Add the event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle the scroll event
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchMorePictures();
    }
  };

  useEffect(() => {
    // Initial fetch of pictures when the component mounts
    fetchMorePictures();
  }, []);

  return (
    <div className="picture-grid">
      {pictures.map((picture) => (
        <img key={picture.id} src={picture.src.medium} alt={picture.url} />
      ))}
    </div>
  );
}

export default App;
