import * as React from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
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
        interval: null,
        clock: 14,
        clockInterval: null
    }

    componentDidMount(){
        this.startInterval(0)
    }

    startInterval(index){
        this.setState({
            currentQuestion: this.props.route.params.questions[index].question,
            answer: this.props.route.params.questions[index].answer,
        })
        this.restartClock()
        const interval = setInterval(()=>{
            index += 1
            this.stopClock()
            if (index > (this.props.route.params.questions.length - 1)){
                clearInterval(this.state.interval)
                this.props.navigation.navigate("TriviaResults")
            }
            else{
                this.setState({
                    currentQuestion: this.props.route.params.questions[index].question,
                    answer: this.props.route.params.questions[index].answer,
                    index: index
                })
                this.restartClock()
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
        this.stopClock()
        if (temp === this.props.route.params.questions.length){
            this.props.navigation.navigate("TriviaResults")
            
        }
        else{
            this.startInterval(temp)        
        }
    }

    restartClock(){
        this.setState({
            clock: 14,
            clockInterval: setInterval(()=>{
                this.setState({
                    clock: this.state.clock - 1
                })
            }, 1000)
        })
    }

    stopClock(){
        clearInterval(this.state.clockInterval)
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
                    <View
                        style={styles.qaContainer}
                    >
                        <Question
                            question={this.state.currentQuestion}
                        />

                        <View
                            style={styles.answer}
                        >
                            <MultipleChoice
                                answer={this.state.answer}
                                answerHandler={this.onChoice}
                            />
                        </View>

                    </View>

                    <View
                        style={styles.timerContainer}
                    >
                        <View
                            style={styles.circleBorder}
                        >
                            <Text
                                style={styles.timer}
                            >{this.state.clock}</Text>
                        </View>
                    </View>
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
    timer:{
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignSelf: 'center',
        fontSize: 25,
        
    },
    timerContainer:{
        flex: 1,
        justifyContent: 'center'
    },
    qaContainer:{
        flex: 2,
        justifyContent: 'center'
    },
    answer:{
        marginTop: 50
    },
    circleBorder:{
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 5,
        alignSelf: 'center'  ,
        width: '20%',
        height: '27%',
        justifyContent: 'center'     
    }
})