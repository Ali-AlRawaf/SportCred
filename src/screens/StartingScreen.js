import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import logo from '../assets/logo_png.png';
import bg from '../assets/bg.png'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: "#222629",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
    width: "80%",
    alignSelf: "center"
  },
  text: {
    color: "white",
    fontSize: 24,
    paddingVertical: 10,
    textAlign: "center"
  },
  logo: {
    alignSelf: "center",
    width:"100%",
    height:"100%"
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
    <View style={styles.container}>
      <ImageBackground
        source={bg}
        style={styles.background}
      >
        <View
          style={styles.container}
          flex="2"
        >
          <Image
            style={styles.logo}
            source={logo}
          />
        </View>
        <View
          style={styles.container}
          justifyContent="center"
          flex="1"
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
        </View>
        <View
          style={styles.container}
          justifyContent="flex-start"
          flex="1"
        >
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
