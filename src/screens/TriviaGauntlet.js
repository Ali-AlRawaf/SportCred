import * as React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import Question from '../component/TriviaQuestion'
import MultipleChoice from '../component/MultipleChoice'
import bg from '../assets/bg.png'

export default class TriviaGauntlet extends React.Component {
    constructor(props){
        super(props)
        this.interval = null
        this.onChoice = this.onChoice.bind(this)
    }
    state = {
        currentQuestion: "",
        answer:{"a": "", "b": "", "c": "", "d": ""},
        index: 0
    }

    componentDidMount(){
        this.startInterval()
    }

    startInterval(){
        this.setState({
            currentQuestion: this.props.route.params.questions[this.state.index].question,
            answer: this.props.route.params.questions[this.state.index].answer
        })
        this.interval = setInterval(()=>{
            if (this.state.index === this.props.route.params.questions.length){
                clearInterval(this.interval)
                this.props.navigation.navigate("Search")
            }
            this.setState({
                currentQuestion: this.props.route.params.questions[this.state.index].question,
                answer: this.props.route.params.questions[this.state.index].answer,
                index: this.state.index + 1
            })
        }, 14000)       
    }

    onChoice(){
        clearInterval(this.interval)
        if (this.state.index === this.props.route.params.questions.length){
            this.props.navigation.navigate("Search")
        }
        this.setState({
            index: this.state.index + 1
        })
        this.startInterval()
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