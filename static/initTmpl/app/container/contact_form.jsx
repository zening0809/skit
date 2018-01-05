import React, { Component, ProTypes } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Radio, Message } from '../skit_ui';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const AutoCompleteOption = AutoComplete.Option;
// 更改拟态框状态
import { modalStatusAction } from '../actions';
import { connect } from 'react-redux';
import { fetchSelf, fetchGet } from '../api/common';
import { CONTACT_ADD_URL, CONTACT_EDIT_URL, CONTACT_LIST_URL } from '../api/config';
import token from '../utils/token';

class ConContactForm extends React.Component {
    state = {
        autoCompleteResult: [],
        value: 1,
    };
    
    static defaultProps = {
        reducerSelectList: {
            typeList: []
        },
    }

    componentDidMount() {
        const formState = this.props.reducerModal.curTab;
        const curId = this.props.reducerModal.id;
        const accessToken = token.getToken();
        if (formState === 'contactAdd') {
            this.props.form.setFields({
            });
        } else if (formState === 'contactEdit' || 'contactView') {
            fetchSelf('GET', CONTACT_EDIT_URL, { id: curId }, { 'x-access-token': accessToken }).then(res => {
                if (res.status == 1) {
                    let curEditObj = {};
                    curEditObj.realname = res.data.realname;
                    curEditObj.customer_id = res.data.customer_id;
                    curEditObj.gender = res.data.gender;
                    curEditObj.department = res.data.department;
                    curEditObj.position = res.data.position;
                    curEditObj.phonenum = res.data.phonenum;
                    curEditObj.email = res.data.email;
                    curEditObj.address = res.data.address;
                    curEditObj.remark = res.data.remark;
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
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        const formState = this.props.reducerModal.curTab;
        const curId = this.props.reducerModal.id;
        const accessToken = token.getToken();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                let _url = '';
                switch (formState) {
                    case 'contactEdit':
                        _url = CONTACT_EDIT_URL;
                        values.id = curId;
                        break;
                    case 'contactAdd':
                        _url = CONTACT_ADD_URL;
                        break;
                    default:
                        break;
                }

                fetchSelf('Post', _url, values, { 'x-access-token': accessToken }).then(res => {
                    if (res.status == 1) {
                        Message.success(res.errmsg);

                        dispatch(modalStatusAction({
                            status: false
                        }));

                        //刷新列表
                        dispatch(fetchGet(CONTACT_LIST_URL, {}, {
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
    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['@163.com', '@qq.com', '@gmail'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    noEdit() {
        Message.warn('不可编辑');
    }
    render() {
        const reducerSelectList = this.props.reducerSelectList.data;
        let isEditView;
        const { getFieldDecorator } = this.props.form;
        const { isEdit } = this.props;
        const { autoCompleteResult } = this.state;

        isEdit ? isEditView = <div></div> : isEditView = <div onClick={this.noEdit} style={noEdit}></div>;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
                style: { textAlign: 'left' }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 4,
                },
            },
        };

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <Form onSubmit={this.handleSubmit} style={formStyle}>
                {isEditView}
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                >
                    {getFieldDecorator('realname', {
                        rules: [{
                            required: true, message: '姓名',
                        }],
                    })(
                        <Input placeholder="姓名" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="客户名称"
                >
                    {getFieldDecorator('customer_id', {
                        rules: [{
                            required: true, message: '请选择',
                        }],
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="请选择"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                reducerSelectList.customers.map((item, index) => {
                                    return (<Option value={item.id} key={item.id}>{item.name}</Option>)
                                })
                            }

                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="性别"
                >
                    {getFieldDecorator('gender', {
                    })(
                        <RadioGroup >
                            <Radio value={1}>先生</Radio>
                            <Radio value={0}>女士</Radio>
                            <Radio value={2}>其他</Radio>
                        </RadioGroup>
                        )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="部门"
                >
                    {getFieldDecorator('department', {
                    })(
                        <Input placeholder="部门" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="职位"
                >
                    {getFieldDecorator('position', {
                    })(
                        <Input placeholder="职位" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                >
                    {getFieldDecorator('phonenum', {
                    })(
                        <Input placeholder="手机号码" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                >
                    {getFieldDecorator('email', {
                    })(
                        <Input placeholder="邮箱" />
                        )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="地址"
                >
                    {getFieldDecorator('address', {
                    })(
                        <Input placeholder="请输入地址" />
                        )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="备注"
                >
                    {getFieldDecorator('remark', {
                    })(
                        <TextArea style={{ resize: "none" }} placeholder="请输入备注" rows={6} />
                        )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="info" htmlType="submit">提交</Button>
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
export default connect(mapStateToProps)(Form.create()(ConContactForm));

const noEdit = {
    width: '88%',
    height: '92%',
    position: 'absolute',
    zIndex: '100'
};
const formStyle = {
    width:"620px",
    paddingLeft:"70px"
}