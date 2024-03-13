import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import DetailsScreen  from '../../src/screens/DetailsScreen';
// import { Provider } from 'react-redux';
const { Provider } = require('react-redux');
import configureStore from 'redux-mock-store';
import { RootState } from '@reduxjs/toolkit/query';

const mockStore = configureStore([]);

describe('<DetailsScreen />', () => {
  it('renders loading indicator when loading', () => {
    const initialState: RootState = {
      book: {
        bookData: null,
        loading: true,
      },
    };
    const store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <DetailsScreen />
      </Provider>
    );

    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeTruthy();
  });

  it('renders no data message when book data is not available', async () => {
    const initialState: RootState = {
      book: {
        bookData: null,
        loading: false,
      },
    };
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <DetailsScreen />
      </Provider>
    );

    await waitFor(() => {
      const noDataText = getByText('No data available');
      expect(noDataText).toBeTruthy();
    });
  });

  it('renders book details when book data is available', async () => {
    const initialState: RootState = {
      book: {
        bookData: {
          title: 'Test Book',
          authors: [{ name: 'Test Author' }],
          first_publish_year: '2022',
          cover_id: '12345',
          subject: 'Test Genre',
          description: 'Test Description',
        },
        loading: false,
      },
    };
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <DetailsScreen />
      </Provider>
    );

    await waitFor(() => {
      const titleElement = getByText('Test Book');
      const authorElement = getByText('By Test Author');
      const yearElement = getByText('Year: 2022');
      const genreElement = getByText('Genre: Test Genre');
      const descriptionElement = getByText('Description: Test Description');

      expect(titleElement).toBeTruthy();
      expect(authorElement).toBeTruthy();
      expect(yearElement).toBeTruthy();
      expect(genreElement).toBeTruthy();
      expect(descriptionElement).toBeTruthy();
    });
  });
});
