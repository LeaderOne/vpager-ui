import React from 'react';
import {Link, browserHistory} from 'react-router';

export default class Welcome extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        const merchantId = event.target.elements[1].value;

        console.log("Merchant id is " + merchantId);

        const path = `/merchant/${merchantId}`;

        browserHistory.push(path);
    }


    render() {
        return <div className="container">
            <h1>Welcome to VPager!</h1>
            <h2>Would you like to create a merchant?</h2>
            <div className="row">
                <div className="col-md-6">
                    <Link className="btn btn-primary" to="/merchant">Yes, create a merchant and start taking
                        customers.</Link>
                </div>
            </div>

            <h2>Or do you have an existing merchant?</h2>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="row">
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary">I have an
                            existing merchant ID, and it is:</button>
                    </div>
                    <div className="col-md-2"><input id="merchantId" className="form-control" type="number" /></div>
                </div>
            </form>
        </div>
    }
}
