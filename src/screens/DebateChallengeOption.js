import React, { useState } from 'react';
import { connect } from "react-redux";
import { View, ScrollView, StyleSheet, Text, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bg from '../assets/bg.png'
import profileImage from '../assets/profile_img.jpg'
import arrow from '../assets/arrow_forward.png'
import {getNotifs} from '../controller/notif'
import Notification from '../component/Notification'
import {getUser} from '../controller/user'
import {addOption, getDebate} from '../controller/debate'

class DebateChallengeOption extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.route.params.id,
      debate: {},
      challenger: '',
      response: ''
    };

    this.updateField = this.updateField.bind(this);
    this.submitOption = this.submitOption.bind(this);
  }

  componentDidMount = () => {
    getDebate(this.state.id).then((resDebate) => {
        getUser(resDebate.debate.users[0]).then((userRes) => {
            this.setState({debate: resDebate.debate, challenger: userRes.user.username})
        })
    });
  };

  updateField = (key, val) => {
    this.setState({
        [key]: val
    });
  };

  submitOption = () => {
    addOption({debate: this.state.id, option: this.state.response}).then((optionRes) => {
        if(optionRes.status != 200){
            alert(optionRes.status + ': ' + optionRes.error)
        } else {
            this.props.navigation.navigate("Inbox")
        }
    })
  }

  render(){
    const challenger = this.state.challenger;
    const topic = this.state.debate.topic;
    return(
        <ImageBackground
        source={bg}
        style={styles.background}
        >
        <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                <Image
                    style={styles.arrow}
                    source={arrow}
                />
            </TouchableOpacity>
            <Image
                style={styles.profileImg}
                source={profileImage}
            />
            <View style={styles.profileInfo}>
                <Text style={styles.profileUsername}>{challenger}</Text>
            </View>
            <Text style={styles.topic}>{topic}</Text>
            <TextInput
                style={styles.textField}
                placeholder='Answer...'
                color="white"
                autoCapitalize="none"
                placeholderTextColor='grey'
                onChangeText={text => this.updateField('response', text)}
            />
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => this.submitOption()}
            >
                <Text
                    style={styles.prompt}
                >Debate!</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
    prompt: {
        alignSelf: "center",
        color: "white",
        fontSize: 15
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
    textField: {
        height: 45,
        padding: 8,
        marginTop: 25,
        fontSize: 20,
        fontWeight: '500',
        borderBottomColor: '#747474',
        borderBottomWidth: 0.4,
        color: '#fff',
        marginHorizontal: 20
    },
	container: {
		height: '100%',
		width: '95%',
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingTop: 100,
	},
	header: {
        flexDirection: 'column',
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
      height: 35,
      width: 35,
      transform: [{
        rotate: '-180deg'
      }],
      marginTop: 15,
      marginLeft: 10
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
	topic: {
		fontSize: 20,
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
    buttonText: {
    	textAlign: 'center',
    	fontSize: 18,
    	color: '#fff'
    },
    profileImg: {
        height: '40%',
        width: '20%',
        borderRadius: 50,
        alignSelf: "center"
    },
    profileInfo: {
        marginTop: 10,
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    profileUsername: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ebebeb',
        marginBottom: 20
    },
})

const mapStateToProps = (state) => {
    return {
      currentUser: state.auth.currentUser,
    };
};
  
export default connect(mapStateToProps)(DebateChallengeOption);