import React, { Component, ProTypes } from 'react';
import {  push } from 'react-router-redux';
import { Icon, Button, Row, Col, Tabs, Divider, Modal, Message } from '../skit_ui';
import { Flexible, ActionTable, ClearToken, GetToken } from '../components';

import ConSearchForm from '../container/search_form';
import ConDataTable from '../container/data_table';
import ConButtonBar from '../container/button_bar';

import token from '../utils/token';
import { connect } from 'react-redux';
import { fetchGet } from '../api/common';

class ModSearchSheet extends React.Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this);
    }

    //处理 SearchSheet Container行为
    handleSearch(res){
        const { dispatch, dataConfig } = this.props;
        const { TABLE_URL } = dataConfig;
        const accessToken = token.getToken();
        
        dispatch(fetchGet(TABLE_URL, res, {
            'x-access-token': accessToken
        }));
    }

    //处理 DataTable Container行为
    handleDataTable(rowIndex, buttonIndex) {
    }

    render() {
        const { dataConfig } = this.props;
        const { SELECT_URL, TABLE_URL, columns, buttonBar, reducerKey } = dataConfig;
        
        return (
            <div>
                <Flexible>
                    <ConSearchForm didSearch={this.handleSearch} dataUrl={SELECT_URL} dataFilter={dataConfig}/>
                </Flexible>
                <ConButtonBar list={buttonBar}/>
                <ConDataTable didClickAction={this.handleDataTable} dataUrl={TABLE_URL} dataColumn={columns} reducerKey={reducerKey}/>
            </div>
        )
    }
}

export default connect()(ModSearchSheet);

// const SheetButtonBar = (props) => {
//     if (!props.list || props.list.length == 0) {
//         return (
//             <div></div>
//         );
//     } else {
//         return (
//             <div style={homeBtnContainer}>
//             {
//                 props.list.map(item => {
//                     return (
//                         <Button
//                             key={item.id}
//                             onClick={()=>{
//                                 handleSheetButtonBar(item.id);
//                             }}
//                             icon={item.icon}
//                             type={item.type}
//                             style={item.style}>
//                             {item.title}
//                         </Button>
//                     );
//                 })
//             }
//             </div>
//         );
//     }
// };

// const handleSheetButtonBar = (id) => {

// };

// const homeBtnContainer = {
//     height: '60px',
//     background: '#fff',
//     lineHeight: '60px',
//     paddingLeft: '15px'
// };
