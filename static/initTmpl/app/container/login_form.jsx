import React, { Component, ProTypes } from 'react';
import {  push } from 'react-router-redux';
import { Badge, Form, Icon, Input, Button, Message } from '../skit_ui';
import token from '../utils/token';
import { LOGIN_URL } from '../api/config';
import { connect } from 'react-redux';
import { fetchPost } from '../api/common';
// import '../styles/login_form.scss';
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    // static contextTypes = { router: React.PropTypes.object };
    constructor() {
        super();
        this.state = {
            formLayout: 'vertical',
        };
    }
    // 进行提交 发送action
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch(fetchPost(LOGIN_URL, values));
            }
        });
    }
    // 密码验证
    checkPassword = (rule, value, callback) => {
        const curForm = this.props.form;
        if (!value) {
            callback('密码不能为空');
            return;
        }
        callback();
    }
    // 手机号前端验证
    checkPhone = (rule, value, callback) => {
        const curForm = this.props.form;
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
        if (!reg.test(value)) {
            callback('请输入正确的手机号');
            return;
        }
        callback();
    }
    // 数据更改后触发 生命周期
    componentWillReceiveProps(nextProps){
        if(this.props.data !== nextProps.data){
            let { dispatch } = this.props;
            const reducerLogin = nextProps.data;
            if(reducerLogin){
                loginCallBack(nextProps, ()=>{
                    dispatch(push('/home'));
                });
            }
        }
    }
    render() {
        const { formLayout } = this.state;
        const { getFieldDecorator, getFieldsError } = this.props.form;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        } : null;
        const buttonItemLayout = formLayout === 'horizontal' ? {
            wrapperCol: { span: 14, offset: 4 },
        } : null;
        return (
            <div>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="手机号"
                    >
                        {getFieldDecorator('phonenum', {
                            rules: [{
                                validator: this.checkPhone,
                            }]
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                validator: this.checkPassword,
                            }]
                        })(
                            <Input type="password" />
                            )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button disabled={hasErrors(getFieldsError())} style={submitBtn} type="info" htmlType="submit">登录</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

// 封装错误提示方法
const error = (resmsg) => {
    Message.error(resmsg);
};
// 存在错误时登录按钮不可点击
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const mapStateToProps = state => {
    const { reducerLogin } = state;
    return reducerLogin || {};
};
// props更改后登录后的回调
function loginCallBack(res, callback) {
    if (res.status == 1) {
        token.setToken(res.data.access_token);
        Message.success(res.errmsg);
        callback();
        // this.context.router.push(`/home`);
    } else {
        error(res.errmsg);
    }
}

// 创建表单组件
const LoginForm = Form.create()(RegistrationForm);
// 创建联系
export default connect(mapStateToProps)(LoginForm);

// 进行响应式的表格布局
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
            
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

// 设置提交按钮的位置 style
const submitBtn = {
    width: 100,
    height: 36,
    position: 'absolute',
    right: '-159px',
    bottom: '-141px'
}