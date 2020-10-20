import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { register } from '../controller/user'
import bg from '../assets/bg.png';
import logo from '../assets/text_logo.png'
import arrow from '../assets/arrow_forward.png'
const RegisterScreenOne = ({ navigation }) => {

    const [userInfo, setState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const updateField = (key, val) => {
        setState({
            ...userInfo,
            [key]: val
        });
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.bg}
                source={bg}
            >
                <View
                    style={styles.headerContainer}
                >
                    <Text style={styles.header}>Sign Up</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.textField}
                        placeholder='Username'
                        color="white"
                        autoCapitalize="none"
                        placeholderTextColor='grey'
                        onChangeText={text => updateField('username', text)}
                    />
                    <TextInput
                        style={styles.textField}
                        color="white"
                        placeholder='Email'
                        autoCapitalize="none"
                        placeholderTextColor="grey"
                        onChangeText={text => updateField('email', text)}
                    />
                    <TextInput
                        style={styles.textField}
                        color="white"
                        placeholder='Password'
                        autoCapitalize="none"
                        placeholderTextColor="grey"
                        secureTextEntry={true}
                        onChangeText={text => updateField('password', text)}
                    />
                    <TextInput
                        style={styles.textField}
                        color="white"
                        placeholder='Confirm Password'
                        autoCapitalize="none"
                        placeholderTextColor="grey"
                        secureTextEntry={true}
                        onChangeText={text => updateField('confirmPassword', text)}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('RegisterTwo')}
                    >
                        <Image
                            style={styles.arrow}
                            source={arrow}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.container}
                    flexDirection="row"
                >
                    <Text
                        style={styles.prompt}
                    >Already have an account? Login</Text>
                    <TouchableOpacity
                        style={styles.hereButton}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Login')}
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

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1
    },
    textField: {
        width: '100%',
        height: 45,
        padding: 8,
        marginTop: 25,
        fontSize: 20,
        fontWeight: '500',
        borderBottomColor: '#747474',
        borderBottomWidth: 0.4,
    },

    headerContainer: {
        marginTop: 50,
        width: '95%',
        marginLeft: 'auto'
    },

    header: {
        color: "white",
        fontSize: 40,
    },

    fontColor: {
        color: 'wheat'
    },

    formContainer: {
        marginTop: 50,
        width: '90%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 20,
    },

    button: {
        backgroundColor: "#53900F",
        borderRadius: 100,
        marginTop: 30,
        width: 60,
        height: 60,
        alignSelf: "center",
        justifyContent: "center"
    },

    bg: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },

    here: {
        color: "#FF652F",
        alignSelf: "center"
    },

    logo: {
        alignSelf: "center",
        width: "100%",
        height: "100%"
    },

    hereButton: {
        alignSelf: "center"
    },

    prompt: {
        alignSelf: "center",
        color: "white"
    },

    arrow: {
        alignSelf: "center",
    },
});

export default RegisterScreenOne;