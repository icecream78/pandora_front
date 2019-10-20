import ACTIONS from './actions';

import initialState from './init.state';

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.TYPES.AUTH: {
            let user = action.payload;
            let newState = { ...state, user: { ...user } };
            localStorage.setItem('token', user.token)
            return newState;
        }

        default:
            return state;
    }
};

export default userReducer