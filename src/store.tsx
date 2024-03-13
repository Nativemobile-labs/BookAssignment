import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './redux/bookSlice';

const rootReducer = {
  book: bookReducer, 
  // Add other reducers here if you have more slices of state
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
