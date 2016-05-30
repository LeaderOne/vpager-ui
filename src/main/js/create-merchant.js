import React from 'react';
import styles from '../css/normalize.css';

export default class CreateMerchant extends React.Component {
    render() {
        return <div className="container">
               <h1>Welcome to VPager!</h1>
               <h2>Would you like to create a merchant?</h2>
               <button className="btn btn-primary">Yes, create a merchant and start taking customers.</button>
            </div>
    }
}
