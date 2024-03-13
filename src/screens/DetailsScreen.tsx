import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

const { width } = Dimensions.get('window');

const DetailsScreen = () => {
  const bookData = useSelector((state: RootState) => state.book.bookData);
  const loading = useSelector((state: RootState) => state.book.loading);
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="orange" />
      </SafeAreaView>
    );
  }

  if (!bookData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noDataText}>No data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: `https://covers.openlibrary.org/b/id/${bookData.cover_id}-L.jpg` }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{bookData.title}</Text>
          <Text style={styles.author}>By {bookData.authors[0].name}</Text>
          <Text style={styles.year}>Year: {bookData.first_publish_year}</Text>
          <Text style={[styles.genre, {marginTop:5, color: 'red', fontSize: 18, textAlign:'justify'}]}>Genre: </Text>
          <Text style={styles.genre}>{bookData.subject}</Text>
          <Text style={[styles.description, {marginTop:10,color:'red', fontSize: 18,fontWeight:'300',}]}>Description: </Text>
          <Text style={styles.description}>{bookData.title} is a fascinating book that...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  coverImage: {
    width: '100%',
    height: width * 0.6,
    marginBottom: 20,
    borderRadius: 10,
  },
  detailsContainer: {
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  author: {
    fontSize: 15,
    marginBottom: 5,
    color: '#fff',
  },
  year: {
    fontSize: 15,
    marginBottom: 0,
    color: '#fff',
  },
  genre: {
    fontSize: 14,
    marginBottom: 1,
    color: '#fff',
    letterSpacing:0.7,
    lineHeight:22,
    textAlign:'auto',
    fontWeight:'300',
  },
  description: {
    fontSize: 14,
    marginTop: 2,
    color: '#fff',
    letterSpacing:0.7,
    lineHeight:22,
    textAlign:'auto',
    fontWeight:'300',
  },
  noDataText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailsScreen;

