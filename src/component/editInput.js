import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const editInput = props => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput secureTextEntry={props.isPassword} value={props.value} style={{ color: "white" }} onChangeText={(text) => props.onChangeText(text)} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "90%",
        height: "30%",
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    container: {
        width: "100%",
        height: "15%",
        backgroundColor: "#24231f",
        justifyContent: "space-between",
        padding: 10
    },
    title: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold"
    },
    titleContainer: {
        width: "100%",
        justifyContent: "center",
        marginVertical: 15,
        marginLeft: 10
    }
})

export default editInput;