import React, { useState } from 'react';
import { connect } from "react-redux";
import { View, ScrollView, StyleSheet, Text, Image, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import bg from '../assets/bg.png'
import RadarItem from '../component/RadarItem'
import profileImage from '../assets/profile_img.jpg';
import arrow from '../assets/arrow_forward.png'
import { getFollowers } from '../controller/radarlist'
import debatePNG from '../assets/debate.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getUser, getUserByName } from '../controller/user'
import { addTrivia } from '../controller/trivia'
import { sendNotif } from "../controller/notif"
import { getTrivia } from "../controller/trivia"

class RadarListScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      debating: false,
      trivia: false
    };
    this.getRadarList = this.getRadarList.bind(this);
    this.enableDebate = this.enableDebate.bind(this);
  }

  componentDidMount = () => {
      this.getRadarList().then(res => {
        this.setState({
          data: res.followers,
          isLoading: false
        })
      });

  }

  getRadarList = async () => {
    const data = await getFollowers({'user': '5fa03dbd26f5b1307cd8c610'});
    
    for (let i in data.followers) {
      data.followers[i].profileImg = profileImage;
    }
    return data
  }

  enableDebate = async() => {
    await this.setState({debating: true, trivia: false});
    alert("Please tap on someone from your radar list to challenge to a debate!");
  }

  enableTrivia = async() => {
    await this.setState({debating: false, trivia: true});
    alert("Please tap on someone from your radar list to challenge to a Trivia!");
  }

  challenge = async(user) => {
    if(this.state.debating) {
      this.props.navigation.navigate("NewDebate", {challengee: user});
    } else if (this.state.trivia) {
      getUserByName(user).then(recipientRes => {
        if(recipientRes.status != 200) {
          alert(recipientRes.status + ': ' + recipientRes.error)
        } else {
          addTrivia({ players: [ { userId: this.props.currentUser }, { userId: recipientRes.user._id } ] }).then(triviaRes => {
            if(triviaRes.status != 200) {
              alert(triviaRes.status + ': ' + triviaRes.error)
            } else {
              getUser(this.props.currentUser).then(currUser => {
                sendNotif({
                  sender: this.props.currentUser,
                  link: triviaRes.id,
                  notifBody: currUser.user.username + " has challenged you to a trivia!",
                  recipient: recipientRes.user._id,
                  type: "Trivia"
                }).then(notifRes => {
                  if (notifRes.status != 200) {
                    alert(notifRes.status + ': ' + notifRes.error)
                  } else {
                    alert("Succesfully challenged " + user + " to a trivia!");
                    getTrivia(triviaRes.id).then((resTrivia) => {
                      this.props.navigation.navigate("TriviaGauntlet", {questions: resTrivia.trivia.questions, sid: resTrivia.trivia._id})
                    })
                  }
                })
              })
            }
          })
        }
      })
    }
  }

  render(){
    if (this.state.isLoading) return null;
    return(
      <ImageBackground
          source={bg}
          style={styles.background}
      >
      <View style={styles.header}>
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => this.props.navigation.goBack(null)}
        >
          <Image
              style={styles.arrow}
              source={arrow}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.triviaButton}
          activeOpacity={0.7}
          onPress={() => this.enableTrivia()}
        >
          <MaterialCommunityIcons name={"gamepad-square"} size={60} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.debateButton}
          activeOpacity={0.7}
          onPress={() => this.enableDebate()}
        >
          <Image
            style={styles.debateImg}
            source={debatePNG}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList data={this.state.data}
            keyExtractor={(item, index) => 'key' + index}
            vertical
            pagingEnabled
            scrollEnabled
            numColumns={2}
            snapToAlignment="center"
            scrollEventThrottle={15}
            decelerationRate={"fast"}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity 
                  style={styles.containerRadar}
                  activeOpacity={0.7}
                  onPress={()=> this.challenge(item.username)}
                >
                  <RadarItem item={item}/>
                </TouchableOpacity>
              );
            }}
        />
      </ScrollView>
      </ImageBackground>
    )
  }

}

const styles = StyleSheet.create({
  header:{
    justifyContent: 'space-between',
    flexDirection: "row"
  },
  container: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: '100%'
  },

  containerRadar: {
    flex: 1,
    width: null,
  },

  radarItem: {
    margin: 3,
  },

  button: {
    marginTop: 80,
    marginLeft: 20,
  },

  triviaButton: {
    marginTop: 60
  },

  background: {
    flex: 1,
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },

  arrow: {
    height: 25,
    width: 25,
    transform: [{
      rotate: '-180deg'
    }],
  },

  debateButton: {
    marginTop: -20,
    marginRight: 20,
    alignSelf: 'flex-end'
  },

  debateImg: {
    height: 40,
    width: 40
  },
})

const mapStateToProps = (state) => {
	return {
	  currentUser: state.auth.currentUser,
	};
  };
  
export default connect(mapStateToProps)(RadarListScreen);