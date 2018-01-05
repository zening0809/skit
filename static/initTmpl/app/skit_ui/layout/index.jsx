import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import sideList from './Sider';
import './style/index';

function generator(props) {
    return (BasicComponent) => {
        return class Adapter extends React.Component {
            render() {
                const { prefixCls } = props;
                return <BasicComponent prefixCls={prefixCls} {...this.props} />;
            }
        };
    };
}

class Basic extends React.Component {
    render() {
        const { prefixCls, className, children, ...others } = this.props;
        const divCls = classNames(className, prefixCls);
        return (
            <div className={divCls} {...others}>{children}</div>
        );
    }
}

class BasicLayout extends React.Component {
    static childContextTypes = {
        siderHook: PropTypes.object,
    };
    state = { siders: [] };

    getChildContext() {
        return {
            siderHook: {
                addSider: (id) => {
                    this.setState({
                        siders: [...this.state.siders, id],
                    });
                },
                removeSider: (id) => {
                    this.setState({
                        siders: this.state.siders.filter(currentId => currentId !== id),
                    });
                },
            },
        };
    }

    render() {
        const { prefixCls, className, children, ...others } = this.props;
        const divCls = classNames(className, prefixCls, {
            [`${prefixCls}-has-sider`]: this.state.siders.length > 0,
        });
        return (
            <div className={divCls} {...others}>{children}</div>
        );
    }
}

const Layout = generator({
    prefixCls: 'xxx-layout',
})(BasicLayout);

const Header = generator({
    prefixCls: 'xxx-layout-header',
})(Basic);

const Footer = generator({
    prefixCls: 'xxx-layout-footer',
})(Basic);

const Content = generator({
    prefixCls: 'xxx-layout-content',
})(Basic);


Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = sideList;

export default Layout;


// <div style={{ width: '100%', height: '100%', display: "flex" }}>
//     <Layout>
//         <Sider
//             breakpoint="lg"
//             collapsedWidth="0"
//             onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
//         >Sider</Sider>
//         <Layout>
//             <Header>Header</Header>
//             <Content>Content</Content>
//             <Footer>Footer</Footer>
//         </Layout>
//     </Layout>
// </div>