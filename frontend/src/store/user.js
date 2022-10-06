import { csrfFetch } from './csrf';

const initialState = { profile: {}, spots: [], reviews: [], bookings: [] }

const USER_PROFILE = "user/profile";
const USER_SPOTS = "user/spots";
const USER_REVIEWS = "user/reviews";
const USER_BOOKINGS = "user/bookings";

// Actions

const getUserProfileAction = (profile) => {
    return {
        type: USER_PROFILE,
        profile
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

const getUserBookingsAction = (bookings) => {
    return {
        type: USER_BOOKINGS,
        bookings
    }
}

// Functions
export const getUserProfile = () => async (dispatch) => {
    const response = await csrfFetch('/api/account');
    const data = await response.json();
    const profile = data;
    dispatch(getUserProfileAction(profile));
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


export const getUserBookings = () => async (dispatch) => {
    const response = await csrfFetch('/api/account/bookings');
    const data = await response.json();
    const bookings = data.Bookings;
    dispatch(getUserBookingsAction(bookings));
    return data;
}


// Reducer

const userReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case USER_PROFILE:
            newState = {
                ...state,
                profile: action.profile
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
        case USER_BOOKINGS:
            newState = {
                ...state,
                bookings: action.bookings
            }
            return newState;
        default:
            return initialState;
    }
}

export default userReducer;