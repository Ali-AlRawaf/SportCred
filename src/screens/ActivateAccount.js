import React, { useState } from 'react';
import { connect } from "react-redux";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';
import bg from '../assets/landing.png'
import logo from '../assets/text_logo.png';
import { resendActivation, getUser } from '../controller/user'

class ActivateAccount extends React.Component {
    constructor (props) {
        super(props);

        this.state = { 
            //activated: false,
            email: 'EMAIL'

        }

        this.resend = this.resend.bind(this);
        this.check = this.check.bind(this);
    }

    resend = async () => {
        const result = await resendActivation(this.props.currentUser);

        if(result.status === 200) alert(result.text);
        else alert(result.status + ': ' + result.text);
    }

    check = async () => {
        const result = await getUser(this.props.currentUser);
        if(result.status === 200){
            if(result.user.activated) this.props.navigation.navigate('RegisterTwo');
            else alert('your email has not been activated yet. please check your inbox or resend');
        } else {
            alert(result.status + ': ' + result.error)
        }
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
                    <View style={styles.text}>
                      <Text style={styles.text}>
                        A verification email has been sent to {this.state.email}
                      </Text>
                    </View>
                    <View
                        style={styles.container}
                        flexDirection="row"
                    >
                        <Text
                            style={styles.prompt}
                        >Didn't recieve an email?</Text>
                        <TouchableOpacity
                            style={styles.hereButton}
                            activeOpacity={0.7}
                            onPress={() => this.resend()}
                        >
                            <Text
                                style={styles.here}
                            > Resend</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={() => this.check()}
                    >
                        <Text
                            style={styles.buttonText}
                        >Continue</Text>
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
      marginBottom: 30
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
      marginTop: 30,
      marginBottom: 20,
      marginHorizontal: 20,
      textAlign: "center"
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
    }
  });

const mapStateToProps = (state) => {
    return {
      currentUser: state.auth.currentUser,
    };
  };
  
export default connect(mapStateToProps, {  })(ActivateAccount);