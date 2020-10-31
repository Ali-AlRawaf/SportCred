import * as React from 'react';
import { Text, View } from 'react-native';
import Post from '../component/Post';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function OpenCourtScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Post></Post>
        </View>
    );
}

export default OpenCourtScreen;