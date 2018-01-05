import * as React from 'react';
import PropTypes from 'prop-types';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import  './style/index';


const SelectPropTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['default', 'large', 'small']),
  combobox: PropTypes.bool,
  notFoundContent: PropTypes.any,
  showSearch: PropTypes.bool,
  optionLabelProp: PropTypes.string,
  transitionName: PropTypes.string,
  choiceTransitionName: PropTypes.string,
};

// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };

export default class Select extends React.Component {
  static Option = Option;
  static OptGroup = OptGroup;

  static defaultProps = {
    prefixCls: 'xxx-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
  };

  static propTypes = SelectPropTypes;

  focus() {
    this.rcSelect.focus();
  }

  blur() {
    this.rcSelect.blur();
  }

  saveSelect = (node) => {
    this.rcSelect = node;
  }

  renderSelect = (locale) => {
    const {
      prefixCls,
      className = '',
      size,
      mode,
      ...restProps,
    } = this.props;
    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    }, className);

    let { notFoundContent, optionLabelProp } = this.props;
    const isCombobox = mode === 'combobox';
    if (isCombobox) {
      // children 带 dom 结构时，无法填入输入框
      optionLabelProp = optionLabelProp || 'value';
    }

    const modeConfig = {
      multiple: mode === 'multiple',
      tags: mode === 'tags',
      combobox: isCombobox,
    };

    const notFoundContentLocale = isCombobox ?
      null : notFoundContent || locale.notFoundContent;
    return (
      <RcSelect
        {...restProps}
        {...modeConfig}
        prefixCls={prefixCls}
        className={cls}
        optionLabelProp={optionLabelProp || 'children'}
        notFoundContent={notFoundContentLocale}
        ref={this.saveSelect}
      />
    );
  }

  render() {
    return (
      <LocaleReceiver
        componentName="Select"
        defaultLocale={defaultLocale.Select}
      >
        {this.renderSelect}
      </LocaleReceiver>
    );
  }
}
