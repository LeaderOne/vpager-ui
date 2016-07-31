import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router';
import Welcome from './welcome';
import Merchant from './merchant';
import CreateMerchant from './create-merchant';
import TakeTicket from './take-ticket';
import TicketStatus from './ticket-status';
require('bootstrap/dist/css/bootstrap.css');
// /* globals document, window */
//
// const { pathname, search, hash } = window.location
// const location = `${pathname}${search}${hash}`

render((
    <Router history={browserHistory}>
        <Route path="/" component={Welcome}/>
        <Route path="/home" component={Welcome} />
        <Route path="/merchant" component={CreateMerchant}/>
        <Route path="/merchant/:merchantId" component={Merchant}/>
        <Route path="/merchant/:merchantId/tickets/take-ticket" component={TakeTicket} />
        <Route path="/merchant/:merchantId/tickets/:ticketId" component={TicketStatus} />
    </Router>
), document.getElementById("app"))
