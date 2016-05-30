import React from 'react';

export default class Merchant extends React.Component {
    render() {
        return <p>Your merchant ID is {this.props.params.merchantId}</p>
    }
}
