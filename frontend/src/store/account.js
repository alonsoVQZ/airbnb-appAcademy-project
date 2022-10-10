import { csrfFetch } from './csrf';

import { getUserSession, userReset } from "./user";

export const signIn = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await response.json();
    await dispatch(getUserSession());
    return;
};

export const signUp = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await response.json();
    await dispatch(getUserSession());
    return;
};

export const signOut = () => async (dispatch) => {
    const response = await csrfFetch('/api/users/signout', {
        method: 'DELETE'
    });
    const data = await response.json();
    await dispatch(userReset());
    return;
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
    await dispatch(getUserSession());
    return;
};