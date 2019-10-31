import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StartButton = styled(Link)`
    width: 55vw;
    height: 5rem;
    font-size: 4rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20vh;
    border-radius: 10px;
    border: 1px solid black;
    text-decoration: none;
    color: black;
    font-family: Caveat Brush;
    
    &:hover {
        background: lightgreen;
    }
`;

const StartButtonLink = ({ to, children }) => {
    return (
        <StartButton to={to}>{ children }</StartButton>
    )
};

export default StartButtonLink;