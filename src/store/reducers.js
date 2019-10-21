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

            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(preparedUserInfo.user));
            return newState;
        }

        // TODO: solve question with cache invalidation
        case ACTIONS.TYPES.MANUFACTUR_LIST: {
            let manufactureList = action.payload;
            localStorage.setItem('manufactureList', JSON.stringify(manufactureList));

            return { ...state, manufactureList };
        }

        // TODO: solve question with cache invalidation
        case ACTIONS.TYPES.SYSTEM_USERS_LIST: {
            let usersList = action.payload;
            localStorage.setItem('systemUsers', JSON.stringify(usersList));

            return { ...state, usersList };
        }

        case ACTIONS.TYPES.LOGOUT: {
            localStorage.removeItem('user');
            return { ...state, user: null }
        }

        default:
            return state;
    }
};

export default userReducer