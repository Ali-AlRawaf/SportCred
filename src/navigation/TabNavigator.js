// ./navigation/TabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OpenCourtScreen from "../screens/OpenCourtScreen";
import TriviaScreen from '../screens/TriviaScreen';
import DebateScreen from '../screens/DebateScreen';
import PicksScreen from '../screens/PicksScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="OpenCourt" component={OpenCourtScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Trivia" component={TriviaScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Picks" component={PicksScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Debates" component={DebateScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;