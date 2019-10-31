import React from 'react';
import PropTypes from 'prop-types';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import './Processing.css';

class Processing extends React.Component {

    componentDidMount() {
        this.canvas = new p5(this.props.sketch, "app-p5_container");
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
            <div id="app-p5_overlay">
                <div id="app-p5_container" />
            </div>
        )
    }
}

Processing.propTypes = {
    sketch : PropTypes.func.isRequired
};

export default Processing;
