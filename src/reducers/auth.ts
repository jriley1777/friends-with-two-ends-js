import * as Actions from '../actions/index';
import * as Types from '../types/index';

const initialState: Types.Auth = {
  isLoggedIn: false,
  user: {},
  username: "",
  token: "" 
}

const auth = (
  state: Types.Auth = initialState,
  { type, payload }: Types.Action 
): Types.Auth => {
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