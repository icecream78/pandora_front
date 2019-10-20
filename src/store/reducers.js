import ACTIONS from './actions';

const initialState = {
    user: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.TYPES.AUTH: {
            console.log(action);

            let user = action.payload;
            let newState = { ...user };
            return newState;
        }

        default:
            return state;
    }
};

export default userReducer