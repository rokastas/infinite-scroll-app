import { useState, useEffect } from 'react';
import Pictures from './components/Pictures';

const fetchPictures = async (page) => {
  const API_KEY = 'Wtjxn62N4fHxioQLTxrNoNEodlgEZtDmZGOfJRKKW1oMtzwyEN5Vu14T';
  const perPage = 9; // Limit to 9 pictures per page

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
    return [];
  }
};

function App() {
  // State for the list of pictures
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Initialize page to 1

  // Fetch more pictures from the API
  const fetchMorePictures = async () => {
    setLoading(true);
    setTimeout(async () => {
      const newPictures = await fetchPictures(page);
      setPictures((prevPictures) => [...prevPictures, ...newPictures]);
      setPage((prevPage) => prevPage + 1); // Increment page after fetching new pictures
      setLoading(false);
    }, 1000); // Delay loading for 1 second
  };

  // Handle the scroll event
  const handleScroll = () => {
    const buffer = 100;

    if (
      window.innerHeight + window.scrollY + buffer >= document.body.offsetHeight &&
      !loading
    ) {
      fetchMorePictures();
    }
  };

  useEffect(() => {
    // Initial fetch of pictures when the component mounts
    fetchMorePictures();
  }, []);

  // Add the event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <>
      <Pictures pictures={pictures} />
      {loading && <div>Loading...</div>}
    </>
  );
}

export default App;
