const TYPES = {
    AUTH: 'AUTH',
};

const auth = userInfo => ({
    type: TYPES.AUTH,
    payload: userInfo
});

export default {
    TYPES,
    auth
}