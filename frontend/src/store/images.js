
const initialState = { spot: {}, review: {} }

function imagesReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        default:
            newState = initialState;
            return newState;
    }
}

export default imagesReducer;