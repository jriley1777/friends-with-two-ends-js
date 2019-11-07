import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleCard = styled.p`
    padding: 10px 30px;
    background: rgba(255,255,255,0.5);
    border: 1px solid black;
    border-radius: 10px;
`;

const Instructions = props => {
    return (
        <ContentWrapper>
            <h2>Instructions</h2>
            <TitleCard>
                It's wrestling meets capture the flag.<br />
                One keyboard - Two players<br/>
                Simply keep the ball on your side of the court to win.  <br/>
                There are no rules!  But play nicely...
            </TitleCard>
        </ContentWrapper>
    )
}

export default Instructions;