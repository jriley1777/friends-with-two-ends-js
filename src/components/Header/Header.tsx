import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import User from '../User/User';
import { ROUTES } from '../../constants/index';

const HeaderWrapper = styled.div`
    width: 100%;
    height: 1.5rem;
    position: absolute;
    top: 0;
    background: black;
    color: white;
    z-index: 3;
`;

const HeaderContainer = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const HomeLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Header = () => {
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <HomeLink to={ ROUTES.INDEX }>Friends.</HomeLink>
                <User />
            </HeaderContainer>
        </HeaderWrapper>
    )
};

export default Header;