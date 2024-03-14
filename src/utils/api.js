const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
// const API_KEY = process.env.VITE_PEXELS_API_KEY;

export async function fetchPictures(page, numPicsPerPage) {
  try {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=${numPicsPerPage}&page=${page}`, {
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
    throw error;
  }
}
