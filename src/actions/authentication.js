import { Alert } from 'react-native';
import firebase from 'firebase';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from './types';

export const emailChanged = (email) => {
    return (dispatch) => {
        dispatch({
            type: EMAIL_CHANGED,
            payload: email
        });
    };
};

export const passwordChanged = (password) => {
    return (dispatch) => {
        dispatch({
            type: PASSWORD_CHANGED,
            payload: password
        });
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER
        });
        console.log("Login User Action");
        if (email === '' && password === '') {
            Alert.alert(
                'Error!',
                'Email and password fields cannot be empty.',
                [
                    { text: 'Okey', onPress: () => null }
                ]
            );
        }
        else {
            console.log("Firebase");
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => loginSucces(dispatch,user))
                .catch(() => {
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then(user => loginSucces(dispatch,user))
                            .catch(loginFail(dispatch))
                    });
        }
    };
};

const loginSucces = (dispatch,user) => {
    console.log("loginSucces"); 
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};

const loginFail = (dispatch) => {
    console.log("loginFail");
    Alert.alert(
        'Error!',
        'Your e-mail or password is incorrect!',
        [
            { text: 'Okey', onPress: () => null }
        ]
    );
    dispatch({
        type: LOGIN_USER_FAIL
    });
};