import  './style/index';
import Button from './button';
import ButtonGroup from './button-group';

export { ButtonProps, ButtonShape, ButtonSize, ButtonType } from './button';
export { ButtonGroupProps } from './button-group';

Button.Group = ButtonGroup;
export default Button;





// 测试例子
// <div >
// <Button onClick={console.log('success')} type="normal" style={{marginTop:12,marginLeft:14}}>DEFAULT</Button>
// <Button ghost type="normal" style={{marginTop:12,marginLeft:14}}>DEFAULT</Button>
// <Button type="primary" style={{marginTop:12,marginLeft:14}}>PRIMARY</Button>
// <Button type="primary" loading style={{marginTop:12,marginLeft:14}}>PRIMARY</Button>
// <Button type="primary" ghost style={{marginTop:12,marginLeft:14}}>PRIMARY</Button>
// <Button  size="large" type="primary" style={{marginTop:12,marginLeft:14}}>PRIMARY</Button>
// <Button  size="small" type="primary" style={{marginTop:12,marginLeft:14}}>PRIMARY</Button>
// <Button type="info" style={{marginTop:12,marginLeft:14}}>INFO</Button>
// <Button type="info" ghost style={{marginTop:12,marginLeft:14}}>INFO</Button>
// <Button shape="circle" icon="search" type="info" style={{marginTop:12,marginLeft:14}}></Button>
// <Button type="danger" style={{marginTop:12,marginLeft:14}}>DANGER</Button>
// <Button type="danger" ghost style={{marginTop:12,marginLeft:14}}>DANGER</Button>
// <Button icon="search" type="ghost" style={{marginTop:12,marginLeft:14}}>GHOST</Button>
// <Button type="success" style={{marginTop:12,marginLeft:14}}>SUCCESS</Button>
// <Button type="success" ghost style={{marginTop:12,marginLeft:14}}>SUCCESS</Button>
// <Button disabled type="success" style={{marginTop:12,marginLeft:14}}>SUCCESS</Button>
// <Button type="dashed" style={{marginTop:12,marginLeft:14}}>SUCCESS</Button>
// </div>


