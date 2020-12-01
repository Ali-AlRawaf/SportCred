import * as React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { connect } from "react-redux";
import Question from '../component/TriviaQuestion'
import MultipleChoice from '../component/MultipleChoice'
import bg from '../assets/bg.png'
import { incrementScore } from '../controller/trivia';

class TriviaGauntlet extends React.Component {
    constructor(props){
        super(props)
        this.onChoice = this.onChoice.bind(this)
    }
    state = {
        isLoading: true,
        currentQuestion: "",
        answers:[],
        index: 0,
        interval: null,
        score: 0
    }

    componentDidMount(){
        this.setState({isLoading: false})
        this.startInterval(0)
    }

    startInterval(index){
        this.setState({
            currentQuestion: this.props.route.params.questions[index].question,
            answers: this.props.route.params.questions[index].answers,
        })
        const interval = setInterval(()=>{
            index += 1
            if (index >= (this.props.route.params.questions.length - 1)){
                clearInterval(this.state.interval)
                this.props.navigation.navigate("TriviaResults", {
                    score: this.state.score, 
                    total: this.props.route.params.questions.length,
                    sid: this.props.route.params.sid,
                    pid: this.props.currentUser
                })
            }
            else{
                this.setState({
                    currentQuestion: this.props.route.params.questions[index].question,
                    answers: this.props.route.params.questions[index].answers,
                    index: index
                })
            }
        }, 14000)
        this.setState({
            interval: interval
        })
    }

    async onChoice(isCorrect){
        clearInterval(this.state.interval)

        if(isCorrect){
            await this.setState({
                score: this.state.score + 1
            })
            incrementScore(this.props.route.params.sid, this.props.currentUser).then(res => {
                if(res.status != 200)
                    alert(res.status + ': ' + res.text)
                else
                    alert(res.text)
            })
        } else {
            alert("Incorrect!")
        }

        var temp = this.state.index + 1
        this.setState({
            index: temp
        })
        if (temp === this.props.route.params.questions.length){
            this.props.navigation.navigate("TriviaResults", {
                score: this.state.score, 
                total: this.props.route.params.questions.length,
                sid: this.props.route.params.sid,
                pid: this.props.currentUser
            })
        }
        else{
            this.startInterval(temp)        
        }
    }


    render(){
        if(this.state.isLoading) return null

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
                        answer={this.state.answers}
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

const mapStateToProps = (state) => {
	return {
	  currentUser: state.auth.currentUser,
	};
  };
  
export default connect(mapStateToProps)(TriviaGauntlet);