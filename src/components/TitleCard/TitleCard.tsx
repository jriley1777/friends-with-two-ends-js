import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  padding: 30px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 75%;
`;

const TitleCard = (props: any) => {
    return (
        <StyledCard>{ props.children }</StyledCard>
    )
};

export default TitleCard;