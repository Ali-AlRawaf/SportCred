import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Debate from './DebateScreen'
import { useNavigation } from '@react-navigation/native';

function DebatesScreen(){

	const navigation = useNavigation();
	

	handleSubmit = () => {
		
		navigation.navigate("Debate", {id: 1 })
	}
	
	return (
    <View style={styles.debates}>
        <TouchableOpacity onPress={() => handleSubmit()}>
        	<Text>Debate</Text>
        </TouchableOpacity>
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

export default DebatesScreen;