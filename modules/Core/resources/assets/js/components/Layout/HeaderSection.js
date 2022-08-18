import React, { Fragment } from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderSection = ({...props}) => {

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @returns {Object}
     */
    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem('Navigation One', 'sub1', <MailOutlined />, [
          getItem('Option 1', '1'),
          getItem('Option 2', '2'),
          getItem('Option 3', '3'),
          getItem('Option 4', '4'),
        ]),
        getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
          getItem('Option 5', '5'),
          getItem('Option 6', '6'),
          getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        ]),
        getItem('Navigation Three', 'sub4', <SettingOutlined />, [
          getItem('Option 9', '9'),
          getItem('Option 10', '10'),
          getItem('Option 11', '11'),
          getItem('Option 12', '12'),
        ]),
    ]; // submenu keys of first level

    return (
        <Fragment>
            <Header style={{color: '#FFFFFF', paddingLeft: '0px', paddingRight: '0px'}} theme='light'>
                <Menu
                    mode='horizontal'
                    items={items}
                />
            </Header>
        </Fragment>
    )
}
export default HeaderSection;
