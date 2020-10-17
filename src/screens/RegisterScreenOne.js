import React from 'react';
import { View, Button, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';


const RegisterScreenOne = ({ navigation }) => {
    let state = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        age: ''
    }


    return (
        <View style={styles.container}>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    color="white"
                    autoCapitalize="none"
                    placeholderTextColor='grey'
                    onChangeText={val => this.onChangeText('username', val)}
                />
            </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    color="white"
                    placeholder='Email'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onChangeText={val => this.onChangeText('email', val)}
                />
            </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    color="white"
                    placeholder='Password'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    onChangeText={val => this.onChangeText('password', val)}
                />
            </View>
            <View style={styles.textField}>
                <TextInput
                    style={styles.input}
                    color="white"
                    placeholder='Confirm Password'
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    onChangeText={val => this.onChangeText('confirmPassword', val)}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('RegisterTwo')}
                >
                    <Text
                        style={styles.text}
                    >Next</Text>
                </TouchableOpacity>
            </View >
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

export default RegisterScreenOne;