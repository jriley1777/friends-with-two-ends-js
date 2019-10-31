import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Instructions = props => {
    return (
        <ContentWrapper>
            <h2>Instructions</h2>
            <p>Elit aute laboris commodo cillum exercitation culpa. 
                Consectetur amet eiusmod consectetur culpa amet cupidatat 
                sint sint est excepteur non occaecat non. Amet dolor 
                exercitation labore sit sint proident dolor magna qui 
                sunt enim. In id veniam sint occaecat minim aliquip aute. 
                Sit ullamco mollit ad do adipisicing do aliqua.</p>
        </ContentWrapper>
    )
}

export default Instructions;