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
import OtherProfile from "./screens/OtherProfile";
import TriviaGauntlet from './screens/TriviaGauntlet';
import TriviaLandingScreen from './screens/TriviaLandingScreen';
import TriviaResults from './screens/TriviaResults'

import RadarList from './screens/RadarListScreen';
import TabNavigator from './navigation/TabNavigator';
import PostComment from './screens/PostComment';

import DebateStanding from './screens/DebateStanding';
import Debate from './screens/DebateScreen';

import PicksSearch from './component/PicksSearch';
import PicksTeam from './component/PicksTeam';

import { Provider } from "react-redux";
import store from "./config/store"
import ForgotPassword from './screens/ForgotPassword';
import NewDebate from './screens/NewDebate';
import InboxScreen from './screens/InboxScreen';
import DebateChallengeOption from './screens/DebateChallengeOption';
import PreSeasonScreen from './screens/PreSeasonScreen';
import RegularSeasonScreen from './screens/RegularSeasonScreen';
import PlayoffsScreen from './screens/PlayoffsScreen';

const Stack = createStackNavigator();



function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreenOne} options={{ headerShown: false }} />
          <Stack.Screen name="Activate" component={ActivateAccount} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterTwo" component={RegisterScreenTwo} options={{ headerShown: false }} />
          <Stack.Screen name="RadarList" component={RadarList} options={{ headerShown: false }} />
          <Stack.Screen name="Inbox" component={InboxScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Container" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="NewDebate" component={NewDebate} options={{ headerShown: false }} />
          <Stack.Screen name="DebateChallengeOption" component={DebateChallengeOption} options={{ headerShown: false }} />
          <Stack.Screen name="DebateStanding" component={DebateStanding} options={{ headerShown: false }} />
          <Stack.Screen name="Debate" component={Debate} options={{ headerShown: false }} />
          <Stack.Screen name="Comment" component={PostComment} options={{ headerShown: true, headerTitle: "Comments" }} />
          <Stack.Screen name="PreSeason" component={PreSeasonScreen} options={{ headerShown: true, headerTitle: "Preseason" }} />
          <Stack.Screen name="RegularSeason" component={RegularSeasonScreen} options={{ headerShown: true, headerTitle: "Regular Season" }} />
          <Stack.Screen name="Playoffs" component={PlayoffsScreen} options={{ headerShown: true, headerTitle: "Playoffs" }} />
          <Stack.Screen name="PicksSearch" component={PicksSearch} options={{ headerShown: false }} />
          <Stack.Screen name="PicksTeam" component={PicksTeam} options={{ headerShown: false }} />
          <Stack.Screen name="Edit" component={EditProfile} options={{ headerShown: false }} />
          <Stack.Screen name="OtherProfile" component={OtherProfile} options={{ headerShown: false }} />
          <Stack.Screen name="TriviaGauntlet" component={TriviaGauntlet} options={{ headerShown: false }} />
          <Stack.Screen name="TriviaResults" component={TriviaResults} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;