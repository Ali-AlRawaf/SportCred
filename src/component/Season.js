import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Season = (props) => {
    const navigation = useNavigation();

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
            onPress={() => {
                if (props.id === "1") {
                    navigation.navigate('Comment', {
                        id: props.id
                    })
                } else if (props.id === "2") {
                    navigation.navigate('Comment', {
                        id: props.id
                    }) 
                } else {
                    navigation.navigate('Comment', {
                        id: props.id
                    })
                }
                }}>
                
                    <Text style={styles.buttonText}>
                        
                        {props.season}
                    </Text>
                
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 30
    },
    toggle: {
        color: "#3D929A",
        marginLeft: 10,
    },
    card: {
        backgroundColor: '#242526',
        width: 300,
        height: 100,
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
        fontSize: 17,
        paddingLeft: 10,
        paddingTop: 10,
        color: '#ffffff'
    },
    button: {
        width: 200,
        height: 70,
        backgroundColor: '#242526',
        borderRadius: 25,
        shadowColor: '#673939',
        shadowOpacity: .1,
        shadowRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        
        position: 'relative',
        bottom: 0,
        marginTop: 5

    },

    buttonText: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold'
    },
});


export default Season;