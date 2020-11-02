import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import EditInput from '../component/editInput';

const EditProfile = (props) => {
    const [userData, setUserData] = useState({
        username: "test",
        email: "test@test.com",
        description: "test Desription",
        password: "test Password",
        status: "test Status",
        bio: "test bio",
    })

    const editData = async () => {
        const response = await fetch(
            `http://localhost:5000/user/editprof`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    "auth-token": "jsonwebtoken",
                },
                body: JSON.stringify({
                    username: userData.username,
                    email: userData.email,
                    status: userData.status,
                    bio: userData.bio,
                    password: userData.password,
                    description: userData.description,
                }),
            }
        );
        const resData = await response.json();
        return resData;
    }

    return (
        <View style={styles.screen}>
            <View style={styles.cancelLogoContainer}>
                <MaterialIcons name="cancel" size={32} color="white" onPress={() => {
                    props.navigation.goBack()
                }} />
            </View>
            <View style={styles.editLogoContainer}>
                <FontAwesome5 name="user-edit" size={32} color="white" />
            </View>
            <EditInput title="Name" value={userData.username} onChangeText={text => setUserData({
                username: text,
                email: "test@test.com",
                description: "test Desription",
                password: "test Password",
                status: "test Status",
                bio: "test bio",
            })} />
            <EditInput title="Email" value={userData.email} onChangeText={text => setUserData({
                username: "test",
                email: text,
                description: "test Desription",
                password: "test Password",
                status: "test Status",
                bio: "test bio",
            })} />
            <EditInput title="Description" value={userData.description} onChangeText={text => setUserData({
                username: "test",
                email: "test@test.com",
                description: text,
                password: "test Password",
                status: "test Status",
                bio: "test bio",
            })} />
            <EditInput title="Status" value={userData.status} onChangeText={text => setUserData({
                username: "test",
                email: "test@test.com",
                description: "test Desription",
                password: "test Password",
                status: text,
                bio: "test bio",
            })} />
            <EditInput title="Password" value={userData.status} isPassword onChangeText={text => setUserData({
                username: "test",
                email: "test@test.com",
                description: "test Desription",
                password: text,
                status: "test Status",
                bio: "test bio",
            })} />
            <View style={styles.buttonContainer}>
                <Button title="Update Profile" onPress={editData} color="green" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#24231f",
        padding: 20,
    },
    cancelLogoContainer: {
        width: "100%",
        height: "15%",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 20,
    },
    editLogoContainer: {
        width: "100%",
        height: "15%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    buttonContainer: {
        width: 400,
        alignSelf: "center",
        borderRadius: 10
    }
})

export default EditProfile;