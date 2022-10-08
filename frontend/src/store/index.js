import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import userReducer from "./user";
import spotsReducer from "./spots";
import reviewsReducer from "./reviews";
import imagesReducer from "./images";
import detailsReducer from "./details";

const rootReducer = combineReducers({
    user: userReducer,
    spots: spotsReducer,
    reviews: reviewsReducer,
    details: detailsReducer,
    images: imagesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};
  
export default configureStore;