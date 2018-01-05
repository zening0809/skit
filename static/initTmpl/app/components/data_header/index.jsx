import React, { Component, ProTypes } from 'react';
import { Badge } from '../../skit_ui';
import  './less/index';

// 顶部样式
class DataHeader extends Component {
    static proTypes = {
    }
    static defaultProps = {
    }
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div className="dataHeaderContainer">
                <div className="dataHeaderTitle">数据化运营中心
                    <div className="dataHeaderVersion"><span>1.5</span></div>
                </div>
            </div>
        )
    }
}
module.exports = DataHeader