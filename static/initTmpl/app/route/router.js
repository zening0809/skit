import React, { Component } from 'react'
import { Router, Route, Link, Redirect, hashHistory, browserHistory, IndexRoute } from 'react-router'

import Home from '../container/home/Home'


export default class Routers extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }
    static contextTypes = {
        router: React.PropTypes.object
    }
    
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Home}
                    onLeave={({ params }) => {
                        // console.log('离开了登录页 我们去首页');
                    }}>
                </Route>
            </Router>
        )
    }
}