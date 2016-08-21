import React from 'react';
import { browserHistory } from 'react-router';
import agent from 'superagent';
require('superagent-as-promised')(agent);


export default class TakeTicket extends React.Component {
    constructor(props) {
        super(props);
        this.getNewTicket = this.getNewTicket.bind(this);
    }

    getNewTicket(e) {
        e.preventDefault();

        let merchantId = this.props.params.merchantId;
        let takeUrl = "/services/ticket/" + merchantId;

        console.log("Asking for ticket from " + takeUrl);

        agent.put(takeUrl).then((resp) => {
            let ticketId = resp.body.id;

            console.log("Got ticket number " + ticketId + " for merchant number " + merchantId);

            browserHistory.push("/merchant/" + merchantId + "/tickets/" + ticketId);
        });
    }

    render() {
        return <div className="container">
            <form className="form-inline" onSubmit={this.getNewTicket}>
                <button type="submit" className="btn btn-lg btn-primary">Take a ticket</button>
            </form>
        </div>
    }
}
