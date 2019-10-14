import { PAGE_ACTIONS, LOGIN_ACTIONS } from './index';

export const changeCurrentPage = (pageIndex) => {
    return {
        type: PAGE_ACTIONS.CHANGE_CURRENT_PAGE,
        data: {
            pageIndex
        }
    }
}

export const login = ({ user, token, username }) => {
    return {
        type: LOGIN_ACTIONS.LOGIN,
        payload: {
            user,
            token,
            username
        }
    }
}