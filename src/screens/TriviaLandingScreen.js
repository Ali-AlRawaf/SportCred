import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function TriviaLandingScreen() {
    const navigation = useNavigation(); 
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('TriviaGauntlet', createJSONQuestions())}
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
        {
            "questions": [
                {"question": "What year was the NBA created?", "answer": {"a": "1949", "b": "1952", "c": "1920", "d": "1961"} },
                {"question": "Who scored the most points in a single NBA game?", "answer": {"a": "Kobe Bryant", "b": "Wilt Chamberlain", "c": "James Harden", "d": "Michael Jordan"}},
                {"question": "Who was the NBA’s first ever MVP in 1956?", "answer": {"a": "George Mikan", "b": "Bill Sharman", "c": "Bob Pettit", "d": "Larry Foust"}}
            ]
        }
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