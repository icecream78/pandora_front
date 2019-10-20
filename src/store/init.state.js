const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: savedUser,
    token: savedUser ? savedUser.token : '',
}

export default initialState;