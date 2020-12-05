import React, { useState, useCallback } from 'react';
import { View, ScrollView, Image, Button, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import profileImage from '../assets/profile_img.jpg';
import { useNavigation } from '@react-navigation/native';
import { getDebate } from '../controller/debate';
import { getTrivia } from '../controller/trivia';

const notifButton = (props) => {
    const navigation = useNavigation();
    if(props.type == "Info"){
        return(null)
    } else {
        return(
            <TouchableOpacity style={styles.button}
                onPress={() => {
                    if (props.type == "Trivia") {
                        getTrivia(props.link).then((resTrivia) => {
                            var done
                            resTrivia.trivia.players.forEach(p => {
                                if (p.userId == props.user) {
                                    if (p.done) done = true
                                }
                            })

                            if (done) {
                                alert("You have already completed this trivia!")
                            } else {
                                navigation.navigate("TriviaGauntlet", { questions: resTrivia.trivia.questions, sid: resTrivia.trivia._id, solo: false })
                            }
                        })
                    } else if (props.type == "Debate") {
                        getDebate(props.link).then((resDebate) => {
                            if (resDebate.debate.public) {
                                navigation.navigate('Debate', { id: props.link })
                            } else {
                                navigation.navigate('DebateChallengeOption', { id: props.link })
                            }
                        })
                    }
                }}
            >
                <Text style={styles.buttonText}>
                    Accept
                        </Text>
            </TouchableOpacity>
        )
    }
}

const Notification = (props) => {
    const navigation = useNavigation();
    const [textShown, setTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);
    const toggleNumberOfLines = () => {
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image style={styles.imgBox} source={profileImage} />
                <View style={styles.textBox}>
                    <Text style={styles.bodyText}
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 4}>
                        {props.notifBody}
                    </Text>
                    {
                        lengthMore ? <Text
                            onPress={toggleNumberOfLines}
                            style={styles.toggle}
                        >{textShown ? 'Read Less' : 'Read More'}</Text>
                            : null
                    }
                    {notifButton(props)}
                </View>
            </View>
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
        paddingTop: 20,
        alignContent: 'space-between',
        width: 280,
        justifyContent: 'flex-start',
        paddingLeft: 12
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

export default Notification;