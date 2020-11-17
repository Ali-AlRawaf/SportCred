import React from 'react';
import { connect } from "react-redux";
import { getUser } from '../controller/user'
import StephenASmith from '../assets/StephenASmith.png';
import { View, Dimensions, KeyboardAvoidingView, Button, StyleSheet, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Comment from '../component/Comment';
import { getPost } from '../controller/post';
import { newPostComment } from '../controller/postComment';



class PostComment extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            submit: false,
            comment: "",
            userName: 'NAME',
            profilePic: StephenASmith,
            comments: [],
            renderComments: []
        }
    }

    componentDidMount() {
        getUser(this.props.currentUser)
            .then((result) => {
                this.setState({ userName: result.user.username })
            }).then(() => {
                this.realComments().then(resp => {
                    this.setState({ comments: resp })
                }).then(() => {
                    this.setState({
                        renderComments: this.state.comments.map((c, idx) => <Comment key={idx} userName={this.state.userName} comment={c.text} profilePic={this.profilePic} />
                        )
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }



    realComments = async () => {
        const result = await getPost(this.props.route.params.id);
        if (result.status === 200) {
            return result.foundPost.comments;
        } else {
            alert("Something went wrong!")
        }
    }

    updateField = (key, val) => {
        this.setState({
            [key]: val
        });
    };


    buttonPress = async () => {
        const result = await newPostComment(this.state.comment, this.props.route.params.id)
        if (result.status === 200) {
            alert('Comment Worked!')
        } else {
            alert(result.status + ": " + result.error)
        }
    }

    render() {
        return (
            // <KeyboardAvoidingView
            //     behavior={Platform.OS == "ios" ? "padding" : "height"}
            //     style={styles.container}
            // >
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.userInfo}>
                        <Image style={styles.imgBox} source={StephenASmith} />
                        <Text style={styles.headerText}>
                            {this.props.route.params.name}
                        </Text>
                    </View>
                    <Text style={styles.bodyText}
                    >
                        {this.props.route.params.post}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}
                        // UPVOTE ON TOUCH LOGIC HERE
                        >
                            <Text style={styles.buttonText}>
                                👍
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                        // DOWNVOTE ON TOUCH LOGIC HERE
                        >
                            <Text style={styles.buttonText}>
                                👎
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.renderComments}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        placeholder='Comment...'
                        onChangeText={text => this.updateField('comment', text)}
                    >
                    </TextInput>
                    <TouchableOpacity
                        style={styles.postButton}
                        onPress={() => this.buttonPress()}
                    >
                        <Text style={styles.buttonText}>
                            C
                            </Text>
                    </TouchableOpacity>
                </View>

            </View>
            // </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#333436",
        flex: 1
    },
    userInfo: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    toggle: {
        color: "#3D929A",
        marginLeft: 10,
    },
    card: {
        backgroundColor: '#242526',
        minHeight: 120,
        shadowColor: '#673939',
        shadowOpacity: .1,
        borderRadius: 1,
        shadowRadius: 13,
        marginTop: 40,
        paddingBottom: 10
    },
    imgBox: {
        width: 40,
        height: 40,
        left: 10,
        top: 10,
        borderRadius: 25
    },
    textBox: {
        paddingTop: 20,
        alignContent: 'space-between',
        width: 280,
        justifyContent: 'flex-start',
        paddingLeft: 12
    },
    headerText: {
        fontSize: 15,
        marginTop: 20,
        marginLeft: 15,
        fontWeight: 'bold',
        color: '#ffffff',
        paddingLeft: 10,
    },
    bodyText: {
        marginTop: 10,
        fontSize: 12,
        paddingLeft: 10,
        paddingTop: 10,
        color: '#ffffff'
    },
    button: {
        width: 65,
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
    input: {
        margin: 20,
        padding: 15,
        width: 300,
        borderWidth: 0.5,
        borderRadius: 4,
        backgroundColor: "#fff",
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row'
    },
    postButton: {
        width: 45,
        height: 49,
        marginTop: 20,
        marginLeft: -15,
        backgroundColor: '#3D929A',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    }


});

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
};
export default connect(mapStateToProps, {})(PostComment);
