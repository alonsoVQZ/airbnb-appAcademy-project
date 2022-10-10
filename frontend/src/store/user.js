import { csrfFetch } from './csrf';

const initialState = { authenticated: false, session: {}, spots: [], reviews: [] }

const USER_SESSION = "user/session";
const USER_SPOTS = "user/spots";
const USER_REVIEWS = "user/reviews";
const USER_RESET = "user/reset";

// Actions

const getUserSessionAction = (session) => {
    return {
        type: USER_SESSION,
        session
    }
}

const getUserSpotsAction = (spots) => {
    return {
        type: USER_SPOTS,
        spots
    }
}

const getUserReviewsAction = (reviews) => {
    return {
        type: USER_REVIEWS,
        reviews
    }
}

const userResetAction = () => {
    return {
        type: USER_RESET
    }
}


// Functions

export const getUserSession = () => async (dispatch) => {
    const response = await csrfFetch('/api/account');
    const data = await response.json();
    const session = data;
    dispatch(getUserSessionAction(session));
    return data;
}


export const getUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/account/spots');
    const data = await response.json();
    const spots = data.Spots;
    dispatch(getUserSpotsAction(spots));
    return data;
}


export const getUserReviews = () => async (dispatch) => {
    const response = await csrfFetch('/api/account/reviews');
    const data = await response.json();
    const reviews = data.Reviews;
    dispatch(getUserReviewsAction(reviews));
    return data;
}

export const userReset = () => async (dispatch) => {
    dispatch(userResetAction());
    return;
}


// Reducer

const userReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case USER_SESSION:
            newState = {
                ...state,
                authenticated: true,
                session: action.session
            }
            return newState;
        case USER_SPOTS:
            newState = {
                ...state,
                spots: action.spots
            }
            return newState;
        case USER_REVIEWS:
            newState = {
                ...state,
                reviews: action.reviews
            }
            return newState;
        case USER_RESET: 
            newState = initialState;
            return newState;
        default:
            return state;
    }
}

export default userReducer;