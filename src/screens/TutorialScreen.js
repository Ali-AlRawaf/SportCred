import React from 'react';
import { View, Button, StyleSheet, TextInput, Text, Image, TouchableOpacity } from 'react-native';

import logo from '../assets/text_logo.png';
import arrow from '../assets/arrow_forward.png'

export default class TutorialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorialTitle: ["Here's some stuff you should know before you get started",
        "What is SportCred?", "What is ACS?"],

      tutorialDescription: ["",
        "We’re a one-stop shop to satisfy all your sporting urges! We use an ACS system to rank" +
        " users based on their sporting knowledge. Gain points by engaging in debates with your" +
        " fellow users, making picks and predictions about NBA games and playing trivia! We’ve " +
        "got it all and we can’t wait for you to check it out!",
        "ACS stands for Analytical Credibility Score which is our way of ranking users" +
        "and dividing them into categories from inexperienced to experts. ACS is divided into 4 categories" +
        "- Fanalyst, Analyst, Pro Analyst and Expert Analyst. Engage in debates," +
        "trivia and picks and predictions to improve your score!"],

      currentPage: 0
    }

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.isOnFinal = this.isOnFinal.bind(this);
    this.isOnFirst = this.isOnFirst.bind(this);
  }

  isOnFinal() {
    if (this.state.currentPage === this.state.tutorialTitle.length - 1) {
      return <TouchableOpacity
        style={styles.ready}
        activeOpacity={0.7}
        onPress={() => this.props.navigation.navigate('Container')}>
        <Image
          style={styles.arrowFront}
          source={arrow}
        />
      </TouchableOpacity>
    } else {
      return <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.7}
        onPress={this.nextPage}>
        <Image
          style={styles.arrowFront}
          source={arrow}
        />
      </TouchableOpacity>
    }
  }

  isOnFirst() {
    if (this.state.currentPage != 0) {
      return <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.7}
        onPress={this.previousPage}>
        <Image
          style={styles.arrowBack}
          source={arrow}
        />
      </TouchableOpacity>
    }
  }

  nextPage() {
    if (this.state.currentPage < this.state.tutorialTitle.length - 1) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  }

  previousPage() {
    if (this.state.currentPage > 0) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={logo}
        />
        <View style={styles.textField}>
          <Text style={styles.title}>
            {this.state.tutorialTitle[this.state.currentPage]}
          </Text>
        </View>

        <View style={styles.textField}>
          <Text style={styles.textField}>
            {this.state.tutorialDescription[this.state.currentPage]}
          </Text>
        </View>
        <View style={styles.navButtonContainer}>
          {this.isOnFirst()}
          {this.isOnFinal()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222629',
    textAlign: 'center'
  },
  title: {
    color: '#E5E5E5',
    backgroundColor: '#222629',
    padding: 10,
    fontSize: 32,
  },
  textField: {
    color: '#E5E5E5',
    backgroundColor: '#222629',
    padding: 10,
    fontSize: 20,
  },
  fontColor: {
    color: 'wheat'
  },
  headline: {
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    backgroundColor: 'yellow',
  },
  logo: {
    height: 100,
    marginTop: 80,
    width: '100%',
  },
  navButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  buttonContainer: {
    backgroundColor: '#ff652f',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: "black",
    alignSelf: "center",
  },
  backButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  arrowBack: {
    height: 25,
    width: 25,
    transform: [{
      rotate: '-180deg'
    }],
  },
  arrowFront: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 25,
    width: 25,
  },
  ready: {
    backgroundColor: '#53900F',
    width: 50,
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin: 20,
    borderRadius: 50,
  }
});
