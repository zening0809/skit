import React, { Component, ProTypes } from 'react';
import {Divider} from '../skit_ui';
import { ActionTable } from '../components';
import Filter from '../utils/filter';
import { SELECT_LIST_URL, CUSTOMER_LIST_URL } from '../api/config';

export default {
    SELECT_URL: SELECT_LIST_URL,
    TABLE_URL: CUSTOMER_LIST_URL,
    reducerKey: 'reducerCustomerList',
    searchObj: [
        {
            type: 'select',
            cnName: '行业',
            name: 'groupList',
            viewName: 'type',
            data: []
        },
        {
            type: 'select',
            cnName: '级别',
            name: 'customerTypes',
            viewName: 'attribute',
            data: []
        },
        {
            type: 'select',
            cnName: '创建人',
            name: 'marketers',
            viewName: 'create_userid',
            data: []
        }
    ],
    columns : [
        {
            title: '创建人',
            dataIndex: 'create_username',
            key: 'create_username',
            width: '12%'
        },
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
            width: '12%'
        },
        {
            title: '行业',
            dataIndex: 'type',
            key: 'type',
            width: '12%'
        },
        {
            title: '级别',
            dataIndex: 'attribute',
            key: 'attribute',
            width: '12%'
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            width: '12%'
        },
        {
            title: '备注',
            dataIndex: 'desc',
            key: 'desc',
            width: '12%'
        },
        {
            title: '操作',
            key: 'action',
            width: '12.5%',
            items: [
                {
                    id: 0,
                    curTab: 'customerEdit',
                    type: 'edit',
                    text: '编辑',
                    modalTitle: '编辑'
                },
                {
                    id: 1,
                    curTab: 'customerRetweet',
                    type: 'retweet',
                    text: '转让',
                    modalTitle: '转让'
                }
            ]
        }
    ],
    buttonBar: [
        {
            id: 0,
            icon: 'plus',
            type: 'info',
            style: {},
            title: '新建',
            modalTitle: '新建',            
            curTab: 'customerAdd'
        },
        {
            id: 1,
            icon: 'download',
            type: 'success',
            style: { marginLeft: 8 },
            title: '导出',
            modalTitle: '导出',       
            curTab: 'customerExport'
        }
    ],
    filters(data){
        // 定义一个要返回的对象
        let resultData = {};
        // 获取提炼search的数据 
        Filter.dataFilter(data, this.searchObj);
        return this.searchObj || [];
    }
}