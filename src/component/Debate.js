import React, { useState, useCallback } from 'react';
import profile_img from '../assets/profile_img.jpg';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import arrow from '../assets/arrow_forward.png'
import bg from '../assets/bg.png'

class Debate extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			value: 50
		}
	}

	handlerSliderChange = (value) => {
		this.setState({
			value
		})
	}

	handleSubmit = () => {
		console.log(this.state)
		this.props.navigation.navigate("DebateStanding")
	}



	render(){
		const users = this.props.users;
		const topic = this.props.topic;
		const options = this.props.options;
		return(
			<ImageBackground
              source={bg}
              style={styles.background}
            >
			<View style={styles.container}>
				<View style={styles.header}>
				    <TouchableOpacity >
				        <Image
				            style={styles.arrow}
				            source={arrow}
				        />
				    </TouchableOpacity>

				</View>
				<View style={styles.topicContainer}>
					<Text style={styles.topic}>{topic}</Text>
				</View>
				{/* <View style={styles.competitors}>
					{
						users.map((user) => {
							return <View style={styles.debater}>
								<Text style={styles.debaterName}>{user.username}</Text>					
							</View>
						})
					}
				</View> */}
				<View style={styles.scoreContainer}>
					<Text style={styles.score}>{this.state.value}</Text>
				</View>
				<View style={styles.optionsContainer}>
					{
						options.map((option) => {
							return <View style={styles.optionContainer}>
								<Text style={styles.option}>{option}</Text>					
							</View>
						})
					}
				</View>
				<View style={styles.slider}>
					<Slider value={this.state.value} 
							minimumValue={0}
							maximumValue={100}
							onValueChange={this.handlerSliderChange}
							minimumTrackTintColor="#FF652F"
							maximumTrackTintColor="#e7e7e7"
							thumbTintColor="#FF652F"
							step='1'/>
				</View>
				<TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => this.handleSubmit()}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
			</View>		
			</ImageBackground>	
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '95%',
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingTop: 30,
	},
	header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    background: {
      flex: 1,
      resizeMode: "stretch",
      width: "100%",
      height: "100%"
    },
    arrow: {
      height: 25,
      width: 25,
      transform: [{
        rotate: '-180deg'
      }],
    },
	competitors: {
		flexDirection: 'row',
		height: '20%',
		marginTop: 20
	},
	debater: {
		flex: 1,

	},
	debaterName: {
		fontSize: 20,
		textAlign: 'center',
		color: '#fff'
	},
	topicContainer: {

	},
	topic: {
		fontSize: 40,
		color: '#fff',
		textAlign: 'center'
	},
	scoreContainer: {
		flex: 1,
		// backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		textAlignVertical: 'center',
		marginTop: 40

	},
	score: {
		// paddingTop: 50,
		fontSize: 100,
		textAlign: 'center',
		color: '#53900F'
		
	},
	optionsContainer: {
		flexDirection: 'row',

		width: '95%',
		marginLeft: 'auto',
		marginRight: 'auto',
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		// backgroundColor: 'red'
	},
	optionContainer: {
		borderRadius: 10,
		// height: 100,
		// width: 200
		maxWidth: 150
	},
	option: {
		fontSize: 30,	
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		color: '#fff'
	},
	slider: {
		width: '95%',
		marginTop: 30,
		marginBottom: 20,
		marginLeft: 'auto',
		marginRight: 'auto',
		flex: 1,
	},
	button: {
        backgroundColor: "#6a6e6c",
        width: "40%",
        alignSelf: "center",
        borderRadius: 5,
        paddingVertical: 15,
        marginBottom: 20
    },
    buttonText: {
    	textAlign: 'center',
    	fontSize: 18,
    	color: '#fff'
    }
})


export default Debate;