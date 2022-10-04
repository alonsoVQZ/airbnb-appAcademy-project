import { csrfFetch } from './csrf';

const SPOT_DETAILS = 'spot/details';
const SPOT_ADD = 'spot/add';
const SPOT_REMOVE = 'spot/remove';
const SPOT_EDIT = 'spot/edit';
const SPOT_RESET = 'spot/reset';

const initialState = { Owner: {}, Images: [] };

const getSpotDetailsAction = (spot) => {
    return {
        type: SPOT_DETAILS,
        spot
    };
};

const addSpotAction = (spot) => {
    return {
        type: SPOT_ADD,
        spot
    }
}

const removeSpotAction = () => {
    return {
        type: SPOT_REMOVE
    }
}

const editSpotAction = (spot) => {
    return {
        type: SPOT_EDIT,
        spot
    }
}

const resetSpotAction = () => {
    return {
        type: SPOT_RESET
    }
}

export const getSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    dispatch(getSpotDetailsAction(data));
    return data;
};

export const addSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        body: JSON.stringify(spot)
    });
    if(response.statusCode >= 400) {
        return response; 
    }
    const data = await response.json();
    dispatch(addSpotAction(data));
    return data;
};

export const removeSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {  method: "DELETE" });
    dispatch(removeSpotAction());
    return response;
};

export const editSpot = (spot, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    });
    const data = await response.json();
    dispatch(editSpotAction(data));
    return data;
};

export const resetSpot = () =>  (dispatch) => {
    dispatch(resetSpotAction());
};

const spotsDetailsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case SPOT_DETAILS:
        newState = { ...action.spot };
        return newState;
    case SPOT_ADD:
        newState = { ...action.spot };
        return newState;
    case SPOT_REMOVE:
        newState = initialState;
    case SPOT_EDIT:
        newState = { ...action.spot };
        return  newState;
    case SPOT_RESET:
        newState = initialState;
        return  newState;
    default:
        return state;
    }
};

export default spotsDetailsReducer;