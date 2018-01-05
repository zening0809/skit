import React, { Component, ProTypes } from 'react';
import { Row, Col, Button, Icon, Select, Input, Form } from '../skit_ui';
const FormItem = Form.Item;
const Option = Select.Option;

import token from '../utils/token';
import { connect } from 'react-redux';
import { fetchGet } from '../api/common';

class ConSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataForm: [],
            isFilter: true
        }
    }

    componentDidMount() {
        const { dispatch, dataUrl } = this.props;
        const accessToken = token.getToken();
        dispatch(fetchGet(dataUrl, {}, {
            'x-access-token': accessToken
        }));
    }
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps && this.state.isFilter){
            const {  data, dataFilter } = nextProps;
            const dataForm = (data && dataFilter)? dataFilter.filters(data): [];
            this.setState({
                dataForm,
                isFilter: false
            });
        }
    }
    //搜索触发
    handleSearch = (e) => {
        e.preventDefault();
        let { didSearch } = this.props;
        this.props.form.validateFields((err, values) => {
            didSearch(values);
        });
    }

    //重置
    handleReset = (e) => {
        e.preventDefault();
        let { didSearch } = this.props;
        this.props.form.resetFields();
        this.props.form.validateFields((err, values) => {
            didSearch(values);
        });
    }

    //渲染所有搜索项
    getFields(dataForm) {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        dataForm.forEach((item) => {
            let curItem = this.generateItem(item);
            children.push(curItem);
        });
        return children;
    }

    //生成搜索项
    generateItem(item) {
        const { getFieldDecorator } = this.props.form;
        switch (item.type) {
            case 'select':
                return (
                    <Col span={6} key={item.name}>
                        <FormItem
                            {...formItemLayout}
                            label={item.cnName}
                            >
                            {getFieldDecorator(item.viewName)(
                                <Select
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder= {`请选择${item.cnName}`}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        item.data.map((item, index) => {
                                            return (
                                                <Option value={item.id} key={item.id + Math.random(0, 1)}>{item.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                );
                break;
            case 'input':
                return (
                    <Col span={6} key={item.name}>
                        <FormItem
                            {...formItemLayout}
                            label={item.cnName}
                        >
                            {getFieldDecorator(item.viewName)(
                                <Input placeholder= {`请选择${item.cnName}`}/>
                            )}
                        </FormItem>
                    </Col>
                );
                break;
            default:
                return (
                    <div></div>
                );
        }
    }

    render() {
        return (
            <Form
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>
                    {this.getFields(this.state.dataForm)}
                    <Col span={6}>
                        <Button shape="circle" icon="search" htmlType="submit" type="info" style={buttonStyle}></Button>
                        <Button shape="circle" onClick={this.handleReset} icon="close" type="normal" style={buttonStyleClose}></Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    const { reducerSelectList } = state;
    return reducerSelectList || {};
};
export default connect(mapStateToProps)(Form.create()(ConSearchForm));

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        style: { textAlign: 'left' }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};
const gutterCol = {
    display: 'flex',
    justifyContent: 'space-between'
};
const lableContainer = {
    height: '32px',
    lineHeight: '32px',
    fontSize: 14,
    flex: 1
};
const rowContent = {
    flex: 4
};
const buttonStyle = {
    borderRadius: 2,
    fontWeight: 700,
    marginLeft: 20
};
const buttonStyleClose = {
    borderRadius: 2,
    fontWeight: 700,
    marginLeft: 10
};