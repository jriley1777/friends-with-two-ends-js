import React from 'react';
import styled from 'styled-components';

const StyledTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    font-size: 2.5rem;
    font-family: Caveat Brush;
    margin-bottom: 5vh;

    @media only screen and (min-width: 768px) {
        font-size: 5rem;
    }
`;

const StyledTitle = styled.div`
    height: 3rem;
    @media only screen and (min-width: 768px) {
        height: 5rem;
    }
`;

const StyledTitleReflection = styled.div`
    height: 2rem;
    line-height: 2rem;
    color: rgba(255,0,0,0.8);
    position: relative;
    width: 100%;
    left: 40px;
    transform: rotateX(180deg);

    @media only screen and (min-width: 768px) {
        height: 2rem;
        line-height: 2rem;
        left: 85px;
        transform: rotateX(180deg);
    }
`;

const Title = () => {
    return (
        <StyledTitleWrapper>
            <StyledTitle>Friends
                <StyledTitleReflection>ends</StyledTitleReflection>
            </StyledTitle>
            <StyledTitle>&nbsp;with two ends.</StyledTitle>
        </StyledTitleWrapper>
    )
};

export default Title;