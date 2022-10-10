import { csrfFetch } from './csrf';

import { getUserSession, userReset } from "./user";

export const signIn = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    if(response.statusCode >= 400) return response;
    const data = await response.json();
    await dispatch(getUserSession());
    return data;
};

export const signUp = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    if(response.statusCode >= 400) return response;
    const data = await response.json();
    await dispatch(getUserSession());
    return data;
};

export const signOut = () => async (dispatch) => {
    const response = await csrfFetch('/api/users/signout', {
        method: 'DELETE'
    });
    if(response.statusCode >= 400) return response;
    const data = await response.json();
    await dispatch(userReset());
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
    if(response.statusCode >= 400) return response;
    const data = await response.json();
    await dispatch(getUserSession());
    return data;
};