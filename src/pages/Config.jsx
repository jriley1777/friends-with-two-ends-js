import React from 'react';
import styled from 'styled-components';

import Title from '../components/Title/Title';
import PlayerSelect from '../components/PlayerSelect/PlayerSelect';
import Instructions from '../components/Instructions/Instructions';

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direcion: row;
    flex-grow: 1;
    align-items: flex-start;
`;

const ContentWrapper = styled.div`
    margin-top: 15vh;
    display: flex;
    padding-left: 5vw;
    padding-right: 5vw;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
    height: 100%;

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