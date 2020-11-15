import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Debate from '../component/Debate';
import profile_img from '../assets/profile_img.jpg';
import logo_png from '../assets/logo_png.png';
import StephenASmith from '../assets/StephenASmith.png';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import search_img from '../assets/search_18dp.png'
import { useNavigation } from '@react-navigation/native';

const debates = [
    {
        _id: "1",
        description: "Who's A Better Guard: Kyrie Irving, Damian Lillard, or Stephen Curry?"
    },
    {
        _id: "2",
        description: 'Who is more important to the Lakers: LeBron James or Anthony Davis?'
    },
    {
        _id: "3",
        description: "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?" +
            "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?" +
            "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?" +
            "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?" +
            "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?" +
            "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?",
    },
    {
        _id: "4",
        description: "Who will be on the front cover of NBA 2K22?"
    },
    {
        _id: "5",
        description: "Who is more important to the Lakers: LeBron James or Anthony Davis?"
    },
    {
        _id: "6",
        description: "Who's A Better Guard: Kyrie Irving, Damian Lillard, or Stephen Curry?"
    },
    {
        _id: "7",
        description: "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?" +
        "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?" +
        "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?" +
        "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?" +
        "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?" +
        "Is Tyler Herro an upcoming all star? Is Tyler Herro an upcoming all star?"
    },
    {
        _id: "8",
        description: "Who will be on the front cover of NBA 2K22?"
    },
    {
        _id: "9",
        description: "Who is more important to the Lakers: LeBron James or Anthony Davis?"
    }
]

function DebatesScreen() {
    const navigation = useNavigation();

    const listItems = debates.map((d, idx) => <Debate key={idx} description={d.description}></Debate>);

    return (
        <View style={styles.screen}>
            <View
                style={styles.header}
            >
            </View>
            <ScrollView>
                <View style={styles.debates}>
                    {listItems}
                </View>

            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    debates: {
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

export default DebatesScreen;