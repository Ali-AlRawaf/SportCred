import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Debate = (props) => {
    const navigation = useNavigation();
    const [textShown, setTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);
    const toggleNumberOfLines = () => {
        setTextShown(!textShown);
        console.log(props)
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card}
            onPress={() => navigation.navigate('Debate', {
                id: props.id
            })}>
                <View style={styles.textBox}>
                    <Text style={styles.bodyText}
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 4}>
                        {props.topic}
                    </Text>
                    {
                        lengthMore ? <Text
                            onPress={toggleNumberOfLines}
                            style={styles.toggle}
                        >{textShown ? 'Read Less' : 'Read More'}</Text>
                            : null
                    }
                </View>
            </TouchableOpacity>
        </View>
    );
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
        fontSize: 17,
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
});


export default Debate;