import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Post from '../component/Post';
import profile_img from '../assets/profile_img.jpg';
import logo_png from '../assets/logo_png.png';
import StephenASmith from '../assets/StephenASmith.png';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const userPosts = [
    {
        name: "Yousuf Madi",
        profilePic: profile_img,
        post: 'Jimmy Butler will have a ring within the next 4 years! Calling it from now'
    },
    {
        name: "Yousuf Madi",
        profilePic: profile_img,
        post: 'Jimmy Butler will have a ring within the next 4 years! Calling it from now'
    },
    {
        name: "Yousuf Madi",
        profilePic: profile_img,
        post: 'Jimmy Butler will have a ring within the next 4 years! Calling it from now'
    },
    {
        name: "Yousuf Madi",
        profilePic: profile_img,
        post: 'Jimmy Butler will have a ring within the next 4 years! Calling it from now'
    },
    {
        name: "Stephen A Smith",
        profilePic: StephenASmith,
        post: "I AM DISSAPOINTED IN PAUL GEORGE'S PLAYOFF PERFORMANCE!" +
            "I AM DISSAPOINTED IN PAUL GEORGE'S PLAYOFF PERFORMANCE!" +
            "I AM DISSAPOINTED IN PAUL GEORGE'S PLAYOFF PERFORMANCE!" +
            "I AM DISSAPOINTED IN PAUL GEORGE'S PLAYOFF PERFORMANCE!" +
            "I AM DISSAPOINTED IN PAUL GEORGE'S PLAYOFF PERFORMANCE!" +
            "I AM DISSAPOINTED IN PAUL GEORGE'S PLAYOFF PERFORMANCE!",
    },
    {
        name: "SportCred",
        profilePic: logo_png,
        post: "Login for 7 days straight and boost your ACS by 25 points!"
    }
]

function OpenCourtScreen() {

    const listItems = userPosts.map((d, idx) => <Post key={idx} name={d.name} profilePic={d.profilePic} post={d.post}></Post>);

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.posts}>
                    {listItems}
                </View>

            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    posts: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    screen: {
        backgroundColor: '#333436'
    }
})

export default OpenCourtScreen;