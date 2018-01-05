import * as React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
import  './style/index';

export { ScrollNumberProps } from './ScrollNumber';


export default class Badge extends React.Component{
  static defaultProps = {
    prefixCls: 'xxx-badge',
    scrollNumberPrefixCls: 'xxx-scroll-number',
    count: null,
    showZero: false,
    dot: false,
    overflowCount: 99,
  };

  static propTypes = {
    count: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    showZero: PropTypes.bool,
    dot: PropTypes.bool,
    overflowCount: PropTypes.number,
  };

  render() {
    const {
      count,
      showZero,
      prefixCls,
      scrollNumberPrefixCls,
      overflowCount,
      className,
      style,
      children,
      dot,
      status,
      text,
      offset,
      ...restProps,
    } = this.props;
    const isDot = dot || status;
    let displayCount = (count) > (overflowCount) ? `${overflowCount}+` : count;
    // dot mode don't need count
    if (isDot) {
      displayCount = '';
    }

    const isZero = displayCount === '0' || displayCount === 0;
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
    const hidden = (isEmpty || (isZero && !showZero)) && !isDot;
    const statusCls = classNames({
      [`${prefixCls}-status-dot`]: !!status,
      [`${prefixCls}-status-${status}`]: !!status,
    });
    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
      [`${prefixCls}-multiple-words`]: count && count.toString && count.toString().length > 1,
      [`${prefixCls}-status-${status}`]: !!status,
    });
    const badgeCls = classNames(className, prefixCls, {
      [`${prefixCls}-status`]: !!status,
      [`${prefixCls}-not-a-wrapper`]: !children,
    });
    const styleWithOffset = offset ? {
      marginTop: offset[0],
      marginLeft: offset[1],
      ...style,
    } : style;
    // <Badge status="success" />
    if (!children && status) {
      return (
        <span className={badgeCls} style={styleWithOffset}>
          <span className={statusCls} />
          <span className={`${prefixCls}-status-text`}>{text}</span>
        </span>
      );
    }

    const scrollNumber = hidden ? null : (
      <ScrollNumber
        prefixCls={scrollNumberPrefixCls}
        data-show={!hidden}
        className={scrollNumberCls}
        count={displayCount}
        title={count}
        style={styleWithOffset}
      />
    );

    const statusText = (hidden || !text) ? null : (
      <span className={`${prefixCls}-status-text`}>{text}</span>
    );

    return (
      <span {...restProps} className={badgeCls}>
        {children}
        <Animate
          component=""
          showProp="data-show"
          transitionName={children ? `${prefixCls}-zoom` : ''}
          transitionAppear
        >
          {scrollNumber}
        </Animate>
        {statusText}
      </span>
    );
  }
}
