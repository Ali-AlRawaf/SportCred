import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Post from '../component/Post';
import profile_img from '../assets/profile_img.jpg';
import logo_png from '../assets/logo_png.png';
import StephenASmith from '../assets/StephenASmith.png';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import search_img from '../assets/search_18dp.png'
import { useNavigation } from '@react-navigation/native';
import NewPost from '../component/NewPost';
import { getAllPosts } from '../controller/post';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabNavigator from '../navigation/TabNavigator';

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

    var actualPosts;

    // const actualPosts = getAllPosts();
    getAllPosts().then(resp => {
        actualPosts = resp.postsArray;
        console.log(actualPosts);
    }).catch(e => {
        console.log(e)
    })



    const navigation = useNavigation();

    const listItems = userPosts.map((d, idx) => <Post key={idx} name={d.name} profilePic={d.profilePic} post={d.post}></Post>);

    return (
        <View style={styles.screen}>
            <NewPost />
            <View
                style={styles.header}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Search')}
                >
                    <Image
                        style={styles.search_img}
                        source={search_img}
                    />

                </TouchableOpacity>

            </View>
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
        backgroundColor: '#333436',
        height: 900
    },
    search_img: {
        height: 20,
        width: 20,
        alignSelf: 'flex-end',
        tintColor: 'white'
    },
    header: {
        justifyContent: "flex-end",
        marginRight: 10,
        marginTop: 10
    }
})

export default OpenCourtScreen;