import React, { useState, useCallback } from 'react';
import StephenASmith from '../assets/StephenASmith.png';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

const NewPost = (props) => {
    const [post, setPost] = useState("");

    const handlePost = (text) => {
        setPost(text);
    }

    const buttonPress = () => {
        //TODO
    }


    return (
        <View style={styles.container}>
            <Image style={styles.imgBox} source={StephenASmith}></Image>
            <View style={styles.textInput}>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    placeholder="What's on your mind?"
                    onChangeText={(text) => handlePost(text)}></TextInput>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => buttonPress}>
                <Text> ></Text>
            </TouchableOpacity>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: '#242526',

    },
    toggle: {
        color: "#3D929A",
        marginLeft: 10,
    },
    card: {
        backgroundColor: '#242526',
        width: 340,
        minHeight: 120,
        shadowColor: '#673939',
        shadowOpacity: .1,
        borderRadius: 1,
        shadowRadius: 13,
        flexDirection: 'row'
    },
    imgBox: {
        width: 40,
        height: 40,
        left: 10,
        top: 10,
        borderRadius: 25
    },
    input: {
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 7,
        alignContent: 'space-between',
        width: 270,
        justifyContent: 'flex-start',
        marginLeft: 12,
        backgroundColor: "white",
        minHeight: 30
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ffffff',
        paddingLeft: 10,
    },
    bodyText: {
        fontSize: 12,
        paddingLeft: 10,
        paddingTop: 10,
        color: '#ffffff'
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: '#3D929A',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        left: 10,
        position: 'relative',
        bottom: 0,
        marginTop: 5,
        borderRadius: 25,
        marginTop: 15

    },

    buttonText: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold'
    },

});

export default NewPost;