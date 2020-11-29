import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function TriviaLandingScreen() {
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.font}>Solo Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.font}>Head to Head</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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