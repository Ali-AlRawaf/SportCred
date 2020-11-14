import React from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import DebateGraph from '../component/DebateGraph'
import bg from '../assets/bg.png'

const data = [
  { player: "Ibaka", score: 2 },
  { player: "VanVleet", score: 5 },
];

export default class DebateStanding extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
                source={bg}
                style={styles.background}
              >
          <View>
            <Text style={styles.topic}>{this.props.value}</Text>
          </View>
          <DebateGraph data={data}/>
        </ImageBackground>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {  
    width: "100%",
    height: "100%"
  },
  topic: {
    marginTop: 40,
    fontSize: 20
  }
});