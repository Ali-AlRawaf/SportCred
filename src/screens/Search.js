import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import bg from '../assets/bg.png'
import UserList from '../component/UserList'
import { searchUsers } from '../controller/search'
import arrow from '../assets/arrow_forward.png'

export default class Search extends React.Component {
    

    constructor(props){
        super(props)
    }

    state = {
        data: [],
        search: ''
    }

    searchUsername = async (key, text) => {
        const result = await searchUsers({ [key]: text })
        if (result.status === 200) {
            this.setState({
                data: result.result
            });
        }
        else {
            alert(result.status + ": no users found")
        }
    }

    handleSearch = (text) => {
        this.setState({ search: text });
        this.searchUsername("username", text);
    };

    render() {
        const {search} = this.state;
        return (
            <View
                style={styles.screenContainer}
            >
                <ImageBackground
                    style={styles.background}
                    source={bg}
                >
                    <View
                        style={styles.navContainer}
                    >
                        <View
                            style={styles.header}
                        >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack(null)}
                            >
                                <Image
                                    style={styles.arrow}
                                    source={arrow}
                                />
                            </TouchableOpacity>
                            <SearchBar
                                onChangeText={this.handleSearch }
                                style={styles.Bar}
                                round
                                autoCorrect={false}
                                clearButtonMode='while-editing'
                                placeholder='Search users'
                                value = {this.state.search}
                            />
                        </View>
                        <UserList
                            data={this.state.data}
                        />
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    screenContainer: {
        display: 'flex',
        height: '100%',
        width: '100%'
    },
    Bar: {
        paddingStart: 5,
        paddingVertical: 10,
        alignSelf: 'flex-end',
        paddingEnd: 30
    },
    navContainer: {
        flex: 1
    },
    header:{
        flexDirection: "row",
        backgroundColor: "#393e42",
        alignItems: 'center',
        paddingLeft: 5
    },
    arrow: {
        height: 25,
        width: 25,
        transform: [{
          rotate: '-180deg'
        }],
        tintColor: "white"
    }
})
