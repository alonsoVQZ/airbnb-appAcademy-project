import { csrfFetch } from './csrf';

const initialState = [];

const SPOT_REVIEWS = "spot/reviews";
const RESET_REVIEWS = "reset/reviews";

// Actions

const resetReviewsAction = () => {
    return {
        type: RESET_REVIEWS
    }
}

const getSpotReviewsAction = (spotReviews) => {
    return {
        type: SPOT_REVIEWS,
        spotReviews
    }
}

// Function

export const resetReviews = () => async (dispatch) => {
    dispatch(resetReviewsAction());
    return;
}

export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(getSpotReviewsAction(data.Reviews));
    return;
}

// Reducer

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case RESET_REVIEWS:
            return state;
        case SPOT_REVIEWS:
            newState = action.spotReviews;
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;