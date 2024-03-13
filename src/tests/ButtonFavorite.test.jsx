import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ButtonFavorite from '../components/ButtonFavorite';
import Pictures from '../components/Pictures';

test('ButtonFavorite renders with "Favorite" text', () => {
  // const { getByText } = render(<ButtonFavorite />);
  render(<ButtonFavorite />);
  const button = screen.getByText('Favorite');
  expect(button).toBeInTheDocument();
});

test('ButtonFavorite toggles text from "Favorite" to "Favorited"', () => {
  const mockPictures = [
    {
      id: 1,
      alt: 'Alt Text',
      photographer: 'Photographer',
      src: {
        large: 'large.jpg',
        large2x: 'large2x.jpg',
      },
    },
  ];

  // Render component with mock data
  render(<Pictures pictures={mockPictures} />);

  // Simulate click on the button
  const button = screen.getByText('Favorite');
  fireEvent.click(button);

  // Check if the button text changes to "Favorited"
  expect(screen.getByText('Favorited')).toBeInTheDocument();
});
