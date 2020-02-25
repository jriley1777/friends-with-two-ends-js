import React from 'react';
import { connect } from 'react-redux';

import * as Selectors from '../../selectors/index';

const User = (props: any) => {
    const { username } = props;
    return username ? (
        <div>{username}</div>
    ) : (
        <div>not logged in.</div>
    )
};

const mapStateToProps = (state: any) => ({
    username: Selectors.getUsername(state)
})

export default connect(mapStateToProps, null)(User);