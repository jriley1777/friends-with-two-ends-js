import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../../context';
import { ROUTES } from '../../constants';
import Start from '../../pages/Start';

const Login = props => {
    const { state } = useContext(Context);
    return !state.auth.isLoggedIn ? 
        <Start /> : <Redirect to={ROUTES.INDEX} />
};

export default Login;