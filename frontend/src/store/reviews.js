import { csrfFetch } from './csrf';

const initialState = [];

const SPOT_REVIEWS = "spot/reviews";

// Actions

const getSpotReviewsAction = (spotReviews) => {
    return {
        type: SPOT_REVIEWS,
        spotReviews
    }
}

// Function

export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(getSpotReviewsAction(data));
    return;
}

// Reducer

const reviewsReducer = (state = initialState, action) => {
    switch(action) {
        case SPOT_REVIEWS:
            console.log("///////////////////")
            console.log(action)
            return state;
        default:
            return state;
    }
}

export default reviewsReducer;