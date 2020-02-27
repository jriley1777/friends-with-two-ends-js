import React from 'react';
import styled from "styled-components";

const StyledContent = styled.div.attrs({
    className: 'ContentWrapper'
})`
  display: flex;
  position: absolute;
  height: 100%;
  width: 100vw;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;

  > * {
    z-index: 2;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const ContentWrapper = (props: any) => {
    return (
        <StyledContent>{ props.children }</StyledContent>
    )
};

export default ContentWrapper;