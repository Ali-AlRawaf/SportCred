import React from "react";
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, Image } from "react-native";
import DebateGraph from '../component/DebateGraph'
import bg from '../assets/bg.png'
import arrow from '../assets/arrow_forward.png'

const data = [
  { player: "Yes", score: 4 },
  { player: "No", score: 6 },
];

class DebateStanding extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      debate: "null",
      vote: "",
      isLoading: true
    }

    this.getVoteText = this.getVoteText.bind(this)
  }

  componentDidMount = () => {
    this.setState({
      debate: this.props.route.params.debate,
      vote: this.props.route.params.value,
      isLoading: false,
      options: this.props.route.params.options
    })

  }

  getVoteText = () => {
    let voteText = "You sided with "
    console.log(this.state.debate.options)
    if (this.state.vote < 50){
      voteText += this.state.options[0]
      
    }else{
      voteText += this.state.options[1]
    }

    voteText += " with a vote of " + this.state.vote
    return voteText
  }

  // TODO: Need a controller to pass in the options and their scores to the
  // DebateGraph

  render() {
    if (this.state.isLoading) return null;

    const debate = this.state.debate;
    return (
      <View style={styles.container}>
        <ImageBackground
                source={bg}
                style={styles.background}
              >
          <View style={styles.header}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Debates")}>

                  <Image
                      style={styles.arrow}
                      source={arrow}
                  />
              </TouchableOpacity>

          </View>
          <Text style={styles.topic}>{debate.topic}</Text>
          <View style={styles.graphContainer}>
            <DebateGraph data={data}/>
          </View>
          <View style={styles.uservoteContainer}>
            <Text style={styles.uservote}>{this.getVoteText()}</Text>
          </View>
        </ImageBackground>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  background: {  
    width: "100%",
    height: "100%"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 100
  },
  arrow: {
    height: 25,
    width: 25,
    marginLeft: 20,
    transform: [{
      rotate: '-180deg'
    }],
  },
  topic: {
    marginTop: 40,
    fontSize: 40,
    textAlign: 'center',
    color: '#fff'

  },

  graphContainer: {
    paddingTop: 30,
    flex: 1
  },

  uservoteContainer: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50
  },
  uservote: {
    fontSize: 30,
    textAlign: 'center',
    color: '#FF652F'
  }
});

export default DebateStanding;