// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartingScreen from './screens/StartingScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreenOne from './screens/RegisterScreenOne';
import ActivateAccount from './screens/ActivateAccount';
import RegisterScreenTwo from './screens/RegisterScreenTwo';
import TutorialScreen from './screens/TutorialScreen';
import Search from './screens/Search';
import EditProfile from "./screens/EditProfileScreen";


import RadarList from './screens/RadarListScreen';
import TabNavigator from './navigation/TabNavigator';
import PostComment from './screens/PostComment';

import DebateStanding from './screens/DebateStanding';
import Debate from './screens/DebateScreen';

import { Provider } from "react-redux";
import store from "./config/store"
import ForgotPassword from './screens/ForgotPassword';

const Stack = createStackNavigator();



function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component = {ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreenOne} options={{ headerShown: false }} />
          <Stack.Screen name="Activate" component={ActivateAccount} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterTwo" component={RegisterScreenTwo} options={{ headerShown: false }} />
          <Stack.Screen name="RadarList" component={RadarList} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Container" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="DebateStanding" component={DebateStanding} options={{ headerShown: false }} />
          <Stack.Screen name="Debate" component={Debate} options={{ headerShown: false }} />
          <Stack.Screen name="Comment" component={PostComment} options={{ headerShown: true, headerTitle: "Comments" }} />
          <Stack.Screen name="Edit" component={EditProfile} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;