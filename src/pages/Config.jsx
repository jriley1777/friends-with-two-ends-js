import React from 'react';
import styled from 'styled-components';

import Title from '../components/Title/Title';
import StartButtonLink from '../components/StartButtonLink/StartButtonLink';
import { ROUTES } from '../constants/index';

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Config = () => {
    return (
        <PageWrapper>
            <Title />
            <ContentWrapper>
                <StartButtonLink to={ROUTES.PLAY}>Start</StartButtonLink>
            </ContentWrapper>
        </PageWrapper>
    )
}

export default Config;