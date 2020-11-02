// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartingScreen from './screens/StartingScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreenOne from './screens/RegisterScreenOne';
import RegisterScreenTwo from './screens/RegisterScreenTwo';
import TutorialScreen from './screens/TutorialScreen';
import RadarList from './screens/RadarListScreen';
import TabNavigator from './navigation/TabNavigator';

import { Provider } from "react-redux";
import store from "./config/store"

const Stack = createStackNavigator();



function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreenOne} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterTwo" component={RegisterScreenTwo} options={{ headerShown: false }} />
          <Stack.Screen name="RadarList" component={RadarList} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Container" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator> 
      </NavigationContainer>
    </Provider>
  );
}

export default App;
