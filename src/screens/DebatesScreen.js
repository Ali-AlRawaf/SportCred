import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Debate from '../component/Debate';
import profile_img from '../assets/profile_img.jpg';
import logo_png from '../assets/logo_png.png';
import StephenASmith from '../assets/StephenASmith.png';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import search_img from '../assets/search_18dp.png'
import { useNavigation } from '@react-navigation/native';
import { getAllDebates } from '../controller/debate';
import { connect } from "react-redux";

class DebatesScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: "TOPIC",
            creation: Date.now
        }
    }

    componentDidMount() {
        this.realDebates().then((resp) => {
            this.setState({ debates: resp, isLoading: false })
        }).then(() => {
            this.setState({
                renderDebates: this.state.debates.map((d, idx) => <Debate key={idx} topic={d.topic} creation={d.createdAt} _id={d._id}></Debate>)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    realDebates = async () => {
        const result = await getAllDebates();
        if (result.status === 200) {
            // return result.allDebates.reverse();
            return result.allDebates.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        } else {
            alert("Something went wrong!")
        }
    }

    sortInorder = async (a, b) => {
        alert(a.topic)
        alert(b.topic)
        let order = await new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        alert(order)
        return order;
    }
    
    render () {
        if (this.state.isLoading) {
            return null
        }
        return (
            <View style={styles.screen}>
                <View
                    style={styles.header}
                >
                    <TouchableOpacity style={styles.button}
            
                    >
                        <Text style={styles.buttonText}>
                            New Debate
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.debates}>
                        {this.state.renderDebates}
                    </View>
    
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    debates: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    screen: {
        backgroundColor: '#333436',
        height: 900
    },
    search_img: {
        height: 20,
        width: 20,
        alignSelf: 'flex-end',
        tintColor: 'white'
    },
    header: {
        justifyContent: "flex-end",
        marginRight: 10,
        marginTop: 20
    },
    button: {
        width: 130,
        height: 30,
        backgroundColor: '#3D929A',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        left: 10,
        position: 'relative',
        bottom: 0,
        marginTop: 5

    },

    buttonText: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold'
    },
})

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
};

export default connect(mapStateToProps, {})(DebatesScreen);