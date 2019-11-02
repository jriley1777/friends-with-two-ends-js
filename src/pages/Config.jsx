import React from 'react';
import styled from 'styled-components';

import Title from '../components/Title/Title';
import PlayerSelect from '../components/PlayerSelect/PlayerSelect';
import Instructions from '../components/Instructions/Instructions';

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const ContentWrapper = styled.div`
    display: flex;
    padding-left: 5vw;
    padding-right: 5vw;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: flex-start;

    > * {
        width: 50%;
    }
`;

const Config = () => {
    return (
        <PageWrapper>
            <Title />
            <ContentWrapper>
                <Instructions />
                <PlayerSelect />
            </ContentWrapper>
        </PageWrapper>
    )
}

export default Config;