import React from 'react';
import request from 'superagent';

let hostname = window.location.hostname;

export default class CreateMerchant extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            merchantId: 0
        }
    }
    
    componentDidMount() {
        console.log('Hostname is ', hostname);
        let url = "/services/merchant/create";

        console.log(url);

        request.put(url)
            .end((err, res) => {
                if(err || !res.ok) {
                    console.log(res);
                    alert("Problems communicating with the server... try refreshing the page.");
                } else {
                    this.setState({merchantId: res.body.id});
                }
            });
    }

    render() {
        let custLink = "/merchant/" + this.state.merchantId + "/tickets/take-ticket";
        let merchantLink = "/services/merchant/" + this.state.merchantId + "/hangoutashingle";

        return <div className="container">
            <h1>Your new merchant ID is {this.state.merchantId}</h1>

            <p>Your customers can get to your store with this QR code:</p>
            <img src={merchantLink} />
            <p>Or with this link:</p>
            <a href={custLink}>{custLink}</a>
        </div>
    }
}
