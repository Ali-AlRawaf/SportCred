import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, FlatList } from 'react-native'
import UserItem from './UserItem'
const { width, height } = Dimensions.get('window')

const UserList = ({ data }) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => 'key' + index}
                pagingEnabled
                scrollEnabled
                scrollEventThrottle={15}
                decelerationRate={"fast"}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <UserItem item={item} />
                }}

                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }]
                )}
            />
        </View>
    )
}

export default UserList;