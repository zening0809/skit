import * as React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';
import Icon from '../icon';
import Button from '../button';


export default class Search extends React.Component {
  static defaultProps = {
    inputPrefixCls: 'xxx-input',
    prefixCls: 'xxx-input-search',
    enterButton: false,
  };

  onSearch = () => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(this.input.input.value);
    }
    this.input.focus();
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  saveInput = (node) => {
    this.input = node;
  }

  render() {
    const { className, prefixCls, inputPrefixCls, size, enterButton, suffix, ...others } = this.props;
    delete (others).onSearch;
    const buttonOrIcon = enterButton
      ? (
        <Button
          className={`${prefixCls}-button`}
          type="primary"
          size={size}
          onClick={this.onSearch}
          key="enterButton"
        >
          {enterButton === true ? <Icon type="search" /> : enterButton}
        </Button>
      ) : <Icon className={`${prefixCls}-icon`} type="search" key="searchIcon" />;
    const searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
    const inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-enter-button`]: !!enterButton,
      [`${prefixCls}-${size}`]: !!size,
    });
    return (
      <Input
        onPressEnter={this.onSearch}
        {...others}
        size={size}
        className={inputClassName}
        prefixCls={inputPrefixCls}
        suffix={searchSuffix}
        ref={this.saveInput}
      />
    );
  }
}
