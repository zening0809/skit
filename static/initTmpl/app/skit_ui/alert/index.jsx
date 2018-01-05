

import React from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon from '../icon';
import classNames from 'classnames';
import './style/index';

function noop() { }


export default class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closing: true,
            closed: false,
        };
    }
    handleClose = (e) => {
        e.preventDefault();
        let dom = ReactDOM.findDOMNode(this);
        dom.style.height = `${dom.offsetHeight}px`;
        // Magic code
        // 重复一次后才能正确设置 height
        dom.style.height = `${dom.offsetHeight}px`;

        this.setState({
            closing: false,
        });
        (this.props.onClose || noop)(e);
    }
    animationEnd = () => {
        this.setState({
            closed: true,
            closing: true,
        });
    }
    render() {
        let {
      closable, description, type, prefixCls = 'xxx-alert', message, closeText, showIcon, banner,
            className = '', style,
    } = this.props;

        // banner模式默认有 Icon
        showIcon = banner && showIcon === undefined ? true : showIcon;
        // banner模式默认为警告
        type = banner && type === undefined ? 'warning' : type || 'info';

        let iconType = '';
        switch (type) {
            case 'success':
                iconType = 'check';
                break;
            case 'info':
                iconType = 'info-circle-o';
                break;
            case 'error':
                iconType = 'exclamation-circle-o';
                break;
            case 'warning':
                iconType = 'warning';
                break;
            default:
                iconType = 'default';
        }
        // // use outline icon in alert with description
        // if (!!description) {
        //     iconType += '-o';
        // }

        let alertCls = classNames(prefixCls, {
            [`${prefixCls}-${type}`]: true,
            [`${prefixCls}-close`]: !this.state.closing,
            [`${prefixCls}-with-description`]: !!description,
            [`${prefixCls}-no-icon`]: !showIcon,
            [`${prefixCls}-banner`]: !!banner,
        }, className);

        // closeable when closeText is assigned
        if (closeText) {
            closable = true;
        }

        const closeIcon = closable ? (
            <a onClick={this.handleClose} className={`${prefixCls}-close-icon`}>
                {closeText || <Icon type="cross" />}
            </a>
        ) : null;

        return this.state.closed ? null : (
            <Animate
                component=""
                showProp="data-show"
                transitionName={`${prefixCls}-slide-up`}
                onEnd={this.animationEnd}
            >
                <div data-show={this.state.closing} className={alertCls} style={style}>
                    {showIcon ? <Icon className={`${prefixCls}-icon`} type={iconType} /> : null}
                    <span className={`${prefixCls}-message`}>{message}</span>
                    <span className={`${prefixCls}-description`}>{description}</span>
                    {closeIcon}
                </div>
            </Animate>
        );
    }
}



// <Alert message="Success Text" type="success"
// closable
// onClose={this.onClose}
// showIcon
// />
// <Alert message="Success Text" type="info"
// closable
// onClose={this.onClose}
// style={{ marginTop: 8 }}
// showIcon
// />
// <Alert message="Success Text" type="warning"
// closable
// onClose={this.onClose}
// style={{ marginTop: 8 }}
// showIcon
// />
// <Alert message="Success Text" type="error"
// closable
// onClose={this.onClose}
// style={{ marginTop: 8 }}
// showIcon
// />
// <Row style={{ display: 'flex', flexFlow: 'wrap' }}>
// <Alert
//     showIcon
//     message="success tips"
//     description="Detailed description and advices about successful copywriting."
//     type="success"
//     closable
//     style={{ marginTop: '15px' }}
// />
// <Alert
//     showIcon
//     message="success tips"
//     description="Detailed description and advices about successful copywriting."
//     type="warning"
//     closable
//     style={{ marginTop: '15px', marginLeft: '30px' }}
// />
// <Alert
//     showIcon
//     message="success tips"
//     description="Detailed description and advices about successful copywriting."
//     type="info"
//     closable
//     style={{ marginTop: '15px', marginLeft: '30px' }}
// />
// <Alert
//     showIcon
//     message="success tips"
//     description="Detailed description and advices about successful copywriting."
//     type="error"
//     closable
//     style={{ marginTop: '15px' }}
// />
// </Row>