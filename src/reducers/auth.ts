import * as Actions from '../actions/index';

interface Auth {
  isLoggedIn: boolean,
  user: any,
  username: string,
  token: string
};
type ActionTypes = {
    type: string,
    payload: any
}

const auth = (
  state = {
    isLoggedIn: false,
    user: {},
    username: "",
    token: ""
  },
  { type, payload }: ActionTypes
): Auth => {
  switch (type) {
    case Actions.LOGIN_ACTIONS.LOGIN:
      const { user, username, token } = payload;
      return {
        isLoggedIn: true,
        user,
        username,
        token
      };
    default:
      return state;
  }
};
export default auth;