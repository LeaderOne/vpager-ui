'use strict';

import React from 'react';
import Stomp from 'webstomp-client';
import agent from 'superagent';
require('superagent-as-promised')(agent);
import SockJS from 'sockjs-client';

export default class CustomerServiceBox extends React.Component {
    constructor(props) {
        super(props);

        this.connectToService = this.connectToService.bind(this);
        this.setCustomerNumber = this.setCustomerNumber.bind(this);
        this.getNumbersForInitialState = this.getNumbersForInitialState.bind(this);
        this.serveCustomer = this.serveCustomer.bind(this);
        this.rewindCustomer = this.rewindCustomer.bind(this);

        this.state = {nowServingCustomer: -1, lineLength: -1};
    }

    connectToService() {
        console.log("Now serving socket is: " + this.props.nowServingSocket);
        let socket = new SockJS(this.props.nowServingSocket);
        let client = Stomp.over(socket);

        client.connect({}, (frame) => {
            console.log("Connected to: " + frame);
            client.subscribe(this.props.nowServingTopic, this.setCustomerNumber)
        })
    }

    setCustomerNumber(nowServingCustomerMessage) {
        let servedInfo = JSON.parse(nowServingCustomerMessage.body);

        console.log("Now setting customer number " + servedInfo.nowServingCustomer);
        this.setState({nowServingCustomer: servedInfo.nowServingCustomer, lineLength: servedInfo.lineLength});
    }

    getNumbersForInitialState() {
        agent
            .get(this.props.nowServingUrl)
            .then((response) => {
                console.log("Setting state from " + this.props.nowServingUrl);
                this.setState({nowServingCustomer: response.body});
            });

        agent
            .get(this.props.lineLenUrl)
            .then((response) => {
                console.log("Setting state from " + this.props.lineLenUrl);
                this.setState({lineLength: response.body});
            });
    }

    componentDidMount() {
        this.getNumbersForInitialState();
        this.connectToService();
    }

    serveCustomer() {
        agent
            .post(this.props.servingUrl)
            .send({})
            .then((response) => {
                let nowServingCustomer = response.body;

                console.log("Reported now serving: " + nowServingCustomer)
            });
    }

    rewindCustomer() {
        agent
            .post(this.props.rewindUrl)
            .send({})
            .then((response) => {
                let nowServingCustomer = response.body;

                console.log("Reported now serving: " + nowServingCustomer);
            });
    }

    render() {
        return (
            <section>
                <div className="row">
                <h1>Now Serving Ticket Number: {this.state.nowServingCustomer}</h1>

                <p>There are <u><b>{this.state.lineLength}</b></u> people in line.</p>
                </div>

                <div className="row btn-group-lg">
                    <button className="btn btn-primary" onClick={this.serveCustomer}>Next customer</button>
                    <button className="btn btn-secondary" onClick={this.rewindCustomer}>Rewind</button>
                </div>

                <div className="row">
                    <p>Your customers can scan the QR code below to take a ticket:</p>
                    <a href={this.props.ticketHref}>
                        <img src={this.props.barcodeSrc}></img>
                    </a>
                    
                    <p>Or, they can visit this website:</p>
                    <a href={this.props.ticketHref}>{this.props.ticketHref}</a>
                </div>
            </section>
        );
    }
}
