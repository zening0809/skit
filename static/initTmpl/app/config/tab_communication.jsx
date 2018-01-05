import React, { Component, ProTypes } from 'react';
import {Divider} from '../skit_ui';
import { ActionTable } from '../components';
import Filter from '../utils/filter';
import { SELECT_LIST_URL, COMM_LIST_URL } from '../api/config';

export default {
    SELECT_URL: SELECT_LIST_URL,
    TABLE_URL: COMM_LIST_URL,
    reducerKey: 'reducerCommList',
    searchObj: [
        {
            type: 'select',
            cnName: '客户名称',
            name: 'customers',
            viewName: 'usergroup',
            data: []
        },
        {
            type: 'input',
            cnName: '姓名',
            viewName: 'keywords',
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
            width: '8%'
        },{
            title: '客户名称',
            dataIndex: 'groupname',
            key: 'groupname',
            width: '9.5%'
        },{
            title: '联系人姓名',
            dataIndex: 'realname',
            key: 'realname',
            width: '12.5%'
        },{
            title: '沟通时间',
            dataIndex: 'comm_time',
            key: 'comm_time',
            width: '12.5%'
        },{
            title: '沟通方式',
            dataIndex: 'comm_type_name',
            key: 'comm_type_name',
            width: '12.5%'
        },{
            title: '沟通记录',
            dataIndex: 'remark',
            key: 'remark',
            width: '12.5%'
        },{
            title: '批注',
            dataIndex: 'memo',
            key: 'memo',
            width: '12.5%'
        },{
            title: '操作',
            key: 'action',
            width: '20%',
            items: [
                {
                    id: 0,
                    type: 'edit',
                    curTab: 'communicationEdit',
                    text: '编辑',
                    modalTitle: '编辑',
                },
                {
                    id: 1,
                    type: 'eye-o',
                    curTab: 'communicationView',
                    modalTitle: '查看',
                    text: '查看'
                },
                {
                    id: 2,
                    type: 'tag-o',
                    curTab: 'communicationEndorse',
                    modalTitle: '批注',
                    text: '批注'
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
            curTab: 'communicationAdd'
        },
        {
            id: 1,
            icon: 'download',
            type: 'success',
            style: { marginLeft: 8 },
            title: '导出',
            modalTitle: '导出',
            curTab: 'communicationExport'
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