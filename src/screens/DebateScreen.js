import React, { useState, useCallback } from 'react';
import profile_img from '../assets/profile_img.jpg';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import arrow from '../assets/arrow_forward.png'
import bg from '../assets/bg.png';
import { getDebate, getOptionNames } from '../controller/debate';
import { getOption } from '../controller/option';
import { getVote } from '../controller/vote';
import { getUser } from '../controller/user';
import {getOptionVotes} from '../controller/debate';

// const debate = {
// 	users: [
// 		{
// 			id: 1,
// 			username: 'user1'
// 		},
// 		{
// 			id: 2,
// 			username: 'user2'
// 		},
// 	],
// 	topic: 'Was this the best season for Ibaka?',
// 	options: ['No', 'Yes']
// }

class Debate extends React.Component {

	constructor(props){
		super(props);
		this.state = {
	      value: 50,
	      topic: "",
		  users: [],
		  debate: "",
	      options: []
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlerSliderChange = this.handlerSliderChange.bind(this);
	    this.setDebateInfo = this.setDebateInfo.bind(this);
	}

	componentDidMount = () => {
		this.setDebateInfo(this.props.route.params.id).then(result => console.log("worked")).catch(e => console.log(e));
	}

  setDebateInfo = async (id) => {
    const getDebateRes = await getDebate(id);
	const options = await getOptionNames(id);
	const optionsIds = getDebateRes.debate.options;
	let i = 0;
	const optionToVotes = await Promise.all(optionsIds.map(async optionId => {
		const optionVote = await getOptionVotes(id, optionId);
		// console.log(optionVote.votes)

		console.log('options')
		console.log(options)

		// const result = {'option': optionVote.votes.length}
		const result = {'option': options.options[i], vote: 3}
		i += 1
		return result
	}))
    // You would usually get these using the debate
    const users = [];
    console.log(optionToVotes)
    // let usr = await getUser("5f8ab8e746c4267c36bfda65");
    // users.push(usr.user);
    // usr = await getUser("5f8d2fd5973adc58e42715f7");
    // users.push(usr.user);

    const debate = getDebateRes.debate;
    this.setState({
      topic: debate.topic,
      users: debate.users,
	  options: options.options,
	  optionToVotes: optionToVotes,
	  debate: debate
    });
  }

	handlerSliderChange = (value) => {
		this.setState({
			value
		})
	}

	handleSubmit = () => {
		this.props.navigation.navigate("DebateStanding", {debate: this.state.debate, value: this.state.value, options: this.state.options, optionToVotes: this.state.optionToVotes})
	}

	render(){
		const users = this.state.users;
		const topic = this.state.topic;
		const options = this.state.options;
		return(
			<ImageBackground
              source={bg}
              style={styles.background}
            >
			<View style={styles.container}>
				<View style={styles.header}>
				    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>

				        <Image
				            style={styles.arrow}
				            source={arrow}
				        />
				    </TouchableOpacity>

				</View>
				<View style={styles.topicContainer}>
					<Text style={styles.topic}>{topic}</Text>
				</View>
				{/*<View style={styles.competitors}>
					{
						users.map((user) => {
							return <View style={styles.debater}>
								<Text style={styles.debaterName}>{user.username}</Text>
							</View>
						})
					}
				</View>*/}
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
		paddingTop: 100,
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
        marginBottom: 150
    },
    buttonText: {
    	textAlign: 'center',
    	fontSize: 18,
    	color: '#fff'
    }
})


export default Debate;
