import React from 'react';
import styled from 'styled-components';

const StyledTitleWrapper = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    top: 20vh;
    font-size: 5rem;
    font-family: Caveat Brush;
`;

const StyledTitle = styled.div`
    height: 7rem;
    position: relative;
`;

const StyledTitleReflection = styled.div`
    height: 2rem;
    line-height: 2rem;
    color: lightgreen;
    position: relative;
    width: 100%;
    left: 100px;
    transform: rotateX(180deg);
`;

const Title = props => {
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