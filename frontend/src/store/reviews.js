import { csrfFetch } from './csrf';

const initialState = [];

const REVIEWS_GET = "reviews/get";
const REVIEWS_POST = "reviews/post"
const REVIEWS_RESET = "reviews/reset";

// Actions

const resetReviewsAction = () => {
    return {
        type: REVIEWS_RESET
    }
}

const getSpotReviewsAction = (reviews) => {
    return {
        type: REVIEWS_GET,
        reviews
    }
}

// Function

export const resetReviews = () => async (dispatch) => {
    dispatch(resetReviewsAction());
    return;
}

export const getReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(getSpotReviewsAction(data.Reviews));
    return;
}

export const postReviews = (spotId, spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(spot)
    });
    console.log(response)
    const data = await response.json();
    dispatch(getReviews(spotId))
    return;
};

export const deleteReviews = (reviewId, spotId) => async (dispatch) => {
    const response = await csrfFetch("/api/reviews/" + reviewId, {
        method: 'DELETE'
    });
    const data = await response.json();
    dispatch(getReviews(spotId))
    return;
};

export const editReviews = (reviewId, spotId, review) => async (dispatch) => {
    const response = await csrfFetch("/api/reviews/" + reviewId, {
        method: 'PUT',
        body: JSON.stringify(review)
    });
    console.log(response)
    const data = await response.json();
    dispatch(getReviews(spotId))
    return;
};

// Reducer

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case REVIEWS_RESET:
            return state;
        case REVIEWS_GET:
            newState = action.reviews;
            return newState;
        case REVIEWS_POST:
            newState = action.reviews;
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;