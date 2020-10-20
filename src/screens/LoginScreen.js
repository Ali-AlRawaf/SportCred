import React from 'react';
import { View, Button, StyleSheet, TextInput, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import bg from '../assets/bg.png';
import logo from '../assets/text_logo.png'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1    
    },
    textField: {
        width: 350,
        height: 55,
        backgroundColor: '#222629',
        margin: 10,
        padding: 8,
        fontSize: 18,
        fontWeight: '500',
        borderColor: '#222629',
        borderBottomColor: 'white',
        borderWidth: 0.2,
    },
    fontColor: {
        color: 'white'
    },
    background: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    button:{
        backgroundColor: "#53900F",
        width: "80%",
        alignSelf: "center",
        borderRadius: 5,
        paddingVertical: 15
    },
    input: {
        backgroundColor: "#222629",
        width: "80%",
        alignSelf: "center",
        paddingVertical: 20,
        marginVertical: 5,
        paddingStart: 10
    },
    prompt: {
        alignSelf: "center",
        color: "white"    
    },
    logo:{
        alignSelf: "center",
        width: "100%",
        height: "100%"
    },
    here:{
        color: "#FF652F",
        alignSelf: "center"
    },
    hereButton:{
        alignSelf:"center"
    },
    header: {
        color: "white",
        fontSize: 40,
        fontFamily: "Monsterrat",
        paddingStart: 35
    }

});
const LoginScreen = ({ navigation }) => {
    {
        return (
            <View 
                style={styles.container}
            >
                <ImageBackground
                    source={bg}
                    style={styles.background}
                >
                <View
                    style={styles.container}
                    justifyContent="flex-end"
                    flex="2"
                >
                <Text
                    style={styles.header}
                >Login</Text>
                </View>
                <View 
                    style={styles.container}
                    justifyContent="flex-end"
                    flex="2"
                >
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        autoCapitalize="none"
                        placeholderTextColor='grey'
                        onChangeText={val => this.onChangeText('username', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor="grey"
                        onChangeText={val => this.onChangeText('email', val)}
                    />
                </View>
                <View
                    style={styles.container}
                    justifyContent="flex-end"
                    flex="1"
                    >
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Text
                        style={styles.prompt}
                        fontSize="20"
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