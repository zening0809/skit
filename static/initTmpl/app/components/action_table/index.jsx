import React, { Component, ProTypes } from 'react';
import { Icon } from '../../skit_ui';
import classNames from 'classnames';
import './less/index.less';

class ActionTable extends Component {
    static proTypes = {
    }
    static defaultProps = {
        prefixCls: 'action-table'
    };

    
    constructor(props) {
        super(props)
        this.state = {
            clicked: false
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    handleClick(e){
        // Add click effect
        this.setState({ clicked: true });
        const onClick = this.props.onClick;
        if (onClick) {
        onClick(e);
        }
    }
    render() {
        const {type, prefixCls, text, style, className = '' } = this.props;
        const cls = classNames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${type}`]: true
        }, className);
        return (
            <span
            className={cls}
            style={style}
            onClick={(e)=>{this.handleClick(e)}}
            >
                <Icon type={type}></Icon>
                <span className={`${prefixCls}-text`}>{text}</span>
            </span>
        )
    }
}
module.exports = ActionTable