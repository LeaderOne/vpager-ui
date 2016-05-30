import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link} from 'react-router';
import Component from './component';
import Merchant from './merchant';
import CreateMerchant from './create-merchant';
require('bootstrap/dist/css/bootstrap.css');
// /* globals document, window */
//
// const { pathname, search, hash } = window.location
// const location = `${pathname}${search}${hash}`

render((
    <Router>
        <Route path="/" component={Component}/>
        <Route path="/merchant" component={CreateMerchant}/>
        <Route path="/merchant/:merchantId" component={Merchant}/>
    </Router>
), document.getElementById("app"))
