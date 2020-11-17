import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import logo from '../assets/text_logo.png'
import MultipleChoice from '../component/MultipleChoice'

export default class TriviaQuestion extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View
            style={styles.questionContainer}
        >
            <Text
                style={styles.question}
            >Who has the most championship rings?</Text>
            <Image
                style={styles.questionImg}
                source={logo}
            />
            <MultipleChoice/>
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
    questionContainer: {
        backgroundColor: 'transparent'
    },
    question:{
        color:"#E5B67A",
        fontSize: 25,
        textAlign: 'center'
    },
    questionImg:{
        width: "100%",
        height: "100%"
    }
})