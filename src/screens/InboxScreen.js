import React, { useState } from 'react';
import { connect } from "react-redux";
import { View, ScrollView, StyleSheet, Text, Image, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import bg from '../assets/bg.png'
import profileImage from '../assets/profile_img.jpg'
import arrow from '../assets/arrow_forward.png'
import {getNotifs} from '../controller/notif'
import Notification from '../component/Notification'
import {getUser} from '../controller/user'

class InboxScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: '',
      data: [],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    getNotifs(this.props.currentUser).then((resNotifs) => {
        console.log(resNotifs.notifs)
        this.setState({
            data: resNotifs.notifs,
            isLoading: false
        })
    });
  }

  render(){
    if (this.state.isLoading) return null;

    if(this.state.data.length == 0) {
      return(
        <ImageBackground
          source={bg}
          style={styles.background}
        >
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
          <View
          style={styles.noNotifContainer}
          >
            <Text
            style={styles.noNotifText}
            >
              No Notifications
            </Text>
          </View>
        </ImageBackground>
      )
    }

    const listItems = this.state.data.map((d, idx) => {
      return(<Notification notifBody={d.notifBody} link={d.link}></Notification>);
    });

    return(
      <ImageBackground
          source={bg}
          style={styles.background}
      >
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
      <ScrollView>
        <View style={styles.posts}>
            {listItems}
        </View>
      </ScrollView>
      </ImageBackground>
    )
  }

}

const styles = StyleSheet.create({
    noNotifText: {
      color: 'white',
      fontSize: 20,
    },
    noNotifContainer:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    posts: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
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
      marginTop: 40,
      marginLeft: 20,
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
  
export default connect(mapStateToProps)(InboxScreen);