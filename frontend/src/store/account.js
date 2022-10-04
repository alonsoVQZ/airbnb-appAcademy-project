import { csrfFetch } from './csrf';

const USER_SIGNIN = 'user/signin';
const USER_SIGNUP = 'user/signup';
const USER_SIGNOUT = 'user/signout';
const USER_RESTORE = 'user/restore';
const USER_DEMO = 'user/demo';
const initialState = null;

const signInAction = (user) => {
    return {
        type: USER_SIGNIN,
        user,
    };
};

const signUpAction = (user) => {
    return {
        type: USER_SIGNUP,
        user,
    };
};

const signOutAction = () => {
    return {
        type: USER_SIGNOUT,
    };
};

const restoreUserAction = (user) => {
    return {
        type: USER_RESTORE,
        user
    };
};

const demouserAction = (user) => {
    return {
        type: USER_DEMO,
        user
    };
};



export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/account');
    const data = await response.json();
    dispatch(restoreUserAction(data));
    return response;
};

export const signIn = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await response.json();
    dispatch(signInAction(data));
    return response;
};

export const signUp = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await response.json();
    dispatch(signUpAction(data));
    return response;
};

export const signOut = () => async (dispatch) => {
    const response = await csrfFetch('/api/users/signout', {
        method: 'DELETE'
    });
    const data = await response.json();
    dispatch(signOutAction());
    return data;
};

export const demouser = () => async (dispatch) => {
    const user = {
        credential: "demo@user.com" || "demouser",
        password: "1234"
    }
    const response = await csrfFetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await response.json();
    dispatch(demouserAction(data));
    return data;
};

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case USER_SIGNIN:
        newState = Object.assign({}, state);
        newState = action.user;
        return newState;
    case USER_SIGNUP:
        newState = Object.assign({}, state);
        newState = action.user;
        return newState;
    case USER_RESTORE:
        if(action.user.message === "Authentication required") {
            newState = null;
            return newState;
        }
        newState = Object.assign({}, state);
        newState = action.user;
        return newState;
    case USER_SIGNOUT:
        newState = Object.assign({}, state);
        newState = null;
        return newState;
    case USER_DEMO:
        newState = Object.assign({}, state);
        newState = action.user;
        return newState;
    default:
        return state;
    }
};

export default sessionReducer;