import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import styled from 'styled-components';

interface OverlayProps {
    height?: string,
    width?: string
}

const Overlay = styled.div<OverlayProps>`
  width: ${props => (props.width ? props.width : "100vw")};
  overflow: hidden;
  position: relative;
  height: ${props => (props.height ? props.height : "94vh")};
`;

interface ContainerProps {
    height?: string
}

const Container = styled.div<ContainerProps>`
  background-attachment: fixed !important;
  overflow: hidden;
  width: 100%;
  height: ${props => (props.height ? props.height : "94vh")};
`;

interface P5Props {
    sketchName: string,
    handleImageUpload?: any,
    shouldCapture?: boolean,
    setShouldCapture?: any,
    userImage?: string,
    players?: [],
    changeRoute?: any,
    gameOver?: boolean,
    shouldReset?: boolean
}

interface Props {
    sketch: any,
    height?: string,
    width?: string,
    p5Props: P5Props,
}


const Processing: React.FC<Props> = props => {
    const { p5Props, height, width, sketch } = props;
    const [canvas, setCanvas] = useState({});
    useEffect(() => {
        let c: any = new p5(
            sketch,
            document.getElementById(`${p5Props.sketchName}-p5_container`) ||
            undefined
        );
        c.props = p5Props;
        setCanvas(c);
        return () => {
            setCanvas({});
            c && c.remove();
        }
    }, []);

    useEffect(() => {
      if (canvas) {
        let updatedCanvas: any = canvas;
        updatedCanvas.props = p5Props;
      }
    }, [p5Props, canvas]);

    return (
        <Overlay
        id={`${p5Props.sketchName}-p5_overlay`}
        height={height}
        width={width}
        >
        <Container
            height={height}
            id={`${p5Props.sketchName}-p5_container`}
        />
        </Overlay>
    );
}

export default Processing;
