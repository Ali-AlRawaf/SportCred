import React from "react";
import profile_img from '../assets/profile_img.jpg';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import arrow from '../assets/arrow_forward.png'
import bg from '../assets/bg.png'

class NewDebate extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			topic: "",
			option: ""
		}

		this.updateField = this.updateField.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	updateField = (key, val) => {
        this.setState({
            [key]: val
        });
    };

    handleSubmit = () => {
    	// TODO
    }

	render(){
		return (
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
				<Text style={styles.title}>Create a new debate!</Text>
				<TextInput
				    style={styles.input}
				    placeholder='Topic of Debate!'
				    autoCapitalize="none"
				    placeholderTextColor='grey'
				    onChangeText={text => this.updateField('topic', text)}
				/>
				<TextInput
				    style={styles.input}
				    placeholder='Your option'
				    autoCapitalize="none"
				    placeholderTextColor='grey'
				    onChangeText={text => this.updateField('option', text)}
				/>
				<TouchableOpacity
                    style={styles.submitButton}
                    activeOpacity={0.7}
                    onPress={() => this.handleSubmit()}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
			</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '95%',
		marginTop: 100,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	background: {
		flex: 1
	},
	header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        width: '95%',
        paddingLeft: 10
    },
    arrow: {
      height: 25,
      width: 25,
      transform: [{
        rotate: '-180deg'
      }],
    },
	title: {
		textAlign: 'center',
		fontSize: 35,
		color: 'white',
		marginBottom: 40,
	},
	input: {
        width: "80%",
        alignSelf: "center",
        paddingVertical: 20,
        marginVertical: 5,
        paddingStart: 10,
        borderBottomColor: '#747474',
        borderBottomWidth: 0.4,
        color: '#fff',
        marginBottom: 20,
    },
	submitButton: {
        backgroundColor: "#6a6e6c",
        width: "40%",
        alignSelf: "center",
        borderRadius: 5,
        paddingVertical: 15,
        marginTop: 30,
        marginBottom: 150
    },
    submitButtonText: {
    	textAlign: 'center',
    	fontSize: 18,
    	color: '#fff'
    }
})

export default NewDebate;