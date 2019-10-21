const TYPES = {
    AUTH: 'AUTH',
    LOGOUT: 'LOGOUT',
    MANUFACTUR_LIST: 'MANUFACTUR_LIST',
    SYSTEM_USERS_LIST: 'SYSTEM_USERS_LIST',
};

const auth = userInfo => ({
    type: TYPES.AUTH,
    payload: userInfo
});

const logout = () => ({
    type: TYPES.LOGOUT,
});

const loadManufactureList = manufactureList => ({
    type: TYPES.MANUFACTUR_LIST,
    payload: manufactureList
});

const loadSystemUsersList = usersList => ({
    type: TYPES.SYSTEM_USERS_LIST,
    payload: usersList
});

export default {
    TYPES,
    auth,
    logout,
    loadManufactureList,
    loadSystemUsersList,
}