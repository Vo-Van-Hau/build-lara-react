import React, { useContext, useState ,useEffect} from 'react';
import { UserOutlined, BellOutlined, ShoppingCartOutlined,
    HomeOutlined, CreditCardOutlined, TagOutlined, HeartOutlined, ShopOutlined,
    GiftOutlined, NotificationOutlined, FieldTimeOutlined
} from '@ant-design/icons';
import { Avatar, Layout, Menu, Row, Button, Col, Result, Tabs, Typography } from 'antd';
import {  } from '@ant-design/icons'
const { Content, Footer, Sider } = Layout;
import { NotificationContext } from '../Contexts/NotificationContext';
const { Title } = Typography;

const menuItems = [
    { key: 1, label: <a href='#' >Account</a>, icon: <UserOutlined /> },
    { key: 2, label: <a href='#' >Notification</a>, icon: <BellOutlined /> },
    { key: 3, label: <a href='#' >Orders</a>, icon: <ShoppingCartOutlined /> },
    { key: 4, label: <a href='#' >Address</a>, icon: <HomeOutlined /> },
    { key: 5, label: <a href='#' >Payment Card</a>, icon: <CreditCardOutlined /> },
    { key: 6, label: <a href='#' >Review Products</a>, icon: <TagOutlined /> },
    { key: 7, label: <a href='#' >Favor Products</a>, icon: <HeartOutlined /> },
];

const NotificationPage = () => {

    const { data, get_notifications } = useContext(NotificationContext);

    const HomeNotice = () => {
        return <Result title="You don't have any notifications yet"
            extra={<Button type="primary">Continue Shopping</Button>}
            danger
        />
    }
    const PromotionNotice = () => {
        return <Result title="You don't have any notifications yet"
            extra={<Button type="primary">Continue Shopping</Button>}
            danger
        />
    }
    const OrdersNotice = () => {
        return <Result title="You don't have any notifications yet"
            extra={<Button type="primary">Continue Shopping</Button>}
            danger
        />
    }
    const SystemNotice = () => {
        return <Result title="You don't have any notifications yet"
            extra={<Button type="primary">Continue Shopping</Button>}
            danger />
    }

    useEffect(() => {
        get_notifications();
    }, []);

    return (
        <Layout>
            <Content>
                <Layout className="customer-layout-background">
                    <Sider className="customer-layout-background" width={250} style={{ backgroundColor: '#fff' }} >
                        <Row className='customer_account_container' align="middle" style={{ background: 'white', padding: '1rem', gap: '1rem' }}>
                            <Avatar size={64} src='https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000' />
                            <div className='customer_account_text'>
                                <h5>Account</h5>
                                <h3>Thúy Mai</h3>
                            </div>
                        </Row>
                        <Menu mode="inline"
                            items={menuItems}
                            style={{}} />
                    </Sider>
                    <Content className='customer_content_container'>
                        <Row className="notification_container">
                            <Col className="page_title" span={24} align="bottom">
                                <Title level={3}>Page Title (Notification)</Title>
                            </Col>
                            <Col className="page_container" span={24}>
                                <Tabs
                                    defaultActiveKey="1"
                                    items={[
                                        {
                                            label: <HomeOutlined style={{ fontSize: '24px', }} />,
                                            key: '1',
                                            children: <HomeNotice />,
                                        },
                                        {
                                            label: <GiftOutlined style={{ fontSize: '24px' }} />,
                                            key: '2',
                                            children: <PromotionNotice />,
                                        },
                                        {
                                            label: <NotificationOutlined style={{ fontSize: '24px' }} />,
                                            key: '3',
                                            children: <OrdersNotice />,
                                        },
                                        {
                                            label: <FieldTimeOutlined style={{ fontSize: '24px' }} />,
                                            key: '4',
                                            children: <SystemNotice />,
                                        },
                                    ]} />
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                MS Mall ©2022 Created
            </Footer>
        </Layout>)
};

export default NotificationPage;
