import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import PictureGrid from '../components/PictureGrid';
import { fetchPictures } from '../utils/api'; // Import the fetchPictures function

// Mock the fetchPictures function
jest.mock('../utils/api', () => ({
  fetchPictures: jest.fn()
}));

jest.mock('../assets/arrow.png', () => 'mock-arrow.png');
jest.mock('../assets/heart.png', () => 'mock-heart.png');
jest.mock('../assets/X.png', () => 'mock-X.png');

// Mock scrollTo function
window.scrollTo = jest.fn();

describe('PictureGrid', () => {
  it('fetches more pictures when scrolled to the bottom of the page', async () => {
    const mockPictures = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      photographer: `Photographer ${index}`,
      alt: `Alt ${index}`,
      src: `large2x`,
    }));

    // Mock fetchPictures to return mockPictures
    fetchPictures.mockResolvedValue(mockPictures);

    // Render the PictureGrid component
    const { getByTestId, findAllByTestId } = render(<PictureGrid />);

    // Scroll to the bottom of the page
    act(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait for pictures to be loaded
    await waitFor(() => {
      expect(fetchPictures).toHaveBeenCalledTimes(1); // Ensure fetchPictures is called
    });

    // Check that the new pictures are rendered
    const morePictures = await findAllByTestId('picture');
    expect(morePictures.length).toBe(30); // Assuming fetchPictures returns 30 pictures
  });
});
