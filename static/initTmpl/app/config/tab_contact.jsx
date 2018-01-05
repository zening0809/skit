import React, { Component, ProTypes } from 'react';
import {Divider} from '../skit_ui';
import { ActionTable } from '../components';
import Filter from '../utils/filter';
import { SELECT_LIST_URL, CONTACT_LIST_URL } from '../api/config';

export default {
    SELECT_URL: SELECT_LIST_URL,
    TABLE_URL: CONTACT_LIST_URL,
    reducerKey: 'reducerContactList',
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
        },{
            title: '客户名称',
            dataIndex: 'groupname',
            key: 'groupname',
        },{
            title: '联系人姓名',
            dataIndex: 'realname',
            key: 'realname',
        },{
            title: '部门',
            dataIndex: 'department',
            key: 'department',
        },{
            title: '职位',
            dataIndex: 'position',
            key: 'position',
        },{
            title: '手机号',
            dataIndex: 'phonenum',
            key: 'phonenum',
        },{
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },{
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },{
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        },{
            title: '操作',
            key: 'action',
            width: '12.5%',
            items: [
                {
                    id: 0,
                    type: 'edit',
                    curTab: 'contactEdit',
                    modalTitle: '编辑',
                    text: '编辑'
                },
                {
                    id: 1,
                    type: 'eye-o',
                    curTab: 'contactView',
                    modalTitle: '查看',
                    text: '查看'
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
            curTab: 'contactAdd'
        },
        {
            id: 1,
            icon: 'download',
            type: 'success',
            style: { marginLeft: 8 },
            title: '导出',
            modalTitle: '导出',
            curTab: 'contactExport'
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