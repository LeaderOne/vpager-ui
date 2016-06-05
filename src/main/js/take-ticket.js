import React from 'react';


export default class TakeTicket extends React.Component {
    getNewTicket() {
        let merchantId = this.props.params.merchantId;

        console.log("Taking new ticket for merchant " + merchantId);
    }

    render() {
        return <div className="container">
            <form className="form-inline" onSubmit={this.getNewTicket}>
                <button type="submit" className="btn btn-default">Take a ticket</button>
            </form>
        </div>
    }
}