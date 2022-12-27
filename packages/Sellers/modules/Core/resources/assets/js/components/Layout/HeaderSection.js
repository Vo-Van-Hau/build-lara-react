import { Layout, Menu, Row, Col, Button } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
const { Header } = Layout;

const HeaderSection = ({...props}) => {

    const { data, navigate, setRouter, searchParams, logout } = props;

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: Log out
     * @param {string}
     * @return {void}
     */
    const handleLogout = () => {
        return logout();
    }

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
        <>
            <Header style={{color: '#FFFFFF', paddingLeft: '0px', paddingRight: '0px'}} theme='light'>
                {/* <Menu
                    mode='horizontal'
                    items={items}
                /> */}
                <Row style={{height: '100%'}}>
                    <Col span={12}></Col>
                    <Col span={12} style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                        <Button onClick={() => {handleLogout()}} style={{marginRight: 50}} icon={<LogoutOutlined />}>
                            Thoát
                        </Button>
                    </Col>
                </Row>
            </Header>
        </>
    )
}
export default HeaderSection;
