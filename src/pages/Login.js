import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';

import firebase from 'firebase';
//Redux 
import { emailChanged, passwordChanged, loginUser } from '../actions/index';
import { connect } from 'react-redux';
//Components
import MyButton from '../components/MyButton';
//Variables
const screenHeight = Dimensions.get('window').width;

class Login extends Component {

    state = {
        userLoginState: null,
    };

    componentWillMount() {
        console.log("componentDidMount");

        //Firebase config keys
        firebase.initializeApp({
            apiKey: '',
            authDomain: '',
            databaseURL: '',
            projectId: '',
            storageBucket: '',
            messagingSenderId: '',
            appId: '',
            measurementId: ''
        });


        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ userLoginState: true });
                console.log("Previously logged in");
                this.props.navigation.navigate('Language')
            }
            else {
                this.setState({ userLoginState: false });
            }
        })
    };

    Login = () => {
        console.log("Login Button Clicked");

        const { email, password } = this.props;
        this.props.loginUser({ email, password });

        console.log('LoadingStateProps : ' + this.props.loading_state)
        
        if (this.props.loading_state){
            console.log("Language Page Opened");
            this.props.navigation.navigate('Language')
        }
    };

    render() {
        const { input, customText } = styles;
        console.log('Email : ' + this.props.email);
        console.log('Password : ' + this.props.password);
        return (
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.backgroundColor} />
                <View style={styles.header}>
                    <Image style={styles.logo} source={require('../img/logo.png')} />
                    <Text style={styles.description}>Special news applicaiton for you!</Text>
                </View>
                <View style={styles.formView}>
                    <TextInput
                        style={[this.state.inputFocus ? customText : input]}
                        placeholder='Mail'
                        value={this.props.email}
                        onChangeText={email => this.props.emailChanged(email)}
                    />

                    <TextInput
                        style={[this.state.inputFocusPassword ? customText : input]}
                        placeholder='Password'
                        secureTextEntry={true}
                        value={this.props.password}
                        onChangeText={password => this.props.passwordChanged(password)}
                    />

                    <TouchableOpacity style={styles.loginButton} onPress={this.Login}>
                        <MyButton textTitle='Sign In' backgroundColor='#000' />
                    </TouchableOpacity>
                </View>
                <View style={styles.CreateAccountView}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text style={styles.accountCreateText}>Create Account Now!</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    backgroundColor: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        backgroundColor: '#2975e7',
        height: screenHeight,
        width: '100%',
    },
    header: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginVertical: 65,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    description: {
        fontSize: 18,
        color: '#fff',
    },
    formView: {
        height: 'auto',
        width: '85%',
        backgroundColor: '#fff',
        padding: 15,
        paddingTop: 50,
        paddingBottom: 30,
        borderRadius: 10,
        justifyContent: 'center',
    },
    loginButton: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    CreateAccountView: {
        alignItems: 'center',
        marginTop: '20%'

    },
    accountCreateText: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: '600',
        marginBottom: 5,
        borderBottomWidth: 1,

    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        marginBottom: 5,
        paddingLeft: 5,
    },
    customText: {
        borderBottomWidth: 2,
        borderBottomColor: '#2975e7',
        marginBottom: 5,
        paddingLeft: 5,
        fontWeight: 'bold',
        fontSize: 16,
    }
});

const mapStateToProps = ({ authenticationResponse }) => {
    console.log(mapStateToProps);
    const { email, password, loading_state } = authenticationResponse;
    return {
        email,
        password,
        loading_state,
    }
};


export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Login);