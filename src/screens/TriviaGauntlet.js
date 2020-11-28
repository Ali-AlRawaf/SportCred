import * as React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import Question from '../component/TriviaQuestion'
import MultipleChoice from '../component/MultipleChoice'
import bg from '../assets/bg.png'

export default class TriviaGauntlet extends React.Component {
    constructor(props){
        super(props)
        console.log(JSON.stringify(props))
    }

    state = {
        currentQuestion: {"question": "", "answer": {"a": "bruh", "b": "", "c": "", "d": ""} },
        answer: {"question": "", "answer": {"a": "bruh", "b": "", "c": "", "d": ""} }
    }

    componentDidMount(){
        this.startInterval(0)
        console.log("ayooo"+JSON.stringify(this.props.route.params.questions))
    }

    startInterval(index){
        var interval = setInterval(()=>{
            if (index === this.props.route.params.questions.length){
                clearInterval(interval)
                this.props.navigation.navigate("Search")
            }
            index += 1
            this.setState({
                currentQuestion: this.props.route.params.questions[index],
                answer: this.props.route.params.questions[index]
            })
        }, 14000)       
    }

    render(){
        const {data} = this.state;
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