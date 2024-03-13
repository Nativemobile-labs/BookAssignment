import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartScreen from '../../src/screens/CartScreen';

describe('<CartScreen />', () => {
  it('renders empty view when no books are added', () => {
    const { getByText } = render(<CartScreen />);
    const emptyTextElement = getByText('No Books to Show');
    expect(emptyTextElement).toBeDefined();
  });

  it('renders book card when books are added', () => {
    const booksAdded = [
      {
        key: 1,
        cover_id: '12345',
        title: 'Sample Book',
        authors: [{ name: 'Sample Author' }],
        first_publish_year: '2020',
      },
    ];
    const { getByText, getByTestId } = render(<CartScreen />);
    fireEvent(booksAdded);

    const titleElement = getByText('Sample Book');
    const authorElement = getByText('By Sample Author');
    const yearElement = getByText('Year: 2020');
    const removeButton = getByTestId('removeButton-1');

    expect(titleElement).toBeDefined();
    expect(authorElement).toBeDefined();
    expect(yearElement).toBeDefined();
    expect(removeButton).toBeDefined();
  });

  it('calls toggleRemoveFavorite when remove button is pressed', () => {
    const toggleRemoveFavorite = jest.fn();
    const booksAdded = [
      {
        key: 1,
        cover_id: '12345',
        title: 'Sample Book',
        authors: [{ name: 'Sample Author' }],
        first_publish_year: '2020',
      },
    ];
    const { getByTestId } = render(<CartScreen />);
    fireEvent(booksAdded);

    const removeButton = getByTestId('removeButton-1');
    fireEvent.press(removeButton);

    expect(toggleRemoveFavorite).toHaveBeenCalledWith(1);
  });
});
