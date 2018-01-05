import React, { Component } from 'react';
import { Button, Message } from '../skit_ui';
import { connect } from 'react-redux';
import { fetchGet, fetchSelf } from '../api/common';
import { CUSTOMER_EXPORT_URL, CONTACT_EXPORT_URL, COMM_EXPORT_URL } from '../api/config';
import { modalStatusAction } from '../actions';
import token from '../utils/token';

class ConButtonBar extends Component {

    handleSheetButtonBar(curBtn) {
        const { dispatch } = this.props;
        const accessToken = token.getToken();
        if (curBtn.id == 0) {
            dispatch(modalStatusAction({
                curTab: curBtn.curTab,
                status: true,
                modalTitle: curBtn.modalTitle, 
                rodam: Math.random(0, 1)
            }));
        } else if (curBtn.id == 1) {
            let exportUrl = '';
            switch (curBtn.curTab) {
                case 'customerExport':
                    exportUrl = CUSTOMER_EXPORT_URL;
                    break;
                case 'contactExport':
                    exportUrl = CONTACT_EXPORT_URL;
                    break;
                case 'communicationExport':
                    exportUrl = COMM_EXPORT_URL;
                    break;
                default:
                    break;
            }
            fetchSelf('POST', exportUrl, {}, {
                'x-access-token': accessToken
            }).then(res => {
                if (res.status == 1 && res.data && res.data.referer) {
                    // window.location.href = res.data.referer;
                    window.location.href = `${res.data.referer}&accessToken=${accessToken}`;
                } else {
                    Message.error(res.errmsg || '导出失败');
                }
            });
        }
    }

    render() {
        if (!this.props.list || this.props.list.length == 0) {
            return (
                <div></div>
            );
        } else {
            return (
                <div style={homeBtnContainer}>
                {
                    this.props.list.map(item => {
                        return (
                            <Button
                                key={item.id}
                                onClick={()=>{
                                    this.handleSheetButtonBar(item);
                                }}
                                icon={item.icon}
                                type={item.type}
                                style={item.style}>
                                {item.title}
                            </Button>
                        );
                    })
                }
                </div>
            );
        }
    }
}

export default connect()(ConButtonBar);

const homeBtnContainer = {
    height: '60px',
    background: '#fff',
    lineHeight: '60px',
    paddingLeft: '0px'
};
