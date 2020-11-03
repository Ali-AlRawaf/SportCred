import React , { useState } from 'react';
import { connect } from "react-redux";
import { View, ScrollView,StyleSheet, Text, Image, ImageBackground } from 'react-native';
import bg from '../assets/bg.png'
import profileImage from '../assets/profile_img.jpg';
import ProfileStats from '../component/ProfileStats'
import { FontAwesome5 } from '@expo/vector-icons';
import {getUser} from '../controller/user';

const data = 
    [{
        id: 1, title: "ACS", description: "220"
    },
    {
        id: 2, title: "Bio", description: "This is my user bio"
    },
    {
        id: 3, title: "Trivia", description: "25 games"
    },
    ]



class ProfileScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: 'NAME',
            email: 'EMAIL',
        }

    }
    
    componentDidMount = () => {
        getUser(this.props.currentUser)
        .then((result) => {
        this.setState({
        username: result.user.username,
        email: result.user.email,
})
      })
      .catch((err) =>{
        console.log(err)
      })
    }

    UpdateField = (key, val) => {
        this.setState({ [key]: val })
    }
    
    render() {
        return (
            <ImageBackground
              source={bg}
              style={styles.background}
            >
            <ScrollView style={styles.container}>
                <View style={styles.editLogoContainer}>
                    <FontAwesome5 name="user-edit" size={32} color="white"
                    onPress={() => this.props.navigation.navigate('Edit')}
                    />
                </View>
                <View style={styles.profileHeader}>
                    <Image
                      style={styles.profileImage}
                      source={profileImage}
                    />
                    <Text style={styles.headerName}>
                        {this.state.username}
                    </Text>
                    <Text style={styles.headerStatus}>
                        Status: DE-FENCE!!
                    </Text>
                </View>

                <View styles={styles.stats}>
                    <ProfileStats data={data}/>
                </View>
            </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
    },

    stats: {
        paddingTop: 200,
    },

    profileHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    profileImage: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.8 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5
    },

    headerName: {
        color: 'white',
        fontSize: 30,
        marginBottom: 15
    },

    headerStatus: {
        color: 'white',
        marginBottom: 29
    },
    
    background: {
      flex: 1,
      resizeMode: "stretch",
      width: "100%",
      height: "100%"
    },
    editLogoContainer: {
        Position:"absolute",
        width: "100%",
        height: "15%",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 20,
    }

});

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {  })(ProfileScreen);
