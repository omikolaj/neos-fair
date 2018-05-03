import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

class Layout extends Component {
    render () {
        return (
            <Aux>
                <Toolbar />
            </Aux>
        )
    }
}

export default Layout;