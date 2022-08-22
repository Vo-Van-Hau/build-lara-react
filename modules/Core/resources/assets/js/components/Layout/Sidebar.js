import React, { Fragment, useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CoreContext } from '../Contexts/CoreContext';
import _ from 'lodash';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu, Layout } from 'antd';
const { Sider } = Layout;

const Sidebar = ({ history, ...props }) => {

    const { data } = useContext(CoreContext);
    const { menus, config, siderBar } = data;
    const { collapsed } = siderBar;
    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param
     * @return {Object}
     */
    const getItem = (label, key, icon, children, type) => {
        return { key, icon, children, label, type };
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param
     * @return {Voimport("react").idFunctionComponent}
     */
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {array} menu
     * @returns {array}
     */
    const create_sub_menu = (menu) => {
        let results = [];
        menu.forEach((menu_item, _i) => {
            let child_menu = menu_item.child;
            let module_name = menu_item.name ? menu_item.name : '';
            if(child_menu !== undefined && child_menu.length > 0) {
                results.push(
                    getItem(module_name, `${module_name.toLowerCase()}`, null, [
                        ...child_menu.map((child, _i) => {
                            return getItem((
                                <NavLink to={`/${config.app.adminPrefix + child.link}`}>
                                   {child.name}
                                </NavLink>
                            ), `/${config.app.adminPrefix + child.link}`, null)
                        })
                    ])
                );
            }
            else if(menu_item.link) {
                results.push(
                    getItem((
                        <NavLink to={`/${config.app.adminPrefix + menu_item.link}`}>
                            {module_name}
                        </NavLink>
                    ), `/${config.app.adminPrefix + menu_item.link}`, null)
                );
            }
            else {}
        });
        return results;
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} menus
     * @returns {array}
     */
    const create_menu_item_group = (menus) => {
        let results = [];
        Object.keys(menus).forEach((group, _i) => {
            let menu = menus[group];
            results.push(
                getItem(group.toUpperCase(), `group-menu-${_i}`, null, [
                    ...create_sub_menu(menu)
                ], 'group')
            );
        });
        return results;
    };

    let path_name = history.location.pathname;
    let segments = path_name.split("/");
    let module = '';
    if (segments[1] !== '') {
        module = segments[2] ? segments[2] : '';
    }
    return (
        <Fragment>
            <Sider
                // trigger={null}
                // collapsible
                theme='light'
                collapsed={collapsed}
                className='customMenu'
                id='sidebar_backend'
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    left: 0,
                }}
            >
                {/* <Button type="primary" onClick={toggleCollapsed} style={{marginBottom: 16}}>
                    { collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
                </Button> */}
                <div className='logo'>
                    { !collapsed ? config.app.name : '' }
                </div>
                <Menu
                    defaultSelectedKeys={[path_name]}
                    defaultOpenKeys={[module]}
                    mode='inline'
                    theme='light'
                    items={create_menu_item_group(menus)}
                />
            </Sider>
        </Fragment>
    );
};
export default Sidebar;
