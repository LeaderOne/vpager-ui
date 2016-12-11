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
        this.updatePlacement = this.updatePlacement.bind(this);
        this.alertUser = this.alertUser.bind(this);
        this.client = null;
        this.socket = null;

        this.state = {
            placeInLine: -1
        };
    }

    connectToService() {
        let lineLenUrl = "/services/merchant/" + this.props.params.merchantId + "/lineLength";
        let nowServingUrl = "/services/merchant/" + this.props.params.merchantId;
        let nowServingSocket = "/services/nowserving";
        let nowServingTopic = "/topic/nowserving/" + this.props.params.merchantId;

        this.socket = new SockJS(nowServingSocket);
        this.client = Stomp.over(this.socket);

        this.client.connect({}, (frame) => {
            this.subscription = this.client.subscribe(nowServingTopic, this.updatePlacement)
        })
    }

    updatePlacement(nowServing) {
        var ticketId = this.props.params.ticketId;
        let numberUrl = "/services/ticket/" + this.props.params.merchantId + "/" + ticketId;

        agent
            .get(numberUrl)
            .send({})
            .then((response) => {
                var placeInLine = response.body;
                let nowServingCustomer = JSON.parse(nowServing.body).nowServingCustomer;

                if(nowServingCustomer == ticketId) {
                    this.alertUser();
                } else if(placeInLine < 3) {
                    this.notifyUser();
                }

                this.setState({placeInLine: placeInLine});
            });
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

    checkNotifications() {
        if(!("Notification" in window)) {
            alert("This browser doesn't support notifications.  You'll need to watch the page for your number.");
        } else if(Notification.permission !== 'granted') {
            Notification.requestPermission(function(permission) {
                if(permission === "denied") {
                    alert("You have turned off notifications.  You'll need to watch the page for your number, or reload the page.");
                }
            });
        }
    }

    alertUser() {
        let options = {body: "You are first in line!"};

        let notification = new Notification("Your order is ready!", options);
        window.navigator.vibrate([1000,50,1000,50,2000]);

        let userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ) {
            alert("Your order is ready!");

        } else {
            document.getElementById("alarm-sound").play();
        }
    }
    
    notifyUser() {
        var options = {body: "Your order is almost ready!"};

        var notification = new Notification("Your order is almost ready!");
    }

    componentDidMount() {
        this.connectToService();
        this.getPlaceInLine();
        this.checkNotifications();
    }

    componentWillUnmount() {
        this.client.unsubscribe(this.subscription);
        this.socket.close();
    }

    render() {
        if(this.state.placeInLine == -1) {
            return <div className="container">Please wait...</div>;
        }

        let ticketId = this.props.params.ticketId;

        return <div className="container">
            <p>Your ticket number is {ticketId}</p>

            <h2>You are number {this.state.placeInLine} in line.</h2>

            <p>Stay on this page and we'll notify you when you're ready!</p>
        </div>
    }
}