import React from 'react';
import {CheckToken} from '../../components'
export default {
    path: 'home',
    indexRoute: {
        onEnter: () => {
            // return false;
            // this.con.router.push(`/`);
        },
        component: require('../../page/home')
    },
    childRoutes: [
    ]
}