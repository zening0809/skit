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
import { CUSTOMER_LIST_URL, CUSTOMER_ADD_URL, CUSTOMER_EDIT_URL } from '../api/config';
import token from '../utils/token';

class ConCustomerEditForm extends React.Component {
    state = {
        autoCompleteResult: [],
        value: 1,
    };
    
    static defaultProps = {
        reducerSelectList: {
            groupList: [],
            customerTypes: []
        },
    }

    componentDidMount() {
        const formState = this.props.reducerModal.curTab;
        const curId = this.props.reducerModal.id;
        const accessToken = token.getToken();

        if (formState === 'customerAdd') {
            this.props.form.setFields({
            });
        } else if (formState === 'customerEdit') {
            fetchSelf('GET', CUSTOMER_EDIT_URL, { id: curId }, { 'x-access-token': accessToken }).then(res => {
                if (res.status == 1) {
                    let curEditObj = {};
                    curEditObj.name = res.data.name;
                    curEditObj.type = res.data.type;
                    curEditObj.attribute = res.data.attribute;
                    curEditObj.address = res.data.address;
                    curEditObj.status = res.data.status;
                    curEditObj.desc = res.data.desc;
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
                    case 'customerEdit':
                        _url = CUSTOMER_EDIT_URL;
                        values.id = curId;
                        break;
                    case 'customerAdd':
                        _url = CUSTOMER_ADD_URL;
                        break;
                    default:
                        break;
                }
                fetchSelf('Post', _url, values, { 'x-access-token': accessToken }).then(res => {
                    if (res.status == 1) {
                        Message.success(res.errmsg);

                        //关闭弹窗
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
        const { groupList, customerTypes } = reducerSelectList;
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
                {isEdit}
                <FormItem
                    {...formItemLayout}
                    label="客户名称"
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入客户名称',
                        }],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="行业"
                >
                    {getFieldDecorator('type', {
                        rules: [{
                            required: true, message: '请选择行业',
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
                                groupList.map((item, index) => {
                                    return (<Option value={item.id} key={item.id}>{item.name}</Option>)
                                })
                            }

                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="客户级别"
                >
                    {getFieldDecorator('attribute', {
                        rules: [{
                            required: true, message: '请选择客户级别',
                        }],
                    })(
                        <Select
                            style={{ width: '100%' }}
                            showSearch
                            placeholder="请选择"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                customerTypes.map((item, index) => {
                                    return (<Option value={item} key={item}>{item}</Option>)
                                })
                            }
                        </Select>
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
                    label="状态"
                >
                    {getFieldDecorator('status', {
                    })(
                        <RadioGroup >
                            <Radio value={1}>有效</Radio>
                            <Radio value={0}>无效</Radio>
                        </RadioGroup>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="备注"
                >
                    {getFieldDecorator('desc', {
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
export default connect(mapStateToProps)(Form.create()(ConCustomerEditForm));

const noEdit = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: '100'
};
const formStyle = {
    width:"620px",
    paddingLeft:"70px"
}