import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';

let hostname = window.location.hostname;

export default class CreateMerchant extends React.Component {
    constructor(props) {
        super(props);
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
                    browserHistory.push("/merchant/" + res.body.id);
                }
            });
    }

    render() {

        return <div className="container">
            <h1>Please wait while your merchant is created...</h1>
        </div>
    }
}
