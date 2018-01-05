import React, { Component, ProTypes } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Radio, Message, DatePicker } from '../skit_ui';
import moment from 'moment';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;

// 更改拟态框状态
import { modalStatusAction } from '../actions';
import { connect } from 'react-redux';
import { fetchSelf, fetchGet } from '../api/common';
import { COMM_ADD_URL, COMM_EDIT_URL, COMM_LIST_URL, COMM_SELECT_URL } from '../api/config';
import token from '../utils/token';

class ConCommunicationForm extends React.Component {
    state = {
        comm_time: '',
        commSelect: [],
        commConcatSelect: []
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
        // 请求列表数据
        fetchSelf('GET', COMM_SELECT_URL, {} , { 'x-access-token': accessToken }).then(res => {
            if (res.status == 1) {
                // Message.success(res.errmsg);
                this.setState({
                    commSelect : res.data
                });

                if (formState === 'communicationAdd') {
                    this.props.form.setFields({
                    });
                } else if (formState === 'communicationEdit' || 'communicationView') {
                    fetchSelf('GET', COMM_EDIT_URL, { id: curId }, { 'x-access-token': accessToken }).then(res => {
                        if (res.status == 1) {
                            // 获取当前元素字段 进行渲染 表格
                            let curEditObj = {};
                            curEditObj.customer_id = res.data.customer_id;
                            curEditObj.contacts_id = res.data.contacts_id?res.data.contacts_id:'all';
                            // 循环获取联动的初始化选择项
                            this.state.commSelect.forEach((selectItem, selectIndex)=>{
                                if(curEditObj.customer_id === selectItem.id){
                                    this.setState({
                                        commConcatSelect: selectItem.list
                                    })
                                    return;
                                }
                            })
                            this.setState({
                               comm_time : moment(res.data.comm_time, 'YYYY-MM-DD')
                            })
                            curEditObj.comm_type = res.data.comm_type;
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
            // 对时间的特殊处理
            values.comm_time =  values.comm_time.format('YYYY-MM-DD');
            if (!err) {
                let _url = '';
                switch (formState) {
                    case 'communicationEdit':
                        _url = COMM_EDIT_URL;
                        values.id = curId;
                        break;
                    case 'communicationAdd':
                        _url = COMM_ADD_URL;
                        break;
                    default:
                        break;
                }

                fetchSelf('POST', _url, values, { 'x-access-token': accessToken }).then(res => {
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
    noEdit() {
        Message.warn('不可编辑');
    }
    handleChange (value){
        let { commSelect } = this.state;
        let curIndex, combinedSelect;
        commSelect.forEach((item, index)=>{
            if( item.id === value){
                curIndex = index;
                return;
            }
        });
        combinedSelect = commSelect[curIndex]['list'];
        this.setState({
            commConcatSelect: combinedSelect
        })
    }
    render() {
        const reducerSelectList = this.props.reducerSelectList.data;
        let isEditView;
        const { getFieldDecorator } = this.props.form;
        const { isEdit } = this.props;

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
      
        return (
            <Form onSubmit={this.handleSubmit} style={formStyle}>
                {isEditView}
                <FormItem
                    {...formItemLayout}
                    label="客户名称"
                >
                    {getFieldDecorator('customer_id', {
                        rules: [{
                            required: true, message: '客户名称',
                        }],
                    })(
                        <Select
                            showSearch
                            onChange={this.handleChange.bind(this)}
                            style={{ width: '100%' }}
                            placeholder="请选择"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                    this.state.commSelect.map((item, index) => {
                                        return (<Option value={item.id} key={item.id}>{item.name}</Option>)
                                    })
                            }

                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="联系人名称"
                >
                    {getFieldDecorator('contacts_id', {
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
                                this.state.commConcatSelect.map((item, index) => {
                                    return (<Option value={item.id} key={item.id}>{item.name}</Option>)
                                })
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="沟通时间"
                >
                    {getFieldDecorator('comm_time', {
                        rules: [{
                            type: 'object', required: true, message: '沟通时间',
                        }],
                        initialValue: this.state.comm_time
                    })(
                        <DatePicker
                            placeholder="Select Time"
                            style={{ width: "100%" }}
                        />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="沟通方式"
                >
                    {getFieldDecorator('comm_type', {
                        rules: [{
                            required: true, message: '沟通方式',
                        }]
                    })(
                        <RadioGroup >
                            <Radio value={0}>电话</Radio>
                            <Radio value={1}>微信</Radio>
                            <Radio value={2}>见面</Radio>
                        </RadioGroup>
                        )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="沟通记录"
                >
                    {getFieldDecorator('remark', {
                        rules: [{
                            required: true, message: '沟通记录',
                        }]
                    })(
                        <TextArea style={{ resize: "none" }} placeholder="请输入沟通记录" rows={6} />
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
export default connect(mapStateToProps)(Form.create()(ConCommunicationForm));

const noEdit = {
    width: '88%',
    height: '89%',
    position: 'absolute',
    zIndex: '100'
};
const formStyle = {
    width:"620px",
    paddingLeft:"70px"
}