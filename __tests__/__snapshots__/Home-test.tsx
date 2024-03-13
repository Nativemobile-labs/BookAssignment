import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import axios from 'axios';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

// Mocking axios get function
jest.mock('axios');

// Mocking redux store
const mockStore = configureMockStore([]);

describe('<HomeScreen />', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={mockStore({ book: { bookList: [], bookData: null } })}>
        <HomeScreen />
      </Provider>
    );
  });

  it('renders loading indicator when fetching data', () => {
    const { getByTestId } = render(
      <Provider store={mockStore({ book: { bookList: [], bookData: null } })}>
        <HomeScreen />
      </Provider>
    );

    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeTruthy();
  });

  it('renders book items correctly', async () => {
    const mockBooks = [
      {
        key: '1',
        title: 'Sample Book 1',
        authors: [{ key: '1', name: 'Author 1' }],
        first_publish_year: 2020,
        cover_id: '12345',
        favorite: false,
      },
      {
        key: '2',
        title: 'Sample Book 2',
        authors: [{ key: '2', name: 'Author 2' }],
        first_publish_year: 2021,
        cover_id: '67890',
        favorite: true,
      },
    ];

    // Mocking axios get function to return mockBooks
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: { works: mockBooks } });

    const { getByText, queryByText } = render(
      <Provider store={mockStore({ book: { bookList: [], bookData: null } })}>
        <HomeScreen />
      </Provider>
    );

    // Wait for book items to be rendered
    await waitFor(() => {
      expect(getByText('Sample Book 1')).toBeTruthy();
      expect(getByText('Sample Book 2')).toBeTruthy();
      expect(getByText('By Author 1')).toBeTruthy();
      expect(getByText('By Author 2')).toBeTruthy();
      expect(getByText('Year: 2020')).toBeTruthy();
      expect(getByText('Year: 2021')).toBeTruthy();
    });

    // Check if the favorite icon is rendered correctly for the second book
    const favoriteIcon = queryByText('Sample Book 2').parent?.findByTestId('favorite-icon');
    expect(favoriteIcon).toBeTruthy();
    expect(favoriteIcon.props.source.uri).toContain('heartRed.png');
  });

  it('searches for books correctly', async () => {
    const mockBooks = [
      {
        key: '1',
        title: 'Sample Book 1',
        authors: [{ key: '1', name: 'Author 1' }],
        first_publish_year: 2020,
        cover_id: '12345',
        favorite: false,
      },
      {
        key: '2',
        title: 'Sample Book 2',
        authors: [{ key: '2', name: 'Author 2' }],
        first_publish_year: 2021,
        cover_id: '67890',
        favorite: true,
      },
    ];

    // Mocking axios get function to return mockBooks
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: { works: mockBooks } });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={mockStore({ book: { bookList: [], bookData: null } })}>
        <HomeScreen />
      </Provider>
    );

    const searchInput = getByPlaceholderText('Search by Title...');

    // Simulate typing in the search input
    fireEvent.changeText(searchInput, 'Sample Book 1');

    // Wait for the search result to be rendered
    await waitFor(() => {
      expect(getByText('Sample Book 1')).toBeTruthy();
      expect(queryByText('Sample Book 2')).toBeNull();
    });

    // Clear the search input
    fireEvent.changeText(searchInput, '');

    // Wait for the original book list to be rendered
    await waitFor(() => {
      expect(getByText('Sample Book 1')).toBeTruthy();
      expect(getByText('Sample Book 2')).toBeTruthy();
    });
  });
});
