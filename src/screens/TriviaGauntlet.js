import * as React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import Question from '../component/TriviaQuestion'
import MultipleChoice from '../component/MultipleChoice'
import bg from '../assets/bg.png'

export default class TriviaGauntlet extends React.Component {
    constructor(props){
        super(props)
        this.onChoice = this.onChoice.bind(this)
    }
    state = {
        currentQuestion: "",
        answer:{"a": "", "b": "", "c": "", "d": ""},
        index: 0,
        interval: null
    }

    componentDidMount(){
        this.startInterval(0)
    }

    startInterval(index){
        this.setState({
            currentQuestion: this.props.route.params.questions[index].question,
            answer: this.props.route.params.questions[index].answer,
        })
        const interval = setInterval(()=>{
            index += 1
            if (index >= (this.props.route.params.questions.length - 1)){
                clearInterval(this.state.interval)
                this.props.navigation.navigate("TriviaResults")
            }
            else{
                this.setState({
                    currentQuestion: this.props.route.params.questions[index].question,
                    answer: this.props.route.params.questions[index].answer,
                    index: index
                })
            }
        }, 14000)
        this.setState({
            interval: interval
        })
    }

    onChoice(){
        clearInterval(this.state.interval)

        var temp = this.state.index + 1
        this.setState({
            index: temp
        })
        if (temp === this.props.route.params.questions.length){
            this.props.navigation.navigate("TriviaResults")
        }
        else{
            this.startInterval(temp)        
        }
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
                    <Question
                        question={this.state.currentQuestion}
                    />
                    <MultipleChoice
                        answer={this.state.answer}
                        answerHandler={this.onChoice}
                    />
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
    }
})