import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PicksTopic from '../component/PicksTopic';
import profile_img from '../assets/profile_img.jpg';
import logo_png from '../assets/logo_png.png';
import StephenASmith from '../assets/StephenASmith.png';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import search_img from '../assets/search_18dp.png'
import { useNavigation } from '@react-navigation/native';

import {getPreseasonTopics} from '../controller/picks';

// const topics = [
//     {
//         topic: "MVP",
//         isAssigned: true,
//         pick: "Giannis Antetokounmpo",
//         id: "1"
//     },
//     {
//         topic: 'DPOY',
//         isAssigned: false,
//         pick: "",
//         id: "2"
//     },
//     {
//         topic: "ROTY",
//         isAssigned: true,
//         pick: "Ja Morant",
//         id: "3"
//     }
// ]

// const listItems = topics.map((d, idx) => <PicksTopic key={idx} topic={d.topic} isAssigned={d.isAssigned} pick={d.pick} id={d.id}></PicksTopic>);

class PreSeasonScreen extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            isLoading: true,
            topics: []
        }

        this.displayTopics = this.displayTopics.bind(this)
    }

    displayTopics = () => {
        const listItems = this.state.topics.map((d, idx) => <PicksTopic key={idx} topic={d.topic} isAssigned={true} pick={"placeholder"} id={d._id}></PicksTopic>);
        return listItems
    }

    componentDidMount = () => {
        getPreseasonTopics().then(res => {
            console.log(res);
            // const preseasonTopics = res.topics.map(topic => {
            //     return topic
            // })

            // console.log(preseasonTopics)
            this.setState({
                topics: res.topics,
                isLoading: false
            })
        }).catch(err => console.log(err))
    }

    render() {
        if (this.state.isLoading) return null
        return (
            <View style={styles.screen}>
                <View
                    style={styles.header}
                >
                </View>
                <ScrollView>
                    <View style={styles.topics}>
                        {this.displayTopics()}
                    </View>
    
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    topics: {
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

export default PreSeasonScreen;