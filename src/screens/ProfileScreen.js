import React from 'react';
import { connect } from "react-redux";
import { View, ScrollView,  Button, StyleSheet, TextInput, Text, Image, ImageBackground } from 'react-native';
import bg from '../assets/bg.png'
import profileImage from '../assets/profile_img.jpg';
import ProfileStats from '../component/ProfileStats'

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
            username: '',
            email: '',
            age: '',
            password: '',
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.onChangeText = this.onChangeText.bind(this)
    }
    
    componentDidMount = () => {
        console.log('here')
        console.log(this.props)
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    
    render() {
        return (
            <ImageBackground
              source={bg}
              style={styles.background}
            >
            <ScrollView style={styles.container}>
                <View style={styles.profileHeader}>
                    <Image
                      style={styles.profileImage}
                      source={profileImage}
                    />
                    <Text style={styles.headerName}>
                        Ryan Brown 
                    </Text>
                    <Text style={styles.headerStatus}>
                        Status: DE-FENCE!!
                    </Text>
                </View>

                <View styles={styles.stats}>
                    <ProfileStats data={data}/>
                </View>

                <View style={styles.editForm}>
                    <TextInput
                        style={styles.formInput}
                        placeholder='Ryan'
                        autoCapitalize="none"
                        placeholderTextColor='grey'
                        onChangeText={val => this.onChangeText('username', val)}
                    />
                    <TextInput
                        style={styles.formInput}
                        placeholder='ryan.brown@email.com'
                        autoCapitalize="none"
                        placeholderTextColor='grey'
                        onChangeText={val => this.onChangeText('username', val)}
                    />
                    <TextInput
                        style={styles.formInput}
                        placeholder='Bio'
                        autoCapitalize="none"
                        placeholderTextColor='grey'
                        onChangeText={val => this.onChangeText('username', val)}
                    />
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
        marginTop: 50
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

    editForm: {
        marginBottom: 100
    },

    formInput: {
        height: 30,
        fontSize: 20,
        margin: 20,
        borderBottomColor: '#747474',
        borderBottomWidth: 0.4,
    }

});

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {  })(ProfileScreen);
