import React from 'react';
import styled from 'styled-components';

const StyledSubtitle = styled.div`
  display: none;

  @media only screen and (min-width: 768px) {
    font-size: 2rem;
    display: flex;
    font-family: Caveat Brush;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: black;
    margin-top: 3vh;
  }
`;

const Subtitle = (props: any) => {
    return (
        <StyledSubtitle>{props.children}</StyledSubtitle>
    )
};

export default Subtitle;