import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


export default class MultipleChoice extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            answer: this.props.answer
        }
        console.log("THIS IS PROPS" + JSON.stringify(this.props))
    }

    render(){
        return(
            <View>
                <View
                    style={styles.answerContainer}
                >
                    <TouchableOpacity
                        style={styles.answerButton}
                    >
                        <Text
                            style={styles.answerText}    
        >{this.state.answer.a}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.answerButton}
                    >
                        <Text
                            style={styles.answerText}                   
                        >{this.state.answer.b}</Text>                    
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.answerContainer}
                >
                    <TouchableOpacity
                        style={styles.answerButton}
                    >
                        <Text
                            style={styles.answerText}                    
                        >{this.state.answer.c}</Text>                        
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.answerButton}
                    >
                        <Text
                            style={styles.answerText}                    
                        >{this.state.answer.d}</Text>                        
                    </TouchableOpacity>

                </View>  
            </View>
      
        )
    }
}

const styles = StyleSheet.create({
    answerText: {
        backgroundColor: "#EA8917",
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 20
    },
    answerContainer:{
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    answerButton: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        flex: 1,
        justifyContent: 'center'
    }
})
