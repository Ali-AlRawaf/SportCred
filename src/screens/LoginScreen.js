import React, { useState } from 'react';
import { connect } from "react-redux";
import { View, Button, StyleSheet, TextInput, Text, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import { login } from '../controller/user';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import bg from '../assets/bg.png';
import logo from '../assets/text_logo.png'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1
    },

    headerContainer: {
        marginTop: 150,
        width: '90%',
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    header: {
        color: "white",
        fontSize: 40,
    },

    formContainer: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    background: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },

    button: {
        backgroundColor: "#53900F",
        width: "80%",
        alignSelf: "center",
        borderRadius: 5,
        paddingVertical: 15,
        marginTop: 40
    },

    input: {
        width: "100%",
        alignSelf: "center",
        paddingVertical: 20,
        marginVertical: 5,
        paddingStart: 10,
        borderBottomColor: '#747474',
        borderBottomWidth: 0.4,
        color: '#fff'
    },

    prompt: {
        alignSelf: "center",
        color: "white",
        fontSize: 15
    },

    logo: {
        alignSelf: "center",
        width: "100%",
        height: "100%"
    },

    here: {
        color: "#FF652F",
        alignSelf: "center"
    },

    hereButton: {
        alignSelf: "center"
    },



});

class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }

        this.updateField = this.updateField.bind(this)
        this.validateLogin = this.validateLogin.bind(this)
    }


    updateField = (key, val) => {
        this.setState({
            [key]: val
        });
    };

    validateLogin = async () => {
        const result = await this.props.login(this.state);
        console.log(result)
        if (result.status === 200) {
            Alert.alert('Login successful');
            this.props.navigation.navigate('Container');
        } else if (result.status === 201) {
            alert('Activation required');
            this.props.navigation.navigate('Activate');
        } else {
            const error_msg = result.error
            alert(result.status + ": " + error_msg)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={bg}
                    style={styles.background}
                >
                    <View style={styles.headerContainer} >
                        <Text
                            style={styles.header}
                        >Login</Text>
                    </View>
                    <View
                        style={styles.formContainer}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder='Username'
                            autoCapitalize="none"
                            placeholderTextColor='grey'
                            onChangeText={text => this.updateField('username', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}
                            autoCapitalize="none"
                            placeholderTextColor="grey"
                            onChangeText={text => this.updateField('password', text)}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.7}
                            onPress={() => this.validateLogin()}
                        >
                            <Text
                                style={styles.prompt}
                            >Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.container}
                        flexDirection="row"
                    >
                        <Text
                            style={styles.prompt}
                        >Don't have an account? Sign up</Text>
                        <TouchableOpacity
                            style={styles.hereButton}
                            activeOpacity={0.7}
                            tex
                            onPress={() => this.props.navigation.navigate('Register')}
                        >
                            <Text
                                style={styles.here}
                            > here</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.container}
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

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
};

export default connect(mapStateToProps, { login })(LoginScreen);
