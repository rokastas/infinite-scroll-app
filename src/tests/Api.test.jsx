// import fetchMock from 'jest-fetch-mock';
// import { fetchPictures } from '../utils/api.js';

// global.fetch = fetchMock;

// describe('fetchPictures function', () => {
//   test('fetchPictures returns data with page=1 and numPicsPerPage=1', async () => {
//     // Mock fetch response
//     fetch.mockResponseOnce(
//       JSON.stringify({
//         photos: [
//           {
//             id: 1,
//             alt: 'Alt Text 1',
//             photographer: 'Photographer 1',
//             src: {
//               large: 'large1.jpg',
//               large2x: 'large2x1.jpg',
//             },
//           }
//         ],
//       })
//     );

//     // Call fetchPictures with page=1 and numPicsPerPage=1
//     const pictures = await fetchPictures(1, 1);

//     // Expectations
//     expect(pictures).toBeDefined();
//     expect(pictures.length).toBe(1);
//     expect(pictures[0].id).toBe(1);
//     expect(pictures[0].alt).toBe('Alt Text 1');
//   });
// });

// import React from 'react';
// import { render, waitFor } from '@testing-library/react';
// import App from '../App';

// describe('App', () => {
//   it('fetches the first 60 pictures and displays them on the page', async () => {
//     const { getAllByClassName } = render(<App />);

//     // Wait for pictures to be loaded
//     await waitFor(() => {
//       const pictures = getAllByClassName('picture');
//       expect(pictures).toHaveLength(60);
//     });
//   });
// });
