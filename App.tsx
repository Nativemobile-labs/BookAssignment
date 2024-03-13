import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import store from './src/store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CartScreen from './src/screens/CartScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen name="Main" component={MainScreen} 
            options={{headerShown: false, headerStyle: {
              backgroundColor: 'blue', // Change this to the desired color
            }}}/>
        <Stack.Screen name="Home" component={HomeScreen} 
           options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#191919', // Change this to the desired color
            },
            headerTintColor: 'red', // Change text color
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          />
        <Stack.Screen name="Details" component={DetailsScreen} 
          options={{
            title: 'Details',
            headerStyle: {
              backgroundColor: '#191919', // Change this to the desired color
            },
            headerTintColor: 'red', // Change text color
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="Favourite" component={CartScreen}
        options={{
          title: 'Favourites',
          headerStyle: {
            backgroundColor: '#191919', // Change this to the desired color
          },
          headerTintColor: 'red', // Change text color
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App


const MainScreen = () => {
  return(
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name="Welcome" component={SplashScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}