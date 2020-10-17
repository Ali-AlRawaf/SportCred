import React from 'react';
import { View, Button, StyleSheet, TextInput, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#222629',
    },
    textField: {
        width: 350,
        height: 55,
        backgroundColor: '#222629',
        margin: 10,
        padding: 8,
        fontSize: 18,
        fontWeight: '500',
        borderColor: '#222629',
        borderBottomColor: 'white',
        borderWidth: 0.2,
    },
    fontColor: {
        color: 'wheat'
    }
});
const LoginScreen = ({ navigation }) => {
    {
        return (
            <View style={styles.container}>
                <View style={styles.textField}>
                    <TextInput
                        style={styles.input}
                        placeholder='Username'
                        autoCapitalize="none"
                        placeholderTextColor='grey'
                        onChangeText={val => this.onChangeText('username', val)}
                    />
                </View>
                <View style={styles.textField}>
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor="grey"
                        onChangeText={val => this.onChangeText('email', val)}
                    />
                </View>
                <View>
                    <Button
                        style={styles.buttons}
                        color="white"
                        title="Enter"
                        onPress={() => navigation.navigate('Profile')}
                    />
                    <Button
                        color="white"
                        title="sign up"
                        onPress={() => navigation.navigate('Sign up')}
                    />
                </View >
            </View >

        )
    }
}
export default LoginScreen;