import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Card = styled.p`
    padding: 10px 30px;
    background: rgba(255,255,255,0.5);
    border: 1px solid black;
    border-radius: 10px;
`;

const Instructions = () => {
    return (
        <ContentWrapper>
            <h2>Instructions</h2>
            <Card>
                It's wrestling meets capture the flag.<br />
                One keyboard - Two players<br/>
                Simply keep the ball on your side of the court to win.  <br/>
                There are no rules!  But play nicely...
            </Card>
        </ContentWrapper>
    )
}

export default Instructions;