import { csrfFetch } from './csrf';
import { getSpotDetails } from "./details"

const initialState = [];

const SPOTS_GET = "spots/get";
const SPOTS_POST = "spots/post";
const SPOTS_PUT = "spots/put";
const SPOTS_DELETE = "spots/delete";
const SPOTS_RESET = "spots/reset";

// Actions

const getSpotsAction = (spots) => {
    return {
        type: SPOTS_GET,
        spots
    };
};

const postSpotsAction = (spots) => {
    return {
        type: SPOTS_POST,
        spots
    };
};

const putSpotsAction = (spots) => {
    return {
        type: SPOTS_PUT,
        spots
    };
};

const deleteSpotsAction = (spots) => {
    return {
        type: SPOTS_DELETE,
        spots
    };
};

const resetSpotsAction = (spots) => {
    return {
        type: SPOTS_RESET,
    };
};

// Functions

export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const data = await response.json();
    dispatch(getSpotsAction(data.Spots));
    return;
};

export const postSpots = (spot) => async (dispatch) => {
    const response = await csrfFetch("/api/spots", {
        method: 'POST',
        body: JSON.stringify(spot)
    });
    if(response.statusCode >= 400) return response;
    const data = await response.json();
    dispatch(getSpots());
    return data;
};

export const putSpots = (spotId, spot) => async (dispatch) => {
    const response = await csrfFetch("/api/spots/" + spotId, {
        method: 'PUT',
        body: JSON.stringify(spot)
    });
    if(response.statusCode >= 400) return response;
    const data = await response.json();
    dispatch(getSpotDetails(spotId));
    return data;
};

export const deleteSpots = (spotId) => async (dispatch) => {
    const response = await csrfFetch("/api/spots/" + spotId, {
        method: 'delete',
    });
    if(response.statusCode >= 400) return response;
    const data = await response.json();
    dispatch(getSpots());
    return data;
};

export const resetSpots = () => (dispatch) => {
    dispatch(resetSpotsAction());
    return;
};

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case SPOTS_GET:
            newState = action.spots
            return newState;
    case SPOTS_RESET:
        newState = [];
        return newState;
    default:
        return state;
    }
};

export default spotsReducer;