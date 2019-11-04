const reducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_USER':
            return [
                ...state,
                Object.assign({}, action.user)
            ]
        case 'DELETE_USER':
            let deleteArr = state.splice(action.id, 1)
            return [...state]
            // return state.filter((data, i) => i != action.id)
        case 'EDIT_USER':
            state[action.id] = action.user
            return [...state]
        default:
            return state;
    }
}

export default reducer;