import * as Actions from '../actions/index';

const auth = (state={}, { type, payload }) => {
    switch (type) {
        case Actions.LOGIN_ACTIONS.LOGIN:
            const { user, username, token } = payload;
            return {
                isLoggedIn: true,
                user,
                username,
                token
            }
        default:
            return state;
    }
};
export default auth;