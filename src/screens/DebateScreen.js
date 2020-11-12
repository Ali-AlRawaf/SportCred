import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Debate from '../component/Debate'

const debate = {
	users: [
		{
			id: 1,
			username: 'user1'
		},
		{
			id: 2,
			username: 'user2'
		},
	],
	topic: 'Who had a better season?',
	options: ['Ibaka', 'VanVleet']
}

function DebateScreen() {
	
    return (
        <View style={styles.debates}>
            <Debate users={debate.users} topic={debate.topic} options={debate.options}></Debate>
        </View>
    );
}

const styles = StyleSheet.create({
	debates: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
})

export default DebateScreen;