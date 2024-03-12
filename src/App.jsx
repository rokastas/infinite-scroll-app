import { useState, useEffect } from 'react';
import Pictures from './components/Pictures';
import './index.scss'
// import happi from './assets/happi.jpg'

const fetchPictures = async (page) => {
  const API_KEY = 'Wtjxn62N4fHxioQLTxrNoNEodlgEZtDmZGOfJRKKW1oMtzwyEN5Vu14T';
  const perPage = 30; // Limit - number of pictures per page

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
    console.log(data.photos);
    return data.photos;
    // const happiPic = {alt: 'happi', photographer: 'happi', src: {tiny: happi, large: happi, large2x: happi}, id: 1}
    // return [happiPic, happiPic, happiPic, happiPic, happiPic, happiPic, happiPic, happiPic, happiPic];
  } catch (error) {
    console.error('Error fetching pictures:', error.message);
    return [];
  }
};

function App() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false); // New state variable to track fetching status

  const fetchMorePictures = async () => {
    if (fetching) {
      console.log('aborting fetch because another fetch is in progress');
      return
    } // Prevent concurrent requests
    setFetching(true);
    setLoading(true);
    try {
      const newPictures = await fetchPictures(page);
      // const uniqueNewPictures = newPictures.filter(newPicture => (
        //   !pictures.some(picture => picture.id === newPicture.id)
        // ));
        // if (uniqueNewPictures.length > 0) {
          setPictures(prevPictures => [...prevPictures, ...newPictures]);
          console.log(page);
          setPage(prevPage => prevPage + 1);
          // }
        } catch (error) {
          console.error('Error fetching more pictures:', error);
        } finally {
          setLoading(false);
          setFetching(false);
        }
    };

    useEffect(() => {
      // Fetch data when component mounts
      console.log(`page: ${page}`);
      console.log(`pictures length: ${pictures.length}`);
    }, [page]);

    const handleScroll = () => {
      const buffer = 0.8
      const triggerPoint = document.body.offsetHeight * buffer;
      if (window.innerHeight + window.scrollY >= triggerPoint && !loading) {
        window.removeEventListener('scroll', handleScroll);
        fetchMorePictures();
        console.log(loading);
        console.log(`Fetching more pictures at page ${page}, total pictures: ${pictures.length}`);
      }
    };

  useEffect(() => {
    fetchMorePictures();
  }, []);

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
