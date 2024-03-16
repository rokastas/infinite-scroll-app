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
