import * as React from 'react';
import RcPagination from 'rc-pagination';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import Select from '../select';
import MiniSelect from './MiniSelect';


export default class Pagination extends React.Component {
  static defaultProps = {
    prefixCls: 'xxx-pagination',
    selectPrefixCls: 'xxx-select',
  };

  renderPagination = (locale) => {
    const { className, size, ...restProps } = this.props;
    const isSmall = size === 'small';
    return (
      <RcPagination
        {...restProps}
        className={classNames(className, { mini: isSmall })}
        selectComponentClass={isSmall ? MiniSelect : Select}
        locale={locale}
      />
    );
  }

  render() {
    return (
      <LocaleReceiver
        componentName="Pagination"
      >
        {this.renderPagination}
      </LocaleReceiver>
    );
  }
}
