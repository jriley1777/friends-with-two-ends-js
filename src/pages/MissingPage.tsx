import React from 'react';
import styled from 'styled-components';

import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import TitleCard from '../components/TitleCard/TitleCard';
import Title from '../components/Title/Title';
import Subtitle from '../components/Subtitle/Subtitle';

const StyledWrapper = styled(ContentWrapper)`
  width: 100vw;
  background: #ddd;
  color: black;
  display: block;
`
const StyledTitle = styled(TitleCard)`
  background: #ddd !important;
  color: black;
  width: 100vw;
  display: block;
  z-index: 1000;
  cursor: pointer;
`;

const MissingPage = (props: any) => {
    return (
      <StyledWrapper>
        <StyledTitle>
          <Title />
          <Subtitle>Whoops. Looks like you fell down the wormhole.</Subtitle>
        </StyledTitle>
      </StyledWrapper>
    );
};

export default MissingPage;