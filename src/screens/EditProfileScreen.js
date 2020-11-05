import React, { useState } from 'react';
import { connect } from "react-redux";
import { View, StyleSheet, Button } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import EditInput from '../component/editInput';
import { getUser, editData } from '../controller/user';


class EditProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id:this.props.currentUser,
            username: 'name',
            email:'email',
            description: 'description',
            password: 'password',
            status: 'status',
     }
     this.updateField = this.updateField.bind(this);
     this.validateEditProfile = this.validateEditProfile.bind(this);
    }

    updateField = (key, val) => {
        this.setState({
            [key]: val
        });
    };
    componentDidMount = () => {
        getUser(this.props.currentUser)
        .then((result) => {
        this.setState({
        username: result.user.username,
        email: result.user.email,
        description:result.user.description,
        password: result.user.password,
        status: result.user.status,
        })
      })
      .catch((err) =>{
        console.log(err)
      })
    }


    validateEditProfile = async () => {
        const result = await editData(this.state);
        if(result.status === 200)
            this.props.navigation.navigate('Profile')
        else
          alert(result.status + ": " + result.error)

            }



render() {
    return (
        <View style={styles.screen}>
            <View style={styles.cancelLogoContainer}>
                <MaterialIcons name="cancel" size={32} color="white" onPress={() => {
                    this.props.navigation.goBack()
                }} />
            </View>
            <View style={styles.editLogoContainer}>
                <FontAwesome5 name="user-edit" size={32} color="white" />
            </View>
            <EditInput
            title="Name"
            value = {this.state.username}
            onChangeText={text => this.setState({
                username: text,
                email: this.state.email,
                description:this.state.description,
                status:this.state.status,
                password: this.state.password,
            })}
            />
            <EditInput
            title="Description"
            value = {this.state.description}
            onChangeText={text => this.setState({
                username: this.state.username,
                email: this.state.email,
                description: text,
                status:this.state.status,
                password: this.state.password,
            })}
            />
            <EditInput title="Status"
            value = {this.state.status}
            onChangeText={text => this.setState({
                username: this.state.username,
                email: this.state.email,
                description:this.state.description,
                status: text,
                password:this.state.password,
            })}
            />
            <EditInput
            title="Password"
            value = {this.state.password}
            isPassword onChangeText={text => this.setState({
                username: this.state.username,
                email: this.state.email,
                description:this.state.description,
                status: this.state.status,
                password:text,
            })}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Update Profile"
                    color="green"
                    onPress={() => this.validateEditProfile()}
                />
            </View>
        </View>
    )
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#24231f",
    },
    cancelLogoContainer: {
        width: "100%",
        height: "5%",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 10,
    },
    editLogoContainer: {
        width: "100%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    buttonContainer: {
        width: 400,
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#24231f",
        borderRadius: 10,
        padding: 20,
    }
})

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {editData})(EditProfile);
