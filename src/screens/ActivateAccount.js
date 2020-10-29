import React, { useState } from 'react';
import { connect } from "react-redux";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';
import bg from '../assets/landing.png'
import { checkActivation, resendActivation, getUser } from '../controller/user'
import user from '../models/user';

export default class ActivateAccount extends React.Component {
    constructor (props) {
        super(props);
        user = getUser(this.props.currentUser)

        this.state = { 
            //activated: false,
            email: user.email,
        }

        this.resend = this.resend.bind(this);
        this.check = this.check.bind(this);
    }

    resend = async () => {
        result = resendActivation(this.props.currentUser);
        if(result.status === 201){
            Alert.alert('Your account has been activated, please continue.')
        } else if(status != 200){
            Alert.alert(result.status + ': ' + result.error)
        }
    }

    check = async () => {
        result = await getUser(this.props.currentUser);
        if(result.status === 200){
            if(result.user.activated) this.props.navigation.navigate('RegisterTwo')
        } else {
            Alert.alert(result.status + ': ' + result.error)
        }
    }

    render(){
        <View style={styles.screenContainer}>
            <ImageBackground
                source={bg}
                style={styles.background}
            >
                <View
                    style={styles.navContainer}
                    justifyContent="center"
                >
                    <Text>
                        A verification email has been sent to {this.state.email}! It will expire after one day. 
                        If you do not get the verification email, click on resend.
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={() => resend()}
                    >
                        <Text
                            style={styles.text}
                        >Resend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={() => check()}
                    >
                        <Text
                            style={styles.text}
                        >Continue</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    }
}

const styles = StyleSheet.create({
    screenContainer: {
      display: 'flex',
      height: '100%',
      width: '100%'
    },
  
    logoContainer: {
      flex: 1,
    },
  
    navContainer: {
      flex: 1,
    },
  
    button: {
      backgroundColor: "#222629",
      borderRadius: 20,
      borderWidth: 0.3,
      borderColor: "#747474",
      width: "80%",
      alignSelf: "center",
      marginBottom: 30
    },
  
    text: {
      color: "white",
      fontSize: 24,
      paddingVertical: 10,
      textAlign: "center"
    },
  
    logo: {
      alignSelf: "center",
      marginTop: 50,
      width:"100%",
      height:"100%",
    },
    background: {
      flex: 1,
      resizeMode: "stretch",
      justifyContent: "center",
      width: "100%",
      height: "100%"
    }
  });

const mapStateToProps = (state) => {
    return {
      currentUser: state.auth.currentUser,
    };
  };
  
export default connect(mapStateToProps, {  })(ActivateAccount);