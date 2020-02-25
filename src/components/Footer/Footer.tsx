import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0;
    height: 1.5rem;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: black;
    color: white;
`;

const SyledHeart = styled.span`
    color: red;
    font-style: bold;
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <p>made with <SyledHeart>{`<3`}</SyledHeart> by Joe Riley.</p>
        </FooterWrapper>
    )
};

export default Footer;