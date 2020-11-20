import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis } from "./Victory";
import {getOptionVotes} from '../controller/debate.js'

const data = [
  { player: "Yes", score: 4 },
  { player: "No", score: 6 },
];

export default class DebateGraph extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options: [],
      isLoading: true,
      optionToVotes: []
    }

  }

  componentDidMount = () => {
    console.log('in dg')
    
    this.setState({
      options: this.props.options,
      optionToVotes: this.props.optionToVotes,
      isLoading: false
    })

  }

  render() {
    if (this.state.isLoading) return null
    return (
      <View style={styles.container}>
         	
	      <VictoryBar domainPadding={{ x: 100 }} 
            style={{ data: { fill: "#fff" } , labels: {fill: 'white'} }}
            alignment="middle"
            data={this.props.optionToVotes}
            labels={({ datum }) => datum.option}
            animate={{duration: 2000}}
            x="option" y="vote" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});