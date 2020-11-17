import React, { useState } from 'react';
import { connect } from "react-redux";
import { View, ScrollView, StyleSheet, Text, Image, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import bg from '../assets/bg.png'
import RadarItem from '../component/RadarItem'
import profileImage from '../assets/profile_img.jpg';
import arrow from '../assets/arrow_forward.png'
import { getFollowers } from '../controller/radarlist'

class RadarListScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
    this.getRadarList = this.getRadarList.bind(this);
  }

  componentDidMount = () => {
      this.getRadarList().then(res => {
        this.setState({
          data: res.followers,
          isLoading: false
        })
      });

  }

  getRadarList = async () => {
    const data = await getFollowers({'user': '5fa03dbd26f5b1307cd8c610'});
    
    for (let i in data.followers) {
      data.followers[i].profileImg = profileImage;
    }
    return data
  }

  render(){
    if (this.state.isLoading) return null;
    return(
      <ImageBackground
          source={bg}
          style={styles.background}
      >
      <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => this.props.navigation.goBack(null)}
      >
        <Image
            style={styles.arrow}
            source={arrow}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList data={this.state.data}
            keyExtractor={(item, index) => 'key' + index}
            vertical
            pagingEnabled
            scrollEnabled
            numColumns={2}
            snapToAlignment="center"
            scrollEventThrottle={15}
            decelerationRate={"fast"}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                return <RadarItem item={item} />
            }}
        />
      </ScrollView>
      </ImageBackground>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: '100%'
  },

  radarItem: {
    margin: 3,
  },

  button: {
    marginTop: 80,
    marginLeft: 20,
  },

  background: {
    flex: 1,
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },

  arrow: {
    height: 25,
    width: 25,
    transform: [{
      rotate: '-180deg'
    }],
  },
})

export default RadarListScreen;