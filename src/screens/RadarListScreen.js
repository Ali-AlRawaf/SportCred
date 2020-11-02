import React from 'react';
import { connect } from "react-redux";
import { View, ScrollView, StyleSheet, Text, Image, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import bg from '../assets/bg.png'
import RadarItem from '../component/RadarItem'
import profileImage from '../assets/profile_img.jpg';
import arrow from '../assets/arrow_forward.png'

const data = [
  {
    id: 1,
    profileImg: profileImage,
    username: 'Ryan brown',
    acs_score: '200'
  },
  {
    id: 2,
    profileImg: profileImage,
    username: 'Sam Apple',
    acs_score: '660'
  },
  {
    id: 3,
    profileImg: profileImage,
    username: 'Example User',
    acs_score: '400'
  },
  {
    id: 4,
    profileImg: profileImage,
    username: 'John Pickle',
    acs_score: '550'
  },
  {
    id: 5,
    profileImg: profileImage,
    username: 'Soloman Het',
    acs_score: '910'
  },
  {
    id: 6,
    profileImg: profileImage,
    username: 'Soloman Het',
    acs_score: '910'
  },
  {
    id: 7,
    profileImg: profileImage,
    username: 'Soloman Het',
    acs_score: '910'
  },
  {
    id: 8,
    profileImg: profileImage,
    username: 'Soloman Het',
    acs_score: '910'
  },
]

class RadarListScreen extends React.Component {

  constructor(props){
    super(props);
  }

  render(){

    return(
      <ImageBackground
          source={bg}
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
        <FlatList data={data}
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
    minHeight: '100vh'
  },

  radarItem: {
    margin: 3,
  },

  button: {
    marginTop: 20,
    marginLeft: 20,
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