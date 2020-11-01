import React from 'react'
import { View, Dimensions, FlatList } from 'react-native'
import UserItem from './UserItem'
const { width, height } = Dimensions.get('window')

const UserList = ({ data }) => {

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
                    return <UserItem user={item} />
                }}
            />
        </View>
    )
}

export default UserList;