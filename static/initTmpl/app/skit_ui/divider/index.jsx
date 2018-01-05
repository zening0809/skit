import * as React from 'react';
import classNames from 'classnames';
import  './style/index';

export default function Divider({
  prefixCls = 'xxx',
  type = 'horizontal',
  className,
  children,
  dashed,
  ...restProps,
}) {
  const classString = classNames(
    className, `${prefixCls}-divider`, `${prefixCls}-divider-${type}`, {
    [`${prefixCls}-divider-with-text`]: children,
    [`${prefixCls}-divider-dashed`]: !!dashed,
  });
  return (
    <div className={classString} {...restProps}>
      {children && <span className={`${prefixCls}-divider-inner-text`}>{children}</span>}
    </div>
  );
}
