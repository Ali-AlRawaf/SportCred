import React, { useState, useCallback } from 'react';
import profile_img from '../assets/profile_img.jpg';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StephenASmith from '../assets/StephenASmith.png';


const Comment = (props) => {
    console.log(props)
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
            <View style={styles.card}>
                <Image style={styles.imgBox} source={StephenASmith} />
                <View style={styles.textBox}>
                    <Text style={styles.headerText}>
                        {props.userName}
                    </Text>
                    <Text style={styles.bodyText}
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 4}>
                        {props.comment}
                    </Text>
                    {
                        lengthMore ? <Text
                            onPress={toggleNumberOfLines}
                            style={styles.toggle}
                        >{textShown ? 'Read Less' : 'Read More'}</Text>
                            : null
                    }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    toggle: {
        color: "#3D929A",
        marginLeft: 10,
    },
    card: {
        backgroundColor: '#242526',
        minHeight: 120,
        shadowColor: '#673939',
        shadowOpacity: .1,
        borderRadius: 1,
        shadowRadius: 13,
        flexDirection: 'row',
        paddingLeft: 20

    },
    imgBox: {
        width: 40,
        height: 40,
        left: 10,
        top: 10,
        borderRadius: 25
    },
    textBox: {
        marginTop: 10,
        paddingTop: 10,
        marginLeft: 20,
        alignContent: 'space-between',
        width: 270,
        minHeight: 100,
        justifyContent: 'flex-start',
        paddingLeft: 12,
        backgroundColor: '#383838',
        borderRadius: 10,
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


export default Comment;