import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import {getNBAplayerByName, getHeadshotOfPlayer} from '../controller/nba'
import NBAPickCard from './NBAPickCard'

class PicksSearch extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			pickCategory: "Search for player",
			player: "",
			searchItem: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = () => {
		const player = getNBAplayerByName(this.state.player)
		if (player === undefined) {
			Alert.alert('Player not found');
			return;
		}
		const headshot = getHeadshotOfPlayer(player)

		player['headshot'] = headshot

		this.setState({
			searchItem: player
		})
		console.log(player)
	}

	updateField = (val) => {
		this.setState({
            player: val
        });
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.title}>{this.state.pickCategory}</Text>
				<View style={styles.inputContainer}>
					<TextInput style={styles.input} placeholder="Enter player's name"
                            autoCapitalize="none"
                            onChangeText={text => this.updateField(text)}
                            placeholderTextColor='grey'>
					</TextInput>
					<TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.7}
                            onPress={() => this.handleSubmit()}
                        >
                            <Text
                                style={styles.prompt}
                            >Search</Text>
		            </TouchableOpacity>
		            {this.state.searchItem && <NBAPickCard player={this.state.searchItem} />}	
				</View>
				
			</View>
		);
	}


}

const styles = StyleSheet.create({
	container: {
		paddingTop: 100,
		backgroundColor: "#333436",
		height: '100%'
	},
    title: {
    	textAlign: 'center',
    	fontSize: 35,
    	color: 'white'
    },
    input: {
        width: "90%",
        alignSelf: "center",
        paddingVertical: 20,
        marginVertical: 5,
        paddingStart: 20,
        borderColor: '#747474',
        borderRadius: 40,
        borderWidth: 0.4,
        color: '#fff',
        fontSize: 22
    },
    inputContainer: {
    	paddingTop: 50,
    	flex: 1,
    },

    button: {
        backgroundColor: "#53900F",
        width: "80%",
        alignSelf: "center",
        borderRadius: 5,
        paddingVertical: 15,
        marginTop: 40,
        marginBottom: 20
    },

    prompt: {
        alignSelf: "center",
        color: "white",
        fontSize: 15
    },
})

export default PicksSearch;