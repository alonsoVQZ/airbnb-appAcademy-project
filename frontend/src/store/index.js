import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import sessionReducer from './account';
import spotsReducer from './spots';
import spotDetailsReducer from "./spot"
import reviewsReducer from './reviews';
import userReducer from "./user"

const rootReducer = combineReducers({
    spot: spotDetailsReducer,
    spots: spotsReducer,
    user: sessionReducer,
    reviews: reviewsReducer,
    userInfo: userReducer
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