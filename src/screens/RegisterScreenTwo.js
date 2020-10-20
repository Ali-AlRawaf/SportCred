import React from 'react';
import { View, Button, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';


const RegisterScreenTwo = ({ navigation }) => {
    let state = {
        favSport: '',
        age: '',
        levelOfPlay: '',
        learn: '',
        favTeam: ''
    }

    return (
        <View style={styles.container}>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    placeholder='Age'
                    color="white"
                    autoCapitalize="none"
                    placeholderTextColor='grey'
                    onChangeText={val => this.onChangeText('age', val)}
                />
            </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    color="white"
                    placeholder='Favorite sport?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('favSport', val)}
                />
            </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    color="white"
                    placeholder='Favorite sports team?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('favTeam', val)}
                />
            </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    color="white"
                    placeholder='Highest level of sport play?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('levelOfPlay', val)}
                />
            </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    color="white"
                    placeholder='What sport would you like to know/learn about?'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('learn', val)}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Text
                        style={styles.text}
                    >Next</Text>
                </TouchableOpacity>
            </View >

            <View
              style={styles.container}
              justifyContent="flex-start"
              flex="1">
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Tutorial')}>
                <Text style={styles.text}>Tutorial Page</Text>
              </TouchableOpacity>
            </View>
        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#222629',
    },
    textField: {
        width: 350,
        height: 45,
        backgroundColor: '#222629',
        margin: 10,
        padding: 8,
        fontSize: 30,
        fontWeight: '500',
        borderColor: '#222629',
        borderBottomColor: 'white',
        borderWidth: 0.2,
    },
    fontColor: {
        color: 'wheat'
    },
    button: {
        backgroundColor: "#222629",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "white",
        width: "80%",
        alignSelf: "center"
    }
});

export default RegisterScreenTwo;
