import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import shallowEqual from 'shallowequal';
import CheckboxGroup, { CheckboxGroupContext } from './Group';


export default class Checkbox extends React.Component {
  static Group;
  static defaultProps = {
    prefixCls: 'xxx-checkbox',
    indeterminate: false,
  };

  static contextTypes = {
    checkboxGroup: PropTypes.any,
  };


  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
  }

  focus() {
    this.rcCheckbox.focus();
  }

  blur() {
    this.rcCheckbox.blur();
  }

  saveCheckbox = (node) => {
    this.rcCheckbox = node;
  }

  render() {
    const { props, context } = this;
    const {
      prefixCls,
      className,
      children,
      indeterminate,
      style,
      onMouseEnter,
      onMouseLeave,
      ...restProps,
    } = props;
    const { checkboxGroup } = context;
    let checkboxProps = { ...restProps };
    if (checkboxGroup) {
      checkboxProps.onChange = () => checkboxGroup.toggleOption({ label: children, value: props.value });
      checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
      checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
    }
    const classString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
    });
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate,
    });
    return (
      <label
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RcCheckbox
          {...checkboxProps}
          prefixCls={prefixCls}
          className={checkboxClass}
          ref={this.saveCheckbox}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
