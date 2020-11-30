import React from 'react';
import { View, ScrollView, Image, Button, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import profileImage from '../assets/profile_img.jpg';
import {assignPick} from '../controller/picks'

const NBAPickCard = ({player, userId, topicId}) => {

  function handleAssign(){
    assignPick(userId, topicId, player.fullName);
  }

  return(
    <View style={styles.container}>
      <View style={styles.profileImgContainer}>
        <Image
            style={styles.profileImg}
            source={{uri: player.headshot}}
          />
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileUsername}>{player.fullName}</Text>
      </View>
      <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={handleAssign}
            >
                <Text
                    style={styles.prompt}
                >Assign</Text>
    </TouchableOpacity>
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
  },
  button: {
      backgroundColor: "#FF652F",
      width: "80%",
      alignSelf: "center",
      borderRadius: 5,
      paddingVertical: 15,
      marginTop: 40,
      marginBottom: 20
  },

    prompt: {
        alignSelf: "center",
        color: "white",
        fontSize: 15
    },

})

export default NBAPickCard;