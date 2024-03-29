// This test checks if the PictureGrid component fetches more pictures
// when scrolled to the bottom of the page.

import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import PictureGrid from '../components/PictureGrid';
import { fetchPictures } from '../utils/api';

// Mock the fetchPictures function
jest.mock('../utils/api', () => ({
  fetchPictures: jest.fn()
}));

// Mock the images
jest.mock('../assets/arrow.png', () => 'mock-arrow.png');
jest.mock('../assets/heart.png', () => 'mock-heart.png');
jest.mock('../assets/X.png', () => 'mock-X.png');

// Mock scrollTo function
window.scrollTo = jest.fn();

describe('PictureGrid', () => {
  it('fetches more pictures when scrolled to the bottom of the page', async () => {
    // Create an array of 30 mock pictures
    const mockPictures = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      photographer: `Photographer ${index}`,
      alt: `Alt ${index}`,
      src: `large2x`,
    }));

    // Mock fetchPictures to return mockPictures
    fetchPictures.mockResolvedValue(mockPictures);

    // Render the PictureGrid component
    const { findAllByTestId } = render(<PictureGrid />);

    // Scroll to the bottom of the page
    act(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Check if fetchPictures is called
    await waitFor(() => {
      expect(fetchPictures).toHaveBeenCalledTimes(1);
    });

    // Check that the 30 new pictures are rendered
    const morePictures = await findAllByTestId('picture');
    expect(morePictures.length).toBe(30);
  });
});
