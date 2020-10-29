import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const UserItem = ({user}) =>{
    return(
        <View
            style={styles.ItemView}
        > 
            <Image
                style={styles.ProfilePic}
                source={user.profilePic}
            />
            <View
                style={styles.TextView}
            >
                <Text
                    style={styles.userName}
                >
                {user.name}
                </Text>
                <Text
                    style={styles.userBio}
                >
                {user.bio}</Text>                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    userName: {
        fontSize: 16
    },
    userBio: {
        fontSize: 11,
        paddingTop: 5
    },
    ProfilePic: {
        borderRadius: 5,
        paddingLeft: 5
    },
    ItemView: {
        flexDirection: "row",
        width: width,
        height: height
    },
    TextView:{
        flexDirection: "column",
        paddingLeft: 10,
        justifyContent: 'center'
    }
})

export default UserItem;