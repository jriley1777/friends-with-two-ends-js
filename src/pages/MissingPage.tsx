import React from 'react';

import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import TitleCard from '../components/TitleCard/TitleCard';
import Title from '../components/Title/Title';
import Subtitle from '../components/Subtitle/Subtitle';
import StartButtonLink from '../components/StartButtonLink/StartButtonLink';
import { ROUTES } from '../constants/index';

const MissingPage = () => {
    return (
      <ContentWrapper>
        <TitleCard>
          <Title />
          <Subtitle>A missing page.</Subtitle>
          <Subtitle>Looks like you fell down the wormhole.</Subtitle>
        </TitleCard>
        <StartButtonLink to={ROUTES.INDEX}>Come on back home.</StartButtonLink>
      </ContentWrapper>
    );
};

export default MissingPage;