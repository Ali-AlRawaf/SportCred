import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import profileImage from '../assets/profile_img.jpg';

const UserItem = ({user}) =>{
    return(
        <View
            style={styles.ItemView}
        > 
            <Image
                style={styles.ProfilePic}
                source={profileImage}
            />
            <View
                style={styles.TextView}
            >
                <Text
                    style={styles.userName}
                >
                    {user.username}
                </Text>          
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    userName: {
        fontSize: 16,
        color: "white",
        alignSelf: "center",
        paddingTop: 7
    },
    ProfilePic: {
        height: 40,
        width: 40,
        borderRadius: 30,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.8 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        paddingLeft: 5
    },
    ItemView: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingLeft: 10
    },
    TextView:{
        flexDirection: "column",
        paddingLeft: 10
    }
})

export default UserItem;