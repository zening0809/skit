import React, { Component, ProTypes } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Radio, Message } from '../skit_ui';
import { connect } from 'react-redux';
import { fetchSelf, fetchGet } from '../api/common';
import { CUSTOMER_TRANSFER_URL, CUSTOMER_LIST_URL } from '../api/config';
import token from '../utils/token';
import { modalStatusAction } from '../actions';
const FormItem = Form.Item;
const Option = Select.Option;

class ConCustomerRetweet extends React.Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const formState = this.props.reducerModal.curTab;
                const { dispatch } = this.props;
                const curId = this.props.reducerModal.id;
                const accessToken = token.getToken();
                values.id = curId;
                fetchSelf('Post', CUSTOMER_TRANSFER_URL, values, { 'x-access-token': accessToken }).then(res => {
                    if (res.status == 1) {
                        Message.success(res.errmsg);
                        dispatch(modalStatusAction({
                            status: false
                        }));

                        //刷新列表
                        dispatch(fetchGet(CUSTOMER_LIST_URL, {}, {
                            'x-access-token': accessToken
                        }));
                    } else {
                        if (res.data.needLogin) {
                            ClearToken(false, this.context);
                        }
                        Message.error(res.errmsg);
                    }
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const reducerSelectList = this.props.reducerSelectList.data;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" style={formStyle}>
                <FormItem>
                    {getFieldDecorator('target', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="请选择"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                reducerSelectList.marketers.map((item, index) => {
                                    return (
                                        <Option value={item.id} key={item.id}>{
                                            item.name
                                        }</Option>
                                    )
                                })
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem>
                    <Button type="info" htmlType="submit" className="login-form-button">
                        提交
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    const { reducerModal, reducerSelectList } = state;
    return { reducerModal, reducerSelectList } || {};
};

// 创建联系
export default connect(mapStateToProps)(Form.create()(ConCustomerRetweet));

const formStyle = {
    width: '625px',
    paddingLeft: '70px'
}