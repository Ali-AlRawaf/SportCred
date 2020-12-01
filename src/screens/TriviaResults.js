import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { finishTrivia } from '../controller/trivia';

import bg from '../assets/bg.png'
import user from '../models/user';
import { getUser } from '../controller/user';

export default class TriviaResults extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View
                style={styles.screenContainer}
            >
                <ImageBackground
                    style={styles.background}
                    source={bg}
                >
                    <Text
                        style={styles.text}
                    >You scored {this.props.route.params.score}/{this.props.route.params.total}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            if(!this.props.route.params.solo)
                                finishTrivia(this.props.route.params.sid, this.props.route.params.pid, this.props.route.params.total)
                            this.props.navigation.navigate("Container")
                        }}
                    >
                        <Text
                            style={styles.buttonText}
                        >Continue</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    screenContainer: {
        display: 'flex',
        height: '100%',
        width: '100%'
    },
    text:{
        color: "#EA8917",
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 5
    },
    button:{
        backgroundColor: "#EA8917",
        borderRadius: 10,
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center'
    },
    buttonText:{
        fontSize: 26,
        paddingVertical: 10,
        paddingHorizontal: 10,
        textAlign: 'center'
    }
})