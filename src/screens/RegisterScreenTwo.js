import React from 'react';
import {ScrollView, View, StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground, Image } from 'react-native';
import bg from '../assets/bg.png';
import logo from '../assets/text_logo.png'

const RegisterScreenTwo = ({ navigation }) => {
    let state = {
        favSport: '',
        age: '',
        levelOfPlay: '',
        learn: '',
        favTeam: ''
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.bg}
                source={bg}
            >
            <View
                style={styles.headerContainer}
                >
                <Text
                    style={styles.header}
                >Help us get to know you</Text>
            </View>

            <ScrollView styles={styles.formContainer}>
                <TextInput
                    style={styles.textField}
                    placeholder='Age'
                    autoCapitalize="none"
                    placeholderTextColor='grey'
                    onChangeText={val => this.onChangeText('age', val)}
                />
                <TextInput
                    style={styles.textField}
                    placeholder='Favorite sport?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('favSport', val)}
                />
                <TextInput
                    style={styles.textField}
                    placeholder='Favorite sports team?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('favTeam', val)}
                />
                <TextInput
                    style={styles.textField}
                    placeholder='Highest level of sport play?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('levelOfPlay', val)}
                />
                <TextInput
                    style={styles.textField}
                    placeholder='What sport would you like to know/learn about?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('learn', val)}
                />

                <View style={styles.button}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.prompt}>Let's get started!</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={logo}
                    />
                </View>

            </ScrollView>

           
            </ImageBackground>
        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    formContainer: {
        marginTop: 50,
        backgroundColor: 'red',
        width: '90%'
    },

    textField: {
        width: '90%',
        height: 45,
        fontSize: 20,
        fontWeight: '500',
        borderWidth: 0.2,
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'white',
        borderBottomColor: '#747474',
        borderBottomWidth: 0.4,

    },

    fontColor: {
        color: 'wheat'
    },
    button: {
        backgroundColor: "#53900F",
        borderRadius: 7,
        borderWidth: 1,
        width: "80%",
        alignSelf: "center",
        marginBottom: 50,
        marginTop: 60
    },
    bg: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
        width: "100%",
        height: "100%"        
    },
    prompt: {
        alignSelf: "center",
        color: "white",
        paddingVertical: 15    
    },

    logoContainer: {
        height: 100
    },

    logo:{
        alignSelf: "center",
        width: "100%",
        height: "100%"
    },

    headerContainer: {
        marginTop: 30,
        width: '100%'
    },

    header:{
        color: "white",
        fontSize: 45,
        paddingStart: 10,
        paddingTop: 20,
        textAlign: "center"
    }
});

export default RegisterScreenTwo;
