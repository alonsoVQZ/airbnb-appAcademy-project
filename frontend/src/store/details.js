import { csrfFetch } from './csrf';

const initialState = { spot: {}, review: {} }

const DETAILS_SPOT = "details/spot";
const DETAILS_SPOT_RESET = "details/spot/reset"

// Actions
const getSpotDetailsAction = (details) => {
    return {
        type: DETAILS_SPOT,
        details
    }
}

const resetSpotDetailsAction = () => {
    return {
        type: DETAILS_SPOT_RESET
    }
}

// Functions
export const getSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch("/api/spots/" + spotId);
    const data = await response.json();
    const details = data;
    dispatch(getSpotDetailsAction(details));
    return data;
}

export const resetSpotDetails = () => async (dispatch) => {
    dispatch(resetSpotDetailsAction());
    return ;
}

// Reducer
function detailsReducer(state = initialState, action) {
    let stringifyState;
    let newState;
    switch(action.type) {
        case DETAILS_SPOT:
            stringifyState = JSON.stringify(state);
            newState = JSON.parse(stringifyState);
            newState = {
                ...newState,
                spot: action.details,
            }
            return newState;
        case DETAILS_SPOT_RESET:
            newState = {
                ...state,
                spot: {},
            }
            return newState;
        default:
            return state;
    }
}

export default detailsReducer;