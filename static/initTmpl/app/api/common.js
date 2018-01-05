/**
 * api common.js
 * include all http requests.
 */

import * as config from './config'; 
import fetch from 'cross-fetch';

/**
 * api action types
 */
export const REQUEST_ACTION = 'REQUEST_ACTION';
export const RECEIVE_ACTION = 'RECEIVE_ACTION';

/**
 * api action creators
 */
function createApiRequestAction(url) {
    return {
        type: REQUEST_ACTION,
        param: {
            url: url
        }
    }
}

function createApiReceiveAction(url, result) {
    return {
        type: url,
        data: result
    }
}

/**
 * api fetch
 */
export function fetchPost(url, params, headers = {}) {
    return dispatch => {
        //请求前状态设定
        // dispatch(createApiRequestAction(url));
        
        //拼装
        let dic = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        };

        //请求头处理
        Object.assign(dic.headers, headers);

        //请求
        return fetch(url, dic)
            .then(response => response.json())
            .then(json => {
                dispatch(createApiReceiveAction(url, json));
            })
    }
}

export function fetchGet(url, params= {}, headers = {}) {
    return dispatch => {
        //请求前状态设定
        // dispatch(createApiRequestAction(url));

        //拼装url
        let reqUrl = appendForGet(url, params);

        //拼装
        let dic = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        //请求头处理
        Object.assign(dic.headers, headers);

        //请求
        return fetch(reqUrl, dic)
            .then(response => response.json())
            .then(json => {
                //notice: do not use reqUrl for the action name!
                dispatch(createApiReceiveAction(url, json));
            })
    }
}

export function fetchSelf(method = 'GET', url, params= {}, headers = {}) {
    if (method.toUpperCase() === 'GET') {
        //请求前状态设定
        // dispatch(createApiRequestAction(url));

        //请求参数
        let dic = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        //URL
        let reqUrl = appendForGet(url, params);

        //请求头处理
        Object.assign(dic.headers, headers);

        //请求
        return fetch(reqUrl, dic).then(response => response.json());
    } else if (method.toUpperCase() === 'POST'){
        //请求前状态设定
        // dispatch(createApiRequestAction(url));

        //拼装
        let dic = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        };

        //请求头处理
        Object.assign(dic.headers, headers);

        //请求
        return fetch(url, dic).then(response => response.json());
    } else {
        return Promise.reject('Not supported request method!');
    }
}

function appendForGet(url, params) {
    let reqUrl = url;
    if (params && Object.keys(params).length > 0) {
        let paramsList = [];
        for (let key in params) {
            if (params[key]) {
                paramsList.push(`${key}=${params[key]}`);
            }
        }
        reqUrl = `${reqUrl}?${paramsList.join('&')}`;
    }
    return reqUrl;
}

