import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default class TicketStatus extends React.Component {
    constructor(props) {
        super(props);

        this.connectToService = this.connectToService.bind(this);
        this.getPlaceInLine = this.getPlaceInLine.bind(this);
    }

    connectToService() {
        let lineLenUrl = "/services/merchant/" + this.props.params.merchantId + "/lineLength";
        let nowServingUrl = "/services/merchant/" + this.props.params.merchantId;
        let nowServingSocket = "/services/nowserving";
        let nowServingTopic = "/services/topic/nowserving/" + this.props.params.merchantId;

        console.log("Now serving socket is: " + nowServingSocket);
        let socket = new SockJS(nowServingSocket);
        let client = Stomp.over(socket);

        client.connect({}, (frame) => {
            console.log("Connected to: " + frame);
            client.subscribe(nowServingTopic, this.getPlaceInLine)
        })
    }

    getPlaceInLine() {

    }

    componentDidMount() {
        this.connectToService();
    }

    render() {
        let ticketId = this.props.params.ticketId;

        return <div className="container">
            <p>Your ticket number is {ticketId}</p>
        </div>
    }
}