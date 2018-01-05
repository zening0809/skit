
export const content = function() {
   return {
    order: 0,
    title: "基本按钮",
    type: "按钮类型",
    discribe:"按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。",
    content: 
     <div >
        <Button type="normal" style={{marginTop:12,marginLeft:14}}>DEFAULT</Button>
        <Button ghost type="normal" style={{marginTop:12,marginLeft:14}}>DEFAULT</Button>
        <Button type="primary" style={{marginTop:12,marginLeft:14}}>PRIMARY</Button>
        <Button type="primary" loading style={{marginTop:12,marginLeft:14}}>PRIMARY</Button>
        <Button type="primary" ghost style={{marginTop:12,marginLeft:14}}>PRIMARY</Button>
        <Button  size="large" type="primary" style={{marginTop:12,marginLeft:14}}>PRIMARY</Button>
        <Button  size="small" type="primary" style={{marginTop:12,marginLeft:14}}>PRIMARY</Button>
        <Button type="info" style={{marginTop:12,marginLeft:14}}>INFO</Button>
        <Button type="info" ghost style={{marginTop:12,marginLeft:14}}>INFO</Button>
        <Button shape="circle" icon="search" type="info" style={{marginTop:12,marginLeft:14}}></Button>
        <Button type="danger" style={{marginTop:12,marginLeft:14}}>DANGER</Button>
        <Button type="danger" ghost style={{marginTop:12,marginLeft:14}}>DANGER</Button>
        <Button icon="search" type="ghost" style={{marginTop:12,marginLeft:14}}>GHOST</Button>
        <Button type="success" style={{marginTop:12,marginLeft:14}}>SUCCESS</Button>
        <Button type="success" ghost style={{marginTop:12,marginLeft:14}}>SUCCESS</Button>
        <Button disabled type="success" style={{marginTop:12,marginLeft:14}}>SUCCESS</Button>
        <Button type="dashed" style={{marginTop:12,marginLeft:14}}>SUCCESS</Button>
    </div>
    ,
    contentCode: ""
}
}