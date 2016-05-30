import React from 'react';
import {Link} from 'react-router';

export default class Component extends React.Component {
    render() {
        return <div id="content">
            <h1>Hello, World!</h1>
            <Link to="merchant">Merchant</Link>
        </div>
    }
}
