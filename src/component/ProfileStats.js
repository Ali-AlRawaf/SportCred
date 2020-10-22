import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import ProfileCard from './ProfileCard'


const { width, heigth } = Dimensions.get('window')

const ProfileStats = ({ data }) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)

    if (data && data.length > 0) {
      return (
          <View>
              <FlatList data={data}
                  keyExtractor={(item, index) => 'key' + index}
                  horizontal
                  pagingEnabled
                  scrollEnabled
                  snapToAlignment="center"
                  scrollEventThrottle={15}
                  decelerationRate={"fast"}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                      return <ProfileCard item={item} />
                  }}

                  onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { x: scrollX } } }]
                  )}
              />

              <View style={styles.dotView}>
                  {data.map((_, i) => {
                      let opacity = position.interpolate({
                          inputRange: [i - 1, i, i + 1],
                          outputRange: [0.3, 1, 0.3],
                          extrapolate: 'clamp'
                      })
                      return (
                          <Animated.View
                              key={i}
                              style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                          />
                      )
                  })}

              </View>
          </View>
      )
    }

    return null;
}

const styles = StyleSheet.create({
    dotView: { 
      flexDirection: 'row',
      justifyContent: 'center'
    }
})

export default ProfileStats;