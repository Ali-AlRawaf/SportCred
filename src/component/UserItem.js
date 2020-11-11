import React from 'react';
import { connect } from "react-redux";

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import profileImage from '../assets/profile_img.jpg';


class UserItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (

            <TouchableOpacity
                style={styles.ItemView}
                onPress={() => this.props.handlePress(this.props.user.id)}
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
                        {this.props.user.username}
                    </Text>
                </View>
            </TouchableOpacity>

        )
    }
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
    TextView: {
        flexDirection: "column",
        paddingLeft: 10
    }
})


const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
};

export default connect(mapStateToProps, {})(UserItem);

