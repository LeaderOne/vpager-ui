import React from 'react'
import { render } from 'react-dom'
import { match, Router, browserHistory, Route } from 'react-router'
import Component from './component.jsx';
/* globals document, window */

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

render((
    <Router history={browserHistory}>
        <Route path="/" component={Component}>
        </Route>
    </Router>
), document.getElementById("app"))
