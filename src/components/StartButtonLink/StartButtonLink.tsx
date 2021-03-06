import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StartButton = styled(Link)`
    width: 55vw;
    height: 5rem;
    font-size: 3rem;
    cursor: pointer;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid black;
    text-decoration: none;
    color: black;
    font-family: Caveat Brush;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.75);
    
    &:hover {
        background: lightgreen;
    }
`;

type StartButtonTypes = {
    to: string,
    children: any,
    onClick?: any
}

const StartButtonLink = ({ to, children, ...rest }: StartButtonTypes) => {
    return (
        <StartButton to={to} {...rest}>{ children }</StartButton>
    )
};

export default StartButtonLink;