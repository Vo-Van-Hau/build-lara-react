import React, { Fragment, useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CoreContext } from "../Contexts/CoreContext";
import _ from "lodash";
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
    const { menus, config } = data;

    const [collapsed, setCollapsed] = useState(false);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param
     * @return {Object}
     */
    const getItem = (label, key, icon, children, type) => {
        return { key, icon, children, label, type };
    }

    const items = menus.map((menu, index) => {
        return getItem(menu.name, index, <DesktopOutlined />, []);
    });

    // const items = [
        // getItem('Option 1', '1', <PieChartOutlined />),
        // getItem('Option 2', '2', <DesktopOutlined />),
        // getItem('Option 3', '3', <ContainerOutlined />),
        // getItem('Navigation One', 'sub1', <MailOutlined />, [
        //   getItem('Option 5', '5'),
        //   getItem('Option 6', '6'),
        //   getItem('Option 7', '7'),
        //   getItem('Option 8', '8'),
        // ]),
        // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        //   getItem('Option 9', '9'),
        //   getItem('Option 10', '10'),
        //   getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
        // ]),
    // ];

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param
     * @return {Voimport("react").idFunctionComponent}
     */
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const createMenuItem = (menu, index, sub_key) => {
        var result = [];
        if (menu != undefined) {
            menu.forEach((element, key) => {
                result.push(
                    <Menu.Item
                        key={"/" + config.app.adminPrefix + element.link}
                    >
                        <NavLink
                            exact
                            to={`/${config.app.adminPrefix +
                                (element.link ? element.link : "")}`}
                            title={element.name}
                            className=""
                            style={{ padding: 0 }}
                        >
                            {element.name}
                        </NavLink>
                    </Menu.Item>
                );
            });
        }
        return result;
    };

    const createSubmenu = (menu, index) => {
        let subMenu = [];
        Object.keys(menu).forEach((module, key) => {
            let childMenu = menu[module].child;
            let moduleName = menu[module].name.toLowerCase();
            if (childMenu != undefined && childMenu.length > 0) {
                subMenu.push(
                    <Menu.SubMenu
                        key={moduleName}
                        title={`${menu[module].name}`}
                    >
                        {createMenuItem(childMenu, index, key)}
                    </Menu.SubMenu>
                );
            } else if(menu[module].link){
                //have not child menu
                subMenu.push(
                    <Menu.Item
                        key={"/" + config.app.adminPrefix + menu[module].link}
                    >
                        <NavLink
                            exact
                            to={
                                "/" + config.app.adminPrefix + menu[module].link
                            }
                            title={menu[module].name}
                            className=""
                            style={{ padding: 0 }}
                        >
                            {menu[module].name}
                        </NavLink>
                    </Menu.Item>
                );
            }
        });
        return subMenu;
    };

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {array} menus
     * @returns
     */
    const create_menu_item_group = (menus) => {
        let results = [];
        console.log(Object.keys(menus))
        Object.keys(menus).forEach((group, index) => {
            let menu = menus[group];
            results.push(
                <Menu.ItemGroup
                    key={`group-` + index}
                    title={group.toUpperCase()}
                >
                    {/* {createSubmenu(menu, index)} */}
                </Menu.ItemGroup>
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
                id='menuNav'
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
                    { collapsed ? config.app.name : '' }
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                    theme='light'
                    items={items}
                />
            </Sider>
        </Fragment>
    );
};
export default Sidebar;
