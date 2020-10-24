import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import {login} from '../controller/user';
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
const LoginScreen = ({ navigation }) => {
    const [userInfo, setState] = useState({
        username: '',
        password: ''
    });

    const updateField = (key, val) => {
        setState({
            ...userInfo,
            [key]: val
        });
    };

    const validateLogin = async () => {
        const result = await login(userInfo)
        if(result.status === 200)
            navigation.navigate('Profile')
        else
            alert(result.status + ": " + result.error)
    }

    {
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
                            onChangeText={text => updateField('username', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}
                            autoCapitalize="none"
                            placeholderTextColor="grey"
                            onChangeText={text => updateField('password', text)}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.7}
                            onPress={() => validateLogin()}
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
                            onPress={() => navigation.navigate('Register')}
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

            </View >

        )
    }
}
export default LoginScreen;