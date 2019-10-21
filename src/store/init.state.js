const savedUser = JSON.parse(localStorage.getItem('user'));
const manufactureList = JSON.parse(localStorage.getItem('manufactureList')) || [];
const usersList = JSON.parse(localStorage.getItem('systemUsers')) || [];

const initialState = {
    user: savedUser,
    token: savedUser ? savedUser.token : '',
    manufactureList,
    usersList,
}

export default initialState;