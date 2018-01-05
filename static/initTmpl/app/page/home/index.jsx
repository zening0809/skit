import './less/index.less';
import React from 'react'
import { Avatar, Menu, Icon, Button, Layout, Row, Col, Tabs, Table, Divider, Dropdown, Modal } from '../../skit_ui';
import DataHeader from '../../components/data_header';
import ModSearchSheet from '../../module/search_sheet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { TabCustomer, TabContact, TabCommunication } from '../../config';
// 引入遮罩层
import ConModal from '../../container/modal';
import token from '../../utils/token';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

class Home extends React.Component {
    // static contextTypes = { router: React.PropTypes.object };
    constructor(props){
        super(props);
        this.state = {
            menu: <Menu>
                <Menu.Item key="0">
                    <div onClick={this.signOut}>退出</div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1" disabled><Icon type="user" />  个人中心  </Menu.Item>
            </Menu>,
            dataList: {},
            collapsed: false,
            curComponent: '',
            menuWrap: 240,
            userIcon: userIcon    
        };
    }
    componentDidMount() {
        let isToken = token.getToken(),
        { dispatch } = this.props;
        if(!isToken){
            dispatch(push('/'));
        }
    }
    // 点击左侧栏更换路由
    handleClick = ({ item, key, keyPath }) => {
        this.props.dispatch(push('/home'));
    }
    // 退出登录
    signOut = () => {
        token.clearToken();
        this.props.dispatch(push('/'));
    }

    toggleCollapsed = () => {
        if(this.state.collapsed){
            this.setState({
                collapsed: !this.state.collapsed,
                menuWrap: 240,
                userIcon: userIcon
            }); 
        }else{
            this.setState({
                collapsed: !this.state.collapsed,
                menuWrap: 0,
                userIcon: userIcon
            }); 
        }
    }
    render() {
        const menuWrap = this.state.menuWrap;
        return (
            <Layout style={{ height: '100vh' }}>
                <Header className="header-showdow-Bottom" style={{ background: '#fff', padding: 0, display:'flex', justifyContent: 'space-between'}} >
                    <DataHeader />
                    <Dropdown overlay={this.state.menu}>
                        <Icon className="home-dropdown-out" type="setting" />
                    </Dropdown>
                    <Button type="primary" onClick={this.toggleCollapsed} style={ trigerBtn }>
                                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                </Header>
                <Layout >
                        <Sider width={menuWrap} style={{ background: "#ff6e52" }}>
                                <Avatar style={this.state.userIcon} icon="user" />
                                <div style={userName}>Luis.Lu</div>
                               
                                <Menu
                                defaultSelectedKeys={['customer']}
                                defaultOpenKeys={['customer']}
                                mode="inline"
                                theme="dark"
                                inlineCollapsed={this.state.collapsed}
                                >
                                <Menu.Item key="customer">
                                    <Icon type="pie-chart" />
                                    <span>客户管理</span>
                                </Menu.Item>
                                </Menu>
                        </Sider>
                    <Content style={homeContent}>
                        <ConModal />
                        <Tabs defaultActiveKey="customer" onChange={(key) => {
                        }}>
                            <TabPane tab="客户" key="customer">
                                <ModSearchSheet dataConfig={TabCustomer}/>
                            </TabPane>
                            <TabPane tab="联系人" key="contact">
                                <ModSearchSheet dataConfig={TabContact}/>
                            </TabPane>
                            <TabPane tab="沟通记录" key="conmunication">
                                <ModSearchSheet dataConfig={TabCommunication}/>
                            </TabPane>
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default connect()(Home);
const userIcon = {
    backgroundColor: '#fff', color: '#ff6e52', width: 76, height: 76, margin: '15px 82px',
    marginTop: '80px',
    borderRadius: '50%', fontSize: 50, lineHeight: '76px'
}
const userIconSm = {
    backgroundColor: '#fff', color: '#ff6e52', width: 30, height: 30,
    margin: '80px 25px 30px',
    borderRadius: '50%', fontSize: 16, lineHeight: '30px'
}
const userName = {
    fontSize: 16,
    marginBottom: '60px',
    color: '#fff',
    textAlign: 'center'
}
const homeContent = {
    padding: '16px',
    overflow: 'auto'
}
const trigerBtn = {
    marginBottom: '16px',
    position: 'absolute',
    zIndex: '100',
    left: '195px',
    top: '19px',
    background: 'transparent',
    border: 'none'
}

