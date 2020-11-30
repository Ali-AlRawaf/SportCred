import * as React from 'react';
import { connect } from "react-redux";
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import UpcomingGamesCard from '../component/UpcomingGamesCard';
import profile_img from '../assets/profile_img.jpg';
import logo_png from '../assets/logo_png.png';
import StephenASmith from '../assets/StephenASmith.png';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import search_img from '../assets/search_18dp.png'
import { useNavigation } from '@react-navigation/native';

import {getRegularSeasonTopics} from '../controller/picks'

// const topics = [
//     {
//         topic: "Toronto Raptors vs Miami Heat",
//         isAssigned: true,
//         pick: "Toronto Raptors",
//         _id: "1"
//     },
//     {
//         topic: 'Los Angeles Lakers vs Los Angeles Clippers',
//         isAssigned: false,
//         pick: "",
//         _id: "2"
//     },
//     {
//         topic: "Washington Wizards vs New York Knicks",
//         isAssigned: true,
//         pick: "New York Knicks",
//         _id: "3"
//     }
// ]



class RegularSeasonScreen extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            topics: [],
            isLoading: true
        }
    }

    componentDidMount = () => {
        getRegularSeasonTopics().then(res => {
            this.setState({
                topics: res.topics,
                isLoading: false
            })
        }).catch(err => console.log(err))
    }

    render() {
        if (this.state.isLoading) return null;

        const listItems = this.state.topics.map((d, idx) => <UpcomingGamesCard key={idx} topic={d} userId={this.props.currentUser} navigation={this.props.navigation}></UpcomingGamesCard>);

        return (
            <View style={styles.screen}>
                <View
                    style={styles.header}
                >
                </View>
                <ScrollView>
                    <View style={styles.topics}>
                        {listItems}
                    </View>
                </ScrollView>
            </View>
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

// export default RegularSeasonScreen;

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
};

export default connect(mapStateToProps, { })(RegularSeasonScreen);