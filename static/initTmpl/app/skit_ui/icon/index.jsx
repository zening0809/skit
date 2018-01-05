import React from 'react';
import classNames from 'classnames';
import  './style/index';



const Icon = (props) => {
  const { type, className = '', spin } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin || type === 'loading',
    [`anticon-${type}`]: true,
  }, className);
  return <i {...props} className={classString} />;
};

export default Icon;
