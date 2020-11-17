import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Debate from './DebateScreen'


class DebatesScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: true
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
	
	handleSubmit = () => {
		this.props.navigation.navigate("Debate", {id: 1 });
	}
	
	render(){
        return (
        <View style={styles.debates}>
            <TouchableOpacity onPress={() => this.handleSubmit()}>
                <Text>Debate</Text>
            </TouchableOpacity>
        </View>
        );
    }
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