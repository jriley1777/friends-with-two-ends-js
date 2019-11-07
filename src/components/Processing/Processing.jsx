import React from 'react';
import PropTypes from 'prop-types';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import styled from 'styled-components';

const Overlay = styled.div`
    width: 100vw;
    height: auto;
    overflow: hidden;
    position: absolute;
    top: 1.5rem;
    height: 94vh;
`

const Container = styled.div`
    z-index: -10000;
    background-attachment: fixed !important;
    overflow: hidden;
    width: 100%;
    height: 94vh;
`;

class Processing extends React.Component {

    componentDidMount() {
        this.canvas = new p5(this.props.sketch, `${this.props.p5Props.sketchName}-p5_container`);
        this.canvas.props = this.props.p5Props;
    }

    componentWillUnmount() {
        this.canvas.remove();
    }

    shouldComponentUpdate(nextProps) { // just in case :)
        this.canvas.props = nextProps.p5Props;
        return false;
    }

    render(){
        return (
            <Overlay id={`${this.props.p5Props.sketchName}-p5_overlay`}>
                <Container id={`${this.props.p5Props.sketchName}-p5_container`} />
            </Overlay>
        )
    }
}

Processing.propTypes = {
    sketch : PropTypes.func.isRequired
};

export default Processing;
