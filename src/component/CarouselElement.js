import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const CarouselItem = ({ item }) => {
    return (
        <View style={styles.cardView}>
            <View style={styles.textView}>
                <Text style={styles.itemTitle}> {item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 40,
        height: height / 2,
        backgroundColor: '#ff652f',
        margin: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
      position: 'absolute',
      height: '100%',
      width: '100%',
    },

    itemTitle: {
      color: 'white',
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 20,
      fontSize: 35,
      fontWeight: "bold",
      elevation: 5
    },

    itemDescription: {
      color: 'white',
      textAlign: 'center',
      fontSize: 22,
      elevation: 5
    }
})

export default CarouselItem