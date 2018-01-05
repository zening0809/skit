import React from 'react';
import RcMenu, { Divider, SubMenu, ItemGroup } from 'rc-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import animation from '../utils/openAnimation';
import warning from '../utils/warning';
import Item from './MenuItem';
import './style/index';



export default class Menu extends React.Component {
    static Divider = Divider;
    static Item = Item;
    static SubMenu = SubMenu;
    static ItemGroup = ItemGroup;
    static defaultProps = {
        prefixCls: 'xxx-menu',
        className: '',
        theme: 'light',  // or dark
    };
    static childContextTypes = {
        inlineCollapsed: PropTypes.bool,
    };
    static contextTypes = {
        siderCollapsed: PropTypes.bool,
    };
    switchModeFromInline;
    inlineOpenKeys = [];
    constructor(props) {
        super(props);

        warning(
            !('inlineCollapsed' in props && props.mode !== 'inline'),
            '`inlineCollapsed` should only be used when Menu\'s `mode` is inline.',
        );

        let openKeys;
        if ('defaultOpenKeys' in props) {
            openKeys = props.defaultOpenKeys;
        } else if ('openKeys' in props) {
            openKeys = props.openKeys;
        }

        this.state = {
            openKeys: openKeys || [],
        };
    }
    getChildContext() {
        return {
            inlineCollapsed: this.getInlineCollapsed(),
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.mode === 'inline' &&
            nextProps.mode !== 'inline') {
            this.switchModeFromInline = true;
        }
        if ('openKeys' in nextProps) {
            this.setState({ openKeys: nextProps.openKeys });
            return;
        }
        if ((nextProps.inlineCollapsed && !this.props.inlineCollapsed) ||
            (nextContext.siderCollapsed && !this.context.siderCollapsed)) {
            this.switchModeFromInline = !!this.state.openKeys.length;
            this.inlineOpenKeys = this.state.openKeys;
            this.setState({ openKeys: [] });
        }
        if ((!nextProps.inlineCollapsed && this.props.inlineCollapsed) ||
            (!nextContext.siderCollapsed && this.context.siderCollapsed)) {
            this.setState({ openKeys: this.inlineOpenKeys });
            this.inlineOpenKeys = [];
        }
    }
    handleClick = (e) => {
        this.handleOpenChange([]);

        const { onClick } = this.props;
        if (onClick) {
            onClick(e);
        }
    }
    handleOpenChange = (openKeys) => {
        this.setOpenKeys(openKeys);

        const { onOpenChange } = this.props;
        if (onOpenChange) {
            onOpenChange(openKeys);
        }
    }
    setOpenKeys(openKeys) {
        if (!('openKeys' in this.props)) {
            this.setState({ openKeys });
        }
    }
    getRealMenuMode() {
        const inlineCollapsed = this.getInlineCollapsed();
        if (this.switchModeFromInline && inlineCollapsed) {
            return 'inline';
        }
        const { mode } = this.props;
        return inlineCollapsed ? 'vertical' : mode;
    }
    getInlineCollapsed() {
        const { inlineCollapsed } = this.props;
        if (this.context.siderCollapsed !== undefined) {
            return this.context.siderCollapsed;
        }
        return inlineCollapsed;
    }
    getMenuOpenAnimation(menuMode) {
        const { openAnimation, openTransitionName } = this.props;
        let menuOpenAnimation = openAnimation || openTransitionName;
        if (openAnimation === undefined && openTransitionName === undefined) {
            switch (menuMode) {
                case 'horizontal':
                    menuOpenAnimation = 'slide-up';
                    break;
                case 'vertical':
                    // When mode switch from inline
                    // submenu should hide without animation
                    if (this.switchModeFromInline) {
                        menuOpenAnimation = '';
                        this.switchModeFromInline = false;
                    } else {
                        menuOpenAnimation = 'zoom-big';
                    }
                    break;
                case 'inline':
                    menuOpenAnimation = {
                        ...animation,
                        leave: (node, done) => animation.leave(node, () => {
                            // Make sure inline menu leave animation finished before mode is switched
                            this.switchModeFromInline = false;
                            this.setState({});
                            done();
                        }),
                    };
                    break;
                default:
            }
        }
        return menuOpenAnimation;
    }

    render() {
        const { prefixCls, className, theme } = this.props;
        const menuMode = this.getRealMenuMode();
        const menuOpenAnimation = this.getMenuOpenAnimation(menuMode);

        const menuClassName = classNames(className, `${prefixCls}-${theme}`, {
            [`${prefixCls}-inline-collapsed`]: this.getInlineCollapsed(),
        });

        const menuProps = {
            openKeys: this.state.openKeys,
            onOpenChange: this.handleOpenChange,
            className: menuClassName,
            mode: menuMode,
        };

        if (menuMode !== 'inline') {
            // closing vertical popup submenu after click it
            menuProps.onClick = this.handleClick;
            menuProps.openTransitionName = menuOpenAnimation;
        } else {
            menuProps.openAnimation = menuOpenAnimation;
        }
        return <RcMenu {...this.props} {...menuProps} />;
    }
}
