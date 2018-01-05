import React, { Component, ProTypes } from 'react';
import { Icon, Button, Row, Col, Tabs, Divider, Modal, Message, Table } from '../skit_ui';

import token from '../utils/token';
import { connect } from 'react-redux';
import { fetchGet } from '../api/common';
import { Column } from 'rc-table/lib';
import { ActionTable } from '../components';
import { modalStatusAction } from '../actions';

class ConDataTable extends Component {
    static proTypes = {

    }
    static defaultProps = {
        needFilter: false
    }
    state = {
        subStringLength : 17
    }
    constructor(props) {
        super(props);
        this.handleTableRowAction = this.handleTableRowAction.bind(this);
    }

    componentDidMount() {
        const { dispatch, dataUrl } = this.props;
        const accessToken = token.getToken();
        dispatch(fetchGet(dataUrl, {}, {
            'x-access-token': accessToken
        }));
    }
    // 更改 分页的样式
    itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <a style={{marginRight:'18px'}}><Icon type="left" /> 上一页</a>;
        } else if (type === 'next') {
            return <a  style={{marginLeft:'10px'}}>下一页 <Icon type="right" /></a>;
        }
        return originalElement;
    }

    handleTableChange = (pagination, filters, sorter) => {
        const { dispatch, dataUrl } = this.props;
        const accessToken = token.getToken();
        dispatch(fetchGet(dataUrl, {page: pagination.current}, {
            'x-access-token': accessToken
        }));
    }

    //处理表格行action
    handleTableRowAction(record, itemIndex, aActionItem) {
        const { dispatch } = this.props;
        dispatch(modalStatusAction({
            id: record.id,
            btnIndex: itemIndex,
            curTab: aActionItem.curTab,
            modalTitle: aActionItem.modalTitle,
            status: true,
            rodam: Math.random(0, 1)
        }));
    }

    //生成表格item action
    generateTableRowActions() {
        let columns = this.props.dataColumn || [], isDivider;
        for (let aColumn of columns) {
            if (aColumn.key === 'action') {
                //item render method
                aColumn['render'] = (text, record, index) => (
                    <span >
                        {
                            aColumn.items.map((aActionItem, itemIndex) => {
                                // 判断是否存在分割线
                                if(aColumn.items.length-1 === itemIndex){
                                    isDivider = <span></span>
                                }else{
                                    isDivider = <Divider type="vertical" />
                                }
                                return (
                                    <span>
                                        <ActionTable key={aActionItem.id} onClick={() => {this.handleTableRowAction(record, itemIndex, aActionItem)}} type={aActionItem.type} text={aActionItem.text} />
                                        { isDivider }
                                    </span>
                                );
                            })
                        }
                    </span>
                );
            }
        }
        return columns;
    }
    
    render() {
        const { reducerKey, needFilter } = this.props;
        const { data } = this.props[reducerKey];
        let tableData = (data && Object.keys(data).length > 0)? data.data: [], pageSize, pageTotal, curPage;
        if(data){
            pageSize = data.num;
            pageTotal = data.count;
            curPage = Number(data.page);
        }
        if (tableData.length > 0) {
            tableData = tableData.map(item => {
                item.key = item.id;
                return item;
            });
        }
        
        if(reducerKey == 'reducerCommList'){
            tableData.forEach((item, index)=>{
                if(item.remark.length > this.state.subStringLength){
                    tableData[index]['remark'] = item.remark.substring(0,this.state.subStringLength) + '...'
                }
                if(item.memo.length > this.state.subStringLength){
                    tableData[index]['memo'] = item.memo.substring(0,this.state.subStringLength) + '...'
                }
            })
        }
        const columns = this.generateTableRowActions();
        return (
            <Table 
                onChange={this.handleTableChange} 
                pagination={{
                    itemRender: this.itemRender,
                    current : curPage,
                    pageSize : pageSize,
                    total : pageTotal
                }} 
                columns={columns}  
                dataSource={tableData}
                />
        )
    }
}

// how to get refer reducer ? to do...
const mapStateToProps = state => {
    const { reducerCustomerList, reducerContactList, reducerCommList } = state;
    return {
        reducerCustomerList,
        reducerContactList,
        reducerCommList
    } || {};
};
export default connect(mapStateToProps)(ConDataTable);