import fetchMock from 'jest-fetch-mock';
import { fetchPictures } from '../utils/api.js';

global.fetch = fetchMock;

describe('fetchPictures function', () => {
  test('fetchPictures returns data with page=1 and numPicsPerPage=1', async () => {
    // Mock fetch response
    fetch.mockResponseOnce(
      JSON.stringify({
        photos: [
          {
            id: 1,
            alt: 'Alt Text 1',
            photographer: 'Photographer 1',
            src: {
              large: 'large1.jpg',
              large2x: 'large2x1.jpg',
            },
          }
        ],
      })
    );

    // Call fetchPictures with page=1 and numPicsPerPage=1
    const pictures = await fetchPictures(1, 1);

    // Expectations
    expect(pictures).toBeDefined();
    expect(pictures.length).toBe(1);
    expect(pictures[0].id).toBe(1);
    expect(pictures[0].alt).toBe('Alt Text 1');
  });
});
