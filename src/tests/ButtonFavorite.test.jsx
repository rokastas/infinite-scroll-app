import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ButtonFavorite from '../components/ButtonFavorite';
import Picture from '../components/Picture';

describe('ButtonFavorite', () => {
  test('renders with "Favorite" text', () => {
    render(<ButtonFavorite />);
    const button = screen.getByText('Favorite');
    expect(button).toBeInTheDocument();
  });

  test('toggles text from "Favorite" to "Favorited"', () => {
    const mockPicture =
      {
        id: 1,
        alt: 'Alt Text',
        photographer: 'Photographer',
        src: {
          large: 'large.jpg',
          large2x: 'large2x.jpg',
        },
      };

    // Render component with mock data
    render(<Picture picture={mockPicture} />);

    // Simulate click on the button
    const button = screen.getByText('Favorite');
    fireEvent.click(button);

    // Check if the button text changes to "Favorited"
    expect(screen.getByText('Favorited')).toBeInTheDocument();
  });
});
