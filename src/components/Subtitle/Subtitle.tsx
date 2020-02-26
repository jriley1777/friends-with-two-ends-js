import React from 'react';
import styled from 'styled-components';

const StyledSubtitle = styled.div`
  display: flex;
  height: 2rem;
  font-size: 2rem;
  font-family: Caveat Brush;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: black;
  margin-top: 5vh;
`;

const Subtitle = (props: any) => {
    return (
        <StyledSubtitle>{props.children}</StyledSubtitle>
    )
};

export default Subtitle;