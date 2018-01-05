import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class InputElement extends React.Component {

  focus = () => {
    this.ele.focus ? this.ele.focus() : (ReactDOM.findDOMNode(this.ele)).focus();
  }
  blur = () => {
    this.ele.blur ? this.ele.blur() : (ReactDOM.findDOMNode(this.ele)).blur();
  }
  saveRef = (ele) => {
    this.ele = ele;
    const { ref: childRef } = this.props.children;
    if (typeof childRef === 'function') {
      childRef(ele);
    }
  }
  render() {
    return React.cloneElement(this.props.children, {
      ...this.props,
      ref: this.saveRef,
    }, null);
  }
}
