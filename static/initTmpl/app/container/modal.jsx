import React, { Component, ProTypes } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Row, Col, Tabs, Divider, Modal, Message } from '../skit_ui';
// Customer
import ConCustomerEditForm from './customer_edit_form';
import ConCustomerRetweetForm from './customer_retweet_form';
// Contact
import ConContactForm from './contact_form';
// Communication
import ConCommunicationForm from './communication_form';
import ConCommunicationEndorse from './communication_endorse';
import { ConCustomerEditFormAction } from '../actions';

class ConModal extends Component {
    static proTypes = {
    }
    static defaultProps = {
        reducerModal: {}
    }
    state = {
        curComponent: <div></div>
    }
    constructor(props) {
        super(props)
        this.state = {
            visible:false,
            modalTitle:''
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
        const { dispatch, status, modalTitle } = nextProps;
        this.setState({
            visible: status,
            modalTitle: modalTitle,
            curComponent: <div></div>
        });
        switch (nextProps.curTab) {
            // customer
            case 'customerEdit':
                this.setState({
                    curComponent: <ConCustomerEditForm />
                })
                break;
            case 'customerAdd':
                this.setState({
                    curComponent: <ConCustomerEditForm />
                })
                break;
            case 'customerRetweet':
                this.setState({
                    curComponent: <ConCustomerRetweetForm/>
                })
                break;
            // contact
            case 'contactAdd':
                this.setState({
                    curComponent: <ConContactForm isEdit={true}/>
                })
                break;
            case 'contactEdit':
                this.setState({
                    curComponent: <ConContactForm isEdit={true}/>
                })
                break;
            case 'contactView':
                this.setState({
                    curComponent: <ConContactForm isEdit={false}/>
                })
                break;
            // communication
            case 'communicationAdd':
                this.setState({
                    curComponent: <ConCommunicationForm isEdit={true}/>
                })
                break;
            case 'communicationEdit':
                this.setState({
                    curComponent: <ConCommunicationForm isEdit={true}/>
                })
                break;
            case 'communicationView':
                this.setState({
                    curComponent: <ConCommunicationForm isEdit={false}/>
                })
                break;
            case 'communicationEndorse':
                this.setState({
                    curComponent: <ConCommunicationEndorse />
                })
                break;
            default:
                break;
        }
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
            curComponent: <div></div>
        });
    }
    render() {
        return (
            <Modal
                title= {this.state.modalTitle}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={740}
                footer={null}
            >
                {
                    this.state.curComponent
                }
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    const { reducerModal } = state;
    return reducerModal || {};
};
// 创建联系
export default connect(mapStateToProps)(ConModal);
