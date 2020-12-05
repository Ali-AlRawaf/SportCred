import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


export default class MultipleChoice extends React.Component{
    constructor(props){
        super(props)

    }



    state = {
        answer: this.props.answer
    }
    render(){
        return(
            <View>
                <View
                    style={styles.answerContainer}
                >
                    <TouchableOpacity
                        style={styles.answerButton}
                        onPress={() => this.props.answerHandler(this.props.answer[0].isCorrect)}
                    >
                        <Text
                            style={styles.answerText}    
                        >{this.props.answer[0].answerBody}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.answerButton}
                        onPress={() => this.props.answerHandler(this.props.answer[1].isCorrect)}
                    >
                        <Text
                            style={styles.answerText}                   
                        >{this.props.answer[1].answerBody}</Text>                    
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.answerContainer}
                >
                    <TouchableOpacity
                        style={styles.answerButton}
                        onPress={() => this.props.answerHandler(this.props.answer[2].isCorrect)}
                    >
                        <Text
                            style={styles.answerText}                    
                        >{this.props.answer[2].answerBody}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.answerButton}
                        onPress={() => this.props.answerHandler(this.props.answer[3].isCorrect)}
                    >
                        <Text
                            style={styles.answerText}                    
                        >{this.props.answer[3].answerBody}</Text>                        
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
