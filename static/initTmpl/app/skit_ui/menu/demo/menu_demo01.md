<!-- import React from 'react'
import { Link } from 'react-router'
import './less/index'
import { Avatar, Menu, Icon, Button, Layout, Row, Col } from '../../components';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends React.Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    handleClick = (e) => {
        console.log('click ', e);
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >
                    <Avatar style={userIcon} icon="user" />
                    <div style={userName}>Luis.Lu</div>
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 240 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="book" style={{fontSize:'16px'}}/><span>Components</span></span>}>
                            <MenuItemGroup key="g1" title="Item 1"   >
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup key="g2" title="Item 2">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header-showdow-Bottom" style={{ background: '#fff', padding: 0 }} />
                    <Content >
                        <Row>
                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
                            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
                        </Row>
                    </Content>

                </Layout>
            </Layout>
        );
    }
}
module.exports = App

const userIcon = {
    backgroundColor: '#fff', color: '#ff6e52', width: 100, height: 100, margin: '15px 70px',
    marginTop: '80px',
    borderRadius: '50%', fontSize: 50, lineHeight: '100px'
}
const userName = {
    fontSize: 16,
    marginBottom: '60px',
    color: '#fff',
    textAlign: 'center'
} -->