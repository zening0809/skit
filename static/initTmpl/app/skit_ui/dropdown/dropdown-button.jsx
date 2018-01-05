import * as React from 'react';
import Button from '../button';
import { ButtonGroupProps } from '../button/button-group';
import Icon from '../icon';
import Dropdown, { DropDownProps } from './dropdown';
import classNames from 'classnames';
const ButtonGroup = Button.Group;


export default class DropdownButton extends React.Component{
  static defaultProps = {
    placement: 'bottomRight',
    type: 'default',
    prefixCls: 'xxx-dropdown-button',
  };

  render() {
    const {
      type, disabled, onClick, children,
      prefixCls, className, overlay, trigger, align,
      visible, onVisibleChange, placement, getPopupContainer,
      ...restProps,
    } = this.props;

    const dropdownProps = {
      align,
      overlay,
      trigger: disabled ? [] : trigger,
      onVisibleChange,
      placement,
      getPopupContainer,
    };
    if ('visible' in this.props) {
      (dropdownProps).visible = visible;
    }

    return (
      <ButtonGroup
        {...restProps}
        className={classNames(prefixCls, className)}
      >
        <Button
          type={type}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </Button>
        <Dropdown {...dropdownProps}>
          <Button type={type} disabled={disabled}>
            <Icon type="down" />
          </Button>
        </Dropdown>
      </ButtonGroup>
    );
  }
}
