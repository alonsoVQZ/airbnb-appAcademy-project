import { csrfFetch } from './csrf';

const SPOTS_ALL = 'spots/all';
const SPOTS_USER = 'spots/user';
const SPOTS_RESET = 'spots/reset';
const initialState = [];

const getSpotsAction = (spots) => {
    return {
        type: SPOTS_ALL,
        spots
    };
};

const getUserSpotsAction = (spots) => {
    return {
        type: SPOTS_USER,
        spots
    };
};

const resetSpotsAction = () => {
    return {
        type: SPOTS_RESET
    };
}

export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const data = await response.json();
    dispatch(getSpotsAction(data.Spots));
    return response;
};

export const getUserSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/account/spots");
    const data = await response.json();
    dispatch(getUserSpotsAction(data.Spots));
    return response;
};

export const resetSpots = () => (dispatch) => {
    dispatch(resetSpotsAction());
};

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case SPOTS_ALL:
        newState = action.spots;
        return newState;
    case SPOTS_USER:
        newState = action.spots;
        return newState;
    case SPOTS_RESET:
        newState = [];
        return newState;
    default:
        return state;
    }
};

export default spotsReducer;