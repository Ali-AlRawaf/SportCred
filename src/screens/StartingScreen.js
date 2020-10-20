import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import logo from '../assets/text_logo.png';
import bg from '../assets/landing.png'

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


const StartingScreen = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={bg}
        style={styles.background}
      >
        <View
          style={styles.logoContainer}
        >
          <Image
            style={styles.logo}
            source={logo}
          />
        </View>

        <View
          style={styles.navContainer}
          justifyContent="center"
        >
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Login')}
          >
            <Text
              style={styles.text}
            >Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Register')}
          >
            <Text
              style={styles.text}
            >Sign up</Text>
          </TouchableOpacity>

        </View>


      </ImageBackground>
    </View>
  );
}

export default StartingScreen;
