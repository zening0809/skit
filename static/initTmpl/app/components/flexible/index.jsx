import React, { Component, ProTypes } from 'react';
import { Icon } from '../../skit_ui';
import './less/index.less';
import classNames from 'classnames';
class Flexible extends Component {
    static proTypes = {
    }
    static defaultProps = {
        prefixCls: 'flexible'
    };
    constructor(props) {
        super(props)
        this.state = {
            iconType: 'minus-circle',
            isShow: true
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    isShow(e) {
        e.stopPropagation();
        let isShow = this.state.isShow, iconType;
        isShow ? iconType = 'plus-circle' : iconType = 'minus-circle';
        this.setState({
            isShow: !isShow,
            iconType,
        })
    }
    render() {
        const { prefixCls, style, className = '' } = this.props;
        // 判断状态 内容
        const { isShow } = this.state;
        let showContent;
        isShow ? showContent = <div className={`${prefixCls}-content`}>{this.props.children}</div> :
            showContent = <div></div>;
        // 获取传入的样式
        const cls = classNames({
            [`${prefixCls}-container`]: true,
        }, className);
        return (
            <div
                className={cls}
                style={style}
            >
                <div className={`${prefixCls}-header`}>
                    <span className={`${prefixCls}-header-title`} >按条件搜索</span>
                    <Icon type={this.state.iconType} onClick={(e) => {
                        this.isShow(e)
                    }} className={`${prefixCls}-header-icon`} />
                </div>
                {showContent}
            </div>
        )
    }
}
module.exports = Flexible