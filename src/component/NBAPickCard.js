import React from 'react';
import { View, ScrollView, Image, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import profileImage from '../assets/profile_img.jpg';

const NBAPickCard = ({player}) => {

  return(
    <View style={styles.container}>
      <View style={styles.profileImgContainer}>
        <Image
            style={styles.profileImg}
            source={player.headshot}
          />
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileUsername}>{player.fullName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    backgroundColor: '#272727',
    margin: 5,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },

  profileImgContainer: {
    height: 70,
    width: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
    
  },

  profileImg: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },

  profileInfo: {
    marginTop: 10,
    width: '95%',
    marginRight: 'auto',
    marginLeft: 'auto'
  },

  profileUsername: {
    fontSize: 15,
    textAlign: 'center',
    color: '#ebebeb'
  },

  profileScore: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 30,
    color: '#FF652F'
  }

})

export default NBAPickCard;