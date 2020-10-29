import React from 'react'
import { View, StyleSheet, TextInput, Dimensions, SearchBar } from 'react-native'


const SearchBar = ({data}) =>{
    return(
        <View
            style = {styles.Container}
        >
            <SearchBar
                style = {styles.Bar}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Bar: {
        clearButtonMode: 'while-editing',
        placeholder: 'Search for users',
        paddingStart: 5,
        paddingVertical: 10,
        width: '80%'
    },
    Container: {
        justifyContent: 'center',

    }
})

export default SearchBar