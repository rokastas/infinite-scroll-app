// This test checks if the ButtonFavorite component renders with the "Favorite" text.
// It uses the render function from the @testing-library/react library to render
//    the ButtonFavorite component and the getByText function to check if the
//    "Favorite" text is present in the rendered component.
// The test passes if the "Favorite" text is found in the rendered component.

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ButtonFavorite from '../components/buttons/ButtonFavorite';
import Picture from '../components/Picture';

describe('ButtonFavorite', () => {
  test('renders with "Favorite" text', () => {
    render(<ButtonFavorite />);
    const button = screen.getByText('Favorite');
    expect(button).toBeInTheDocument();
  });
});
