import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../App';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(),
}));

describe('<App />', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders the main navigation stack correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Welcome')).toBeDefined();
  });

  it('renders the home screen correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Home')).toBeDefined();
  });

  it('renders the details screen correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Details')).toBeDefined();
  });

  it('renders the favourites screen correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Favourites')).toBeDefined();
  });
});
