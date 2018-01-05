
import React from 'react';
import { Children, cloneElement } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


export default class Row extends React.Component{
    static defaultProps = {
        gutter: 0,
    };

    static propTypes = {
        type: PropTypes.string,
        align: PropTypes.string,
        justify: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node,
        gutter: PropTypes.number,
        prefixCls: PropTypes.string,
    };
    render() {
        const { type, justify, align, className, gutter, style, children,
            prefixCls = 'xxx-row', ...others } = this.props;
        const classes = classNames({
            [prefixCls]: !type,
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${type}-${justify}`]: type && justify,
            [`${prefixCls}-${type}-${align}`]: type && align,
        }, className);
        const rowStyle = (gutter) > 0 ? {
            marginLeft: (gutter) / -2,
            marginRight: (gutter) / -2,
            ...style,
        } : style;
        const cols = Children.map(children, (col) => {
            if (!col) {
                return null;
            }
            if (col.props && (gutter) > 0) {
                return cloneElement(col, {
                    style: {
                        paddingLeft: (gutter) / 2,
                        paddingRight: (gutter) / 2,
                        ...col.props.style,
                    },
                });
            }
            return col;
        });
        return <div {...others} className={classes} style={rowStyle}>{cols}</div>;
    }
}
