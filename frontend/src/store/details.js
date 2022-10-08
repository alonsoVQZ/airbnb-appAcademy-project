
const initialState = { spot: {}, review: {} }

function detailsReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        default:
            newState = initialState;
            return newState;
    }
}

export default detailsReducer;