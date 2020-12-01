import React from 'react';
import { View, ScrollView, Image, Button, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import profileImage from '../assets/profile_img.jpg';
import {assignPick} from '../controller/picks'
import {getTeamLogo} from '../controller/nba'

class NBATeamCard extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      team: "",
      isLoading: true
    }

    this.handleAssign = this.handleAssign.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      team: this.props.teamName,
      isLoading: false
    })
  }

  handleAssign = () => {
    assignPick(this.props.userId, this.props.topicId, this.state.team).then(res => {
      Alert.alert('Pick assigned!');
    }).catch(err => {
      Alert.alert('Error assigning pick');
    });
  }

  render(){
    if (this.state.isLoading) return null;
    return(
      <View style={styles.container}>
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{this.props.teamName}</Text>
        </View>
        <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={this.handleAssign}
              >
                  <Text
                      style={styles.prompt}
                  >Assign</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '45%',
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    backgroundColor: '#272727',
    marginTop: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
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

  teamImgContainer: {
    height: 70,
    width: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
    
  },

  teamImg: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },

  teamInfo: {
    marginTop: 10,
    width: '95%',
    marginRight: 'auto',
    marginLeft: 'auto'
  },

  teamName: {
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

export default NBATeamCard;