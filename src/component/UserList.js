import React from 'react'
import { View, Dimensions, FlatList, StyleSheet, Text } from 'react-native'
import UserItem from './UserItem'
const { width, height } = Dimensions.get('window')

const UserList = ({ data, handlePress }) => {


    const ItemSeparator = () =>{
        return(
            <View
                style={styles.Separator}
            />
        )
    }

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => 'key' + index}
                pagingEnabled
                scrollEnabled
                scrollEventThrottle={15}
                decelerationRate={"fast"}
                ItemSeparatorComponent={ItemSeparator}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => {return (<View/>)}}
                renderItem={({ item }) => {
                    return <UserItem 
                    user={item}
                    handlePress={handlePress}
                    />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Separator: {         
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
    }
})


export default UserList;