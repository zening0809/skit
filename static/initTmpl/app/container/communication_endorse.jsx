import React, { Component, ProTypes } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Radio, Message } from '../skit_ui';
// 弹出层依赖项
import { modalStatusAction } from '../actions';
import { connect } from 'react-redux';
import { fetchSelf, fetchGet } from '../api/common';
import { COMM_FEEDBACK_URL, COMM_EDIT_URL, COMM_LIST_URL } from '../api/config';
import token from '../utils/token';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class ConCommunicationEndorse extends React.Component {

    componentDidMount() {
        const formState = this.props.reducerModal.curTab;
        const curId = this.props.reducerModal.id;
        const accessToken = token.getToken();

        fetchSelf('GET', COMM_EDIT_URL, { id: curId }, { 'x-access-token': accessToken }).then(res => {

            if (res.status == 1) {
                // 获取当前元素字段 进行渲染 表格
                let curEditObj = {};
                curEditObj.memo = res.data.memo;
                this.props.form.setFieldsValue(
                    curEditObj
                );
            } else {
                if (res.data.needLogin) {
                    ClearToken(false, this.context);
                }
                Message.error(res.errmsg);
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;
        const formState = this.props.reducerModal.curTab;
        const curId = this.props.reducerModal.id;
        const accessToken = token.getToken();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.id = curId;
                fetchSelf('POST', COMM_FEEDBACK_URL, values, { 'x-access-token': accessToken }).then(res => {
                    if (res.status == 1) {
                        Message.success(res.errmsg);
                        dispatch(modalStatusAction({
                            status: false
                        }));

                        //刷新列表
                        dispatch(fetchGet(COMM_LIST_URL, {}, {
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
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" style={formStyle}>
                <FormItem>
                    {getFieldDecorator('memo', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <TextArea style={{ resize: "none" }} placeholder="请输入沟通记录" rows={6} />
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
export default connect(mapStateToProps)(Form.create()(ConCommunicationEndorse));

const formStyle = {
    width: '636px',
    paddingLeft: '66px'
}