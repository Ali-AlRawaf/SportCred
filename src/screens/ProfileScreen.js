import React from 'react';
import { View, Button, StyleSheet, TextInput, Text, Image } from 'react-native';


export default class ProfileScreen extends React.Component {
    state = {
        username: '',
        email: '',
        age: '',
        password: '',
    }
    profileText = "Firstname:\n\nLastname:\n\nUsername:\n\nemail:\n\nage:"
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headline}>
                    Welcome to Your SportsCred Profile
                </Text>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://d1b10bmlvqabco.cloudfront.net/paste/kf05ebzn2ak3tv/abda1cb94d7e929d15fd4136fe247b988cd40576b35379452c568829c23b16a0/image.png',
                    }}
                />
                <View style={styles.textField}>
                    <Text style={styles.textField}>
                        {this.profileText}
                    </Text>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: '#222629',
    },
    textField: {
        width: 450,
        height: 500,
        color: 'white',
        backgroundColor: '#222629',
        margin: 10,
        padding: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
    fontColor: {
        color: 'wheat'
    },
    headline: {
        textAlign: 'center',
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        width: 500,
        backgroundColor: 'yellow',
    },
    logo: {
        margin: "auto",
        width: 250,
        height: 200
    }
});