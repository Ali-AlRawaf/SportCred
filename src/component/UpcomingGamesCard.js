import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {getCurrentPick} from '../controller/picks';

class UpcomingGamesCard extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            pick: "unassigned",
            isLoading: true
        }
    }

    componentDidMount = () => {
        const pick = getCurrentPick(this.props.userId, this.props.topic._id).then(res => {
            if(res.status === 200){
                this.setState({
                    pick: res.pick.pick,
                    isLoading: false
                })    
            }else{
                this.setState({
                    isLoading: false
                })    
            }
            
        }).catch(err => {
            console.log(err)
        })
        
    }

    render(){
        if (this.state.isLoading) return null;
        const topic = this.props.topic.topic;
            return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.card}
                onPress={() => this.props.navigation.navigate('PicksTeam', {
                    topic: this.props.topic
                })}>
                    <View style={styles.textBox}>
                        <Text style={styles.bodyText}>
                            {topic}
                        </Text>
                        <Text style={styles.pick}>
                            {this.state.pick}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        margin: 7
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
    textBox: {
        alignContent: 'space-between',
        width: 320,
        padding: 15
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ffffff',
        paddingLeft: 10,
    },
    bodyText: {
        fontSize: 18.5,
        paddingLeft: 10,
        paddingTop: 10,
        color: '#ffffff'
    },
    button: {
        width: 130,
        height: 30,
        backgroundColor: '#3D929A',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        left: 10,
        position: 'relative',
        bottom: 0,
        marginTop: 5

    },

    buttonText: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold'
    },

    pick: {
        fontSize: 15.5,
        fontWeight: 'bold',
        color: '#FF9233',
        paddingLeft: 10,
        paddingTop: 20,
        writingDirection: 'rtl'
    }
});


export default UpcomingGamesCard;