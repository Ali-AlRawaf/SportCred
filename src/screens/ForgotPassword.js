import React, { useState } from 'react';
import { connect } from "react-redux";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';
import bg from '../assets/landing.png'
import logo from '../assets/text_logo.png';
import { resetPassword } from '../controller/user'
import arrow from '../assets/arrow_forward.png'

class ForgotPassword extends React.Component {
    constructor (props) {
        super(props);

        this.state = { 
            email: ''
        }

        this.send = this.send.bind(this);
    }

    send = async () => {
        const result = await resetPassword(this.state);
        if(result.status === 200) alert(result.text);
        else alert(result.status + ': ' + result.text);
    }

    render(){
      return(
        <View style={styles.screenContainer}>
            <ImageBackground
                source={bg}
                style={styles.background}
            >
                <View
                    style={styles.navContainer}
                    justifyContent="center"
                >
                    <TouchableOpacity
                        style={styles.backButton}
                        activeOpacity={0.7}
                        onPress={() => this.props.navigation.goBack(null)}
                    >
                      <Image
                          style={styles.arrow}
                          source={arrow}
                      />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        autoCapitalize="none"
                        placeholderTextColor='grey'
                        onChangeText={text => this.setState({email: text})}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={() => this.send()}
                    >
                        <Text
                            style={styles.buttonText}
                        >Reset Password</Text>
                    </TouchableOpacity>
                </View>
                <View
                  style={styles.logoContainer}
                >
                  <Image
                    style={styles.logo}
                    source={logo}
                  />
                </View>
            </ImageBackground>
        </View>
      )
    }
}

const styles = StyleSheet.create({
    screenContainer: {
      display: 'flex',
      height: '100%',
      width: '100%'
    },

    container: {
      justifyContent: 'center',
      flex: 1
    },
  
    logoContainer: {
      flex: 1,
    },
  
    navContainer: {
      flex: 1,
    },
  
    button: {
      backgroundColor: "#53900F",
      borderRadius: 20,
      borderWidth: 0.3,
      width: "40%",
      alignSelf: "center",
    },

    backButton: {
      marginVertical: 30,
      marginLeft: 20,
    },

    buttonText: {
      color: "white",
      fontSize: 18,
      marginVertical: 10,
      textAlign: "center"
    },

    hereButton: {
      alignSelf: "center"
    },

    here: {
      color: "#FF652F",
      alignSelf: "center",
      marginBottom: 40
    },
  
    text: {
      color: "white",
      fontSize: 18,
      marginTop: 10,
      marginBottom: 20,
      marginHorizontal: 20,
      textAlign: "center"
    },

    input: {
      width: "90%",
      alignSelf: "center",
      paddingVertical: 20,
      paddingStart: 10,
      borderBottomColor: '#747474',
      borderBottomWidth: 0.4,
      color: '#fff',
      marginBottom: 50
    },

    prompt: {
      alignSelf: "center",
      color: "white"
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
    },
    arrow: {
      tintColor: "white",
      height: 40,
      width: 40,
      transform: [{
        rotate: '-180deg'
      }],
    }
  });

const mapStateToProps = (state) => {
    return {
      currentUser: state.auth.currentUser,
    };
  };
  
export default connect(mapStateToProps, {  })(ForgotPassword);