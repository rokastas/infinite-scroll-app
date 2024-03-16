const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
let cache = {};

export async function fetchPictures(page, numPicsPerPage) {
  try {
    const cacheKey = `${page}_${numPicsPerPage}`;

    // Check if data is present in the cache
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=${numPicsPerPage}&page=${page}`, {
      headers: {
        Authorization: API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch pictures');
    }

    const data = await response.json();
    const photos = data.photos;

    // Store data in the cache
    cache[cacheKey] = photos;

    return photos;
  } catch (error) {
    console.error('Error fetching pictures:', error.message);
    throw error;
  }
}
