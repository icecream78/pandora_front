const TYPES = {
    AUTH: 'AUTH',
};

const auth = userInfo => ({
    action: TYPES.AUTH,
    payload: userInfo
});

export default {
    TYPES,
    auth
}