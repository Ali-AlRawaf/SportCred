import React from 'react'
import { connect } from "react-redux";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native'
import arrow from '../assets/arrow_forward.png'
import Slider from '@react-native-community/slider';

import NBATeamCard from './NBATeamCard'

class PicksTeam extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			pickCategory: "Select Team",
            isLoading: true,
            teams: [],
            picks: ""

		}

		this.handleSearch = this.handleSearch.bind(this);
        this.updateField = this.updateField.bind(this);
        this.getNBATeamsCards = this.getNBATeamsCards.bind(this);
	}

    componentDidMount = () => {
        const teams = this.props.route.params.topic.topic.split(' vs ')
        this.setState({
            isLoading: false,
            teams: teams
        })

        console.log(teams)
        
    }

	handleSearch = () => {
		return
	}

	updateField = (val) => {
		return
	}

    getNBATeamsCards = () => {
        const listItems = this.state.teams.map((d, idx) => <NBATeamCard key={idx} teamName={d} topicId={this.props.route.params.topic._id} userId={this.props.currentUser} navigation={this.props.navigation}></NBATeamCard>);
        return listItems
    }

	render(){
        if (this.state.isLoading) return null;
		return(
			<View style={styles.container}>
			<View style={styles.header}>
			    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
			        <Image
			            style={styles.arrow}
			            source={arrow}
			        />
			    </TouchableOpacity>

			</View>
				<Text style={styles.title}>{this.state.pickCategory}</Text>         
                <View style={styles.teams}>{this.getNBATeamsCards()}</View>
				
			</View>
		);
	}


}

const styles = StyleSheet.create({
	container: {
		paddingTop: 100,
		backgroundColor: "#333436",
		height: '100%'
	},
	header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        width: '95%',
        paddingLeft: 10
    },
    arrow: {
      height: 25,
      width: 25,
      transform: [{
        rotate: '-180deg'
      }],
    },

    title: {
    	textAlign: 'center',
    	fontSize: 35,
    	color: 'white'
    },
    input: {
        width: "90%",
        alignSelf: "center",
        paddingVertical: 20,
        marginVertical: 5,
        paddingStart: 20,
        borderColor: '#747474',
        borderRadius: 40,
        borderWidth: 0.4,
        color: '#fff',
        fontSize: 22
    },
    inputContainer: {
    	paddingTop: 50,
    	flex: 1,
    },

    button: {
        backgroundColor: "#53900F",
        width: "80%",
        alignSelf: "center",
        borderRadius: 5,
        paddingVertical: 15,
        marginTop: 40,
        marginBottom: 20
    },

    prompt: {
        alignSelf: "center",
        color: "white",
        fontSize: 15
    },
    slider: {
        width: '70%',
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        flex: 1,
    },
    optionsContainer: {
        flexDirection: 'row',
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    optionContainer: {
        borderRadius: 10,
        maxWidth: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    },
    option: {
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#fff'
    },
    teams: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 100
    },
})

// export default PicksSearch;

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
};

export default connect(mapStateToProps, { })(PicksTeam);