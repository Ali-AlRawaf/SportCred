import React from 'react'
import { View, StyleSheet, Text, } from 'react-native'

export default class TriviaQuestion extends React.Component{
    constructor(props){
        super(props)
        
    }

    state = {
        question: this.props.question
    }

    render(){
        return(
            <View
            style={styles.questionContainer}
        >
            <Text
                style={styles.question}
            >{this.props.question}</Text>

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
        backgroundColor: 'transparent',
        height: '50%',
        justifyContent: 'flex-end'
    },
    question:{
        color:"#E5B67A",
        fontSize: 25,
        textAlign: 'center'
    }
})