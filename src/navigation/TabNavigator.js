// ./navigation/TabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OpenCourtScreen from "../screens/OpenCourtScreen";
import TriviaScreen from '../screens/TriviaScreen';
import DebatesScreen from '../screens/DebatesScreen';
import PicksScreen from '../screens/PicksScreen';
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'OpenCourt') {
                        iconName = focused ? 'basketball-hoop' : 'basketball-hoop-outline';
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Trivia') {
                        iconName = focused ? 'gamepad-square' : 'gamepad-square-outline';
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === 'Debates') {
                        iconName = focused ? 'people' : 'people-outline';
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === 'Picks') {
                        iconName = 'graph';
                        return <SimpleLineIcons name={iconName} size={size} color={color} />;
                    }

                    // You can return any component that you like here!
                    // return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                activeBackgroundColor: '#474747',
                inactiveBackgroundColor: '#474747'
            }}
            barStyle={{ backgroundColor: '#474747' }}
        >
            <Tab.Screen name="OpenCourt" component={OpenCourtScreen} />
            <Tab.Screen name="Trivia" component={TriviaScreen} />
            <Tab.Screen name="Picks" component={PicksScreen} />
            <Tab.Screen name="Debates" component={DebatesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;