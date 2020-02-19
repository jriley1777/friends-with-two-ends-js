import React from 'react';
import PropTypes from 'prop-types';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import styled from 'styled-components';

const Overlay = styled.div`
  width: ${props => props.width ? props.width : "100vw"};
  overflow: hidden;
  position: relative;
  height: ${props => props.height ? props.height : "94vh"};
`;

const Container = styled.div`
  background-attachment: fixed !important;
  overflow: hidden;
  width: 100%;
  height: ${props => props.height ? props.height : "94vh"};
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
            <Overlay 
                id={`${this.props.p5Props.sketchName}-p5_overlay`}
                height={this.props.height}
                width={this.props.width}
                >
                <Container 
                    height={this.props.height}
                    id={`${this.props.p5Props.sketchName}-p5_container`} />
            </Overlay>
        )
    }
}

Processing.propTypes = {
    sketch : PropTypes.func.isRequired
};

export default Processing;
