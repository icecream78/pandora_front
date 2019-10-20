import ACTIONS from './actions';
import initialState from './init.state';
import userConsts from '../constants/user';

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.TYPES.AUTH: {
            let user = action.payload;
            const roleDescription = userConsts.userMapRoles[+user.role] || 'Неизвестная роль';
            const preparedUserInfo = { user: { ...user, roleDescription } };
            let newState = { ...state, ...preparedUserInfo };

            console.log(newState);
            console.log(preparedUserInfo);

            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(preparedUserInfo.user));
            return newState;
        }

        default:
            return state;
    }
};

export default userReducer