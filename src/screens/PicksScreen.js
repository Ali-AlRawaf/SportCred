import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Season from '../component/Season';
import profile_img from '../assets/profile_img.jpg';
import logo_png from '../assets/logo_png.png';
import StephenASmith from '../assets/StephenASmith.png';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import search_img from '../assets/search_18dp.png'
import { useNavigation } from '@react-navigation/native';

const seasons = [
    {
        season: "Pre-Season", id: "1"
    },
    {
        season: 'Regular Season', id: "2"
    },
    {
        season: "Playoffs", id: "3"
    }
]

const listItems = seasons.map((d, idx) => <Season key={idx} season={d.season} id={d.id}></Season>);

class PicksScreen extends React.Component {

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.screen}>
                <View
                    style={styles.header}
                >
                </View>
                <ScrollView>
                    <View style={styles.seasons}>
                        {listItems}
                    </View>
    
                </ScrollView>
            </View >
        );
    }
    
}

const styles = StyleSheet.create({
    seasons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    screen: {
        backgroundColor: '#333436',
        height: 900
    },
    header: {
        justifyContent: "flex-end",
        marginRight: 10,
        marginTop: 10
    }
})

export default PicksScreen;