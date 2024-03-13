import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Navigate to Home screen when loading is completed
    if (!isLoading) {
      navigation.replace('Home');
    }
  }, [isLoading, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.booksTitle}>Book 's</Text>
      <Text style={styles.subTitle}>Time to reading....</Text>
      {isLoading && <ActivityIndicator size={'large'} color={'silver'} style={styles.loading} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  booksTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic', // Change font style to italic
    color: 'red',
    marginBottom: 20,
  },
  subTitle: {
    color: 'silver',
    fontSize: 17,
    fontWeight: '300',
  },
  loading: {
    position: 'absolute',
    bottom: 100,
  },
});

export default SplashScreen;

