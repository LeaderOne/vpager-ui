import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import agent from 'superagent';
require('superagent-as-promised')(agent);

export default class TicketStatus extends React.Component {
    constructor(props) {
        super(props);

        this.connectToService = this.connectToService.bind(this);
        this.getPlaceInLine = this.getPlaceInLine.bind(this);
        
        this.state = {
            placeInLine: -1
        };
    }

    connectToService() {
        let lineLenUrl = "/services/merchant/" + this.props.params.merchantId + "/lineLength";
        let nowServingUrl = "/services/merchant/" + this.props.params.merchantId;
        let nowServingSocket = "/services/nowserving";
        let nowServingTopic = "/topic/nowserving/" + this.props.params.merchantId;

        console.log("Now serving socket is: " + nowServingSocket);
        let socket = new SockJS(nowServingSocket);
        let client = Stomp.over(socket);

        client.connect({}, (frame) => {
            console.log("Connected to: " + frame);
            client.subscribe(nowServingTopic, this.getPlaceInLine)
        })
    }

    getPlaceInLine() {
        let numberUrl = "/services/ticket/" + this.props.params.merchantId + "/" + this.props.params.ticketId;
        agent
            .get(numberUrl)
            .send({})
            .then((response) => {
                this.setState({placeInLine: response.body});
            });
    }

    componentDidMount() {
        this.connectToService();
        this.getPlaceInLine();
    }

    render() {
        let ticketId = this.props.params.ticketId;

        return <div className="container">
            <p>Your ticket number is {ticketId}</p>

            <h2>You are number {this.state.placeInLine} in line.</h2>

            <p>Stay on this page and we'll notify you when you're ready!</p>
        </div>
    }
}