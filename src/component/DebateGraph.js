import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis } from "victory-native";

export default class DebateGraph extends React.Component {
  render() {
    return (
      <View style={styles.container}>
         	
	      <VictoryBar domainPadding={{ x: 100 }} 
	          style={{ data: { fill: "#fff" } , labels: {fill: 'white'} }}
	          alignment="middle" 
	          labels={({ datum }) => datum.player}
	          animate={{duration: 2000}} 
	          data={this.props.data} 
	          x="player" y="score" />

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