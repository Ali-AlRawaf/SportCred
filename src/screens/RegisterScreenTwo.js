import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground, Image } from 'react-native';
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
                style={styles.container}
                >
                    <Text
                        style={styles.header}
                    >Help us get to know you</Text>
                </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    placeholder='Age'
                    color="white"
                    autoCapitalize="none"
                    placeholderTextColor='grey'
                    onChangeText={val => this.onChangeText('age', val)}
                />
            </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    color="white"
                    placeholder='Favorite sport?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('favSport', val)}
                />
            </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    color="white"
                    placeholder='Favorite sports team?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('favTeam', val)}
                />
            </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    color="white"
                    placeholder='Highest level of sport play?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('levelOfPlay', val)}
                />
            </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    color="white"
                    placeholder='What sport would you like to know/learn about?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('learn', val)}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Text
                        style={styles.prompt}
                    >Let's get started!</Text>
                </TouchableOpacity>
            </View >
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
        width: 350,
        height: 45,
        backgroundColor: '#222629',
        margin: 10,
        padding: 8,
        fontSize: 30,
        fontWeight: '500',
        borderColor: '#222629',
        borderBottomColor: 'white',
        borderWidth: 0.2,
    },
    fontColor: {
        color: 'wheat'
    },
    button: {
        backgroundColor: "#53900F",
        borderRadius: 7,
        borderWidth: 1,
        width: "80%",
        alignSelf: "center"
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
    logo:{
        alignSelf: "center",
        width: "100%",
        height: "100%"
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