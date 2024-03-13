import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

interface Book {
  key: string;
  title: string;
  authors: { key: string; name: string }[];
  first_publish_year: number;
  cover_id: string;
  favorite: boolean;
}

interface BookState {
  bookList: Book[];
  bookData: Book | null;ß 
  booksAdded: Book[];
}

const initialState: BookState = {
  bookList: [],
  bookData: null,
  booksAdded: [],
};

// Load booksAdded array from AsyncStorage if available, otherwise initialize as empty array
const loadBooksAddedFromStorage = async (): Promise<Book[]> => {
  try {
    const storedBooksAdded = await AsyncStorage.getItem('booksAdded');
    return storedBooksAdded ? JSON.parse(storedBooksAdded) : [];
  } catch (error) {
    console.error('Error loading booksAdded from AsyncStorage:', error);
    return [];
  }
};

// Save booksAdded array to AsyncStorage
const saveBooksAddedToStorage = async (booksAdded: Book[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('booksAdded', JSON.stringify(booksAdded));
  } catch (error) {
    console.error('Error saving booksAdded to AsyncStorage:', error);
  }
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookList(state, action: PayloadAction<Book[]>) {
      state.bookList = action.payload;
    },
    setBookData(state, action: PayloadAction<Book | null>) {
      state.bookData = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const bookKey = action.payload;
      const bookIndex = state.bookList.findIndex((book) => book.key === bookKey);
     
      if (bookIndex !== -1) {
        const item=state.bookList.filter((items)=> items.key === bookKey);
        state.booksAdded.push(item[0]);
        
        // Toggle the favorite status
        state.bookList[bookIndex].favorite = !state.bookList[bookIndex].favorite;

        // Save updated booksAdded array to AsyncStorage
        saveBooksAddedToStorage(state.booksAdded);
      }
    },
    toggleRemoveFavorite(state, action: PayloadAction<string>) {
      const bookKey = action.payload;
      const bookIndex = state.bookList.findIndex((book) => book.key === bookKey);
      
      if (bookIndex !== -1) {
        // Find the index of the book in booksAdded array
        const bookAddedIndex = state.booksAdded.findIndex((book) => book.key === bookKey);
        
        // If the book is found in booksAdded array, remove it
        if (bookAddedIndex !== -1) {
          state.booksAdded.splice(bookAddedIndex, 1);
          
          // Save updated booksAdded array to AsyncStorage
          saveBooksAddedToStorage(state.booksAdded);
        }
        
        // Toggle the favorite status
        state.bookList[bookIndex].favorite = !state.bookList[bookIndex].favorite;
      }
    }
  },
});

export const { setBookList, setBookData, toggleFavorite, toggleRemoveFavorite } = bookSlice.actions;
export default bookSlice.reducer;
