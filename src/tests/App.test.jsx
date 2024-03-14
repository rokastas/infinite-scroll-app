// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from '../App';
// import fetchMock from 'jest-fetch-mock';

// describe('App runs', () => {
//   test('and is populated with pictures', async () => {
//     // Mock fetch globally
//     global.fetch = fetchMock;

//     fetchMock.mockResponse(
//       JSON.stringify({
//         photos: [
//           {
//             id: 1,
//             alt: 'Alt Text 1',
//             photographer: 'Photographer 1',
//             src: {
//               large: 'large2.jpg',
//               large2x: 'large2x.jpg',
//             },
//           },
//           {
//             id: 2,
//             alt: 'Alt Text 2',
//             photographer: 'Photographer 2',
//             src: {
//               large: 'large2.jpg',
//               large2x: 'large2x.jpg',
//             },
//           }
//         ],
//       })
//     );

//     render(<App />);

//     // Wait for the images to appear
//     const pictures = await screen.findAllByRole('img');

//     expect(pictures).toHaveLength(2);
//   });
// });
