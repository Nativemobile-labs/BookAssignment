import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  FlatList, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  Alert, 
  ActivityIndicator
 } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBookData, toggleFavorite, setBookList } from '../redux/bookSlice';
import { useSelector } from 'react-redux';

const baseUrl = 'https://openlibrary.org/subjects/sci-fi.json?details=true';
const searchUrl = 'https://openlibrary.org/search.json';
const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [bookLists, setbookLists] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const bookList = useSelector((state: RootState) => state.book.bookList);

  useEffect(() => {
    if (bookList) {
      setbookLists(bookList);
      setLoading(false);
    }
  }, [bookList]);

  // fetch book data api
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(baseUrl);
        dispatch(setBookList(response.data.works));
      } catch (error) {
        console.log('Error', 'Failed to fetch books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

  // store data in redux and navigate to book details
  const goToDetailsScreen = (item: Book) => {
    dispatch(setBookData(item));
    navigation.navigate('Details');
  };

  // searching books by their title
  const searchBooks = async (query: string) => {
    try {
      const response = await axios.get(`${searchUrl}?title=${query}`);
      setbookLists(response.data.docs);
    } catch (error) {
      Alert.alert('Error', 'Failed to search for books. Please try again later.');
    }
  };

  // render book list item
  const renderItem = ({ item }: { item: Book }) => {
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return null;
    }
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={() => goToDetailsScreen(item)}>
        <Image
          source={{ uri: `https://covers.openlibrary.org/b/id/${item.cover_id}-L.jpg` }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.author}>By {item.authors[0]?.name}</Text>
          <Text style={styles.year}>Year: {item?.first_publish_year}</Text>

          {/* Favorite Button */}
          <TouchableOpacity style={styles.likeButton} onPress={() => dispatch(toggleFavorite(item.key))}>
            <Image source={item.favorite ? require('../assets/heartRed.png') : require('../assets/heart.png')} style={styles.like} />
          </TouchableOpacity>

          <Text style={styles.more}>More....</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // render activity indicator while loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  // render main component
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Title..."
        placeholderTextColor={'silver'}
        onChangeText={(text) => {
          setSearchQuery(text);
          searchBooks(text);
        }}
        value={searchQuery}
      />
      <FlatList
        data={bookLists}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartText}>Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    width: '100%',
  },
  searchInput: {
    marginTop: 10,
    width: '95%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'silver'
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#141414',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  coverImage: {
    width: 120,
    height: 180,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  year: {
    fontSize: 14,
    color: '#ccc',
  },
  likeButton: {
    alignSelf: 'flex-start',
    marginTop: 15
  },
  like: {
    height: 25,
    width: 25,
    tintColor: 'red',
  },
  more: {
    color: 'silver',
    marginTop: 10
  },
  cartButton: {
    backgroundColor: 'red',
    height: 50, 
    width: 70,
    borderRadius: 20,
    position: 'absolute',
    bottom: 15, 
    right: 20, 
    justifyContent: 'center',
  },
  cartText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
  }
});

export default HomeScreen;

interface Author {
  key: string;
  name: string;
}

interface Book {
  key: string;
  title: string;
  authors: Author[];
  first_publish_year: number;
  cover_id: string;
  favorite: boolean;
}


