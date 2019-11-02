import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Instructions = props => {
    return (
        <ContentWrapper>
            <h2>Instructions</h2>
            <p>
                It's wrestling meets capture the flag.<br />
                One keyboard - Two players<br/>
                Simply keep the ball on your side of the court to win.  <br/>
                There are no rules!  But play nicely...
            </p>
        </ContentWrapper>
    )
}

export default Instructions;