import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {addTrivia, getTrivia} from '../controller/trivia'

function TriviaLandingScreen() {
    const navigation = useNavigation(); 
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate("TriviaGauntlet", {questions: createJSONQuestions(), solo: true }) }
                >
                    <Text style={styles.font}>Solo Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        alert("You will be redirected to your radar. Please tap the trivia button.");
                        navigation.navigate('RadarList');
                    }}
                >
                    <Text style={styles.font}>Head to Head</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


function createJSONQuestions(){
    return(
        [
            {
                question: "Who is PG of Brooklyn Nets?",
                answers: [
                    { isCorrect: false, optionNumber: 1, answerBody: "Kevin Durant" },
                    { isCorrect: true, optionNumber: 2, answerBody: "Kyrie Irving" },
                    { isCorrect: false, optionNumber: 3, answerBody: "Jamal Crawford" },
                    { isCorrect: false, optionNumber: 4, answerBody: "Caris LeVert" }
                ]
            },
            {
                question: "Who won MVP in the 2020 NBA Playoffs?",
                answers: [
                    { isCorrect: true, optionNumber: 1, answerBody: "LeBron James" },
                    { isCorrect: false, optionNumber: 2, answerBody: "Anthony Davis" },
                    { isCorrect: false, optionNumber: 3, answerBody: "Tyler Herro" },
                    { isCorrect: false, optionNumber: 4, answerBody: "Jimmy Butler" }
                ]
            },
            {
                question: "Which team had the highest PPG in the 2019-2020 NBA season?",
                answers: [
                    { isCorrect: false, optionNumber: 1, answerBody: "Mavericks" },
                    { isCorrect: false, optionNumber: 2, answerBody: "Clippers" },
                    { isCorrect: false, optionNumber: 3, answerBody: "Rockets" },
                    { isCorrect: true, optionNumber: 4, answerBody: "Bucks" }
                ]
            },
            {
                question: "Which of these players had the highest 3-point percentage in the 2019-2020 NBA season?",
                answers: [
                    { isCorrect: false, optionNumber: 1, answerBody: "Paul George" },
                    { isCorrect: false, optionNumber: 2, answerBody: "Jayson Tatum" },
                    { isCorrect: false, optionNumber: 3, answerBody: "Kyle Korver" },
                    { isCorrect: true, optionNumber: 4, answerBody: "JJ Redick" }
                ]
            },
            {
                question: "Who is the only player in NBA history to have scored 100 points in one game?",
                answers: [
                    { isCorrect: false, optionNumber: 1, answerBody: "Michael Jordan" },
                    { isCorrect: false, optionNumber: 2, answerBody: "Elgin Baylor" },
                    { isCorrect: false, optionNumber: 3, answerBody: "Kareem Abdul-Jabbar" },
                    { isCorrect: true, optionNumber: 4, answerBody: "Wilt Chamberlain" }
                ]
            }
        ]
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
    background: {
        flex: 1,
        backgroundColor: '#333436',

    },
    button: {
        width: 300,
        height: 75,
        backgroundColor: "#ff6347",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    font: {
        fontSize: 30
    }
})

export default TriviaLandingScreen;