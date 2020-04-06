import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    loading_state: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading_state: false };
        case LOGIN_USER_SUCCESS:
            return { ...state, loading_state: true };
        case LOGIN_USER_FAIL:
            return { ...state, loading_state: true }
        default:
            return state;
    }
}