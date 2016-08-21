import React from 'react';

import CustomerServiceBox from './components/CustomerServiceBox';

export default class Merchant extends React.Component {
    render() {
        let barcodeSrc = "/services/merchant/" + this.props.params.merchantId + "/hangoutashingle";
        let ticketHref = this.props.location.pathname + "/tickets/take-ticket";
        let lineLenUrl = "/services/merchant/" + this.props.params.merchantId + "/lineLength";
        let nowServingUrl = "/services/merchant/" + this.props.params.merchantId;
        let nowServingSocket = "/services/nowserving";
        let nowServingTopic = "/topic/nowserving/" + this.props.params.merchantId;
        let serveUrl = "/services/merchant/" + this.props.params.merchantId + "/serve";
        let rewindUrl = "/services/merchant/" + this.props.params.merchantId + "/rewind";

        return <div className="container">
            <CustomerServiceBox barcodeSrc={barcodeSrc} ticketHref={ticketHref} lineLenUrl={lineLenUrl}
                                nowServingUrl={nowServingUrl} nowServingSocket={nowServingSocket}
                                nowServingTopic={nowServingTopic} servingUrl={serveUrl} rewindUrl={rewindUrl} />
            
            <p>Your merchant ID is: {this.props.params.merchantId}</p>
        </div>
    }
}
