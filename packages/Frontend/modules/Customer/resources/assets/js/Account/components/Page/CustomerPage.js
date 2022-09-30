import { UserOutlined, BellOutlined, ShoppingCartOutlined, HomeOutlined, CreditCardOutlined, TagOutlined, HeartOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Row } from 'antd';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
const { Content, Footer, Sider } = Layout;

const menuItems = [
    { key: 1, label: <a href='#' >Account</a> , icon: <UserOutlined /> },
    { key: 2, label: <a href='#' >Notifitation</a> , icon: <BellOutlined /> },
    { key: 3, label: <a href='#' >Orders</a> , icon: <ShoppingCartOutlined /> },
    { key: 4, label: <a href='#' >Address</a> , icon: <HomeOutlined /> },
    { key: 5, label: <a href='#' >Payment Card</a>, icon: <CreditCardOutlined /> },
    { key: 6, label: <a href='#' >Review Products</a>, icon: <TagOutlined /> },
    { key: 7, label: <a href='#' >Favor Products</a> , icon: <HeartOutlined /> },
];

const CustomerPage = () => (
    <Layout>
        <Content>
            <Layout className="customer-layout-background">
                <Sider className="customer-layout-background" width={250} style={{ backgroundColor: '#fff' }} >
                    <Row className='customer_account_container' align="middle" style={{ background: 'white', padding: '1rem',  gap: '1rem' }}>
                        <Avatar size={64} src='https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000' />
                        <div className='customer_account_text'>
                            <h5>Account</h5>
                            <h3>Thúy Mai</h3>
                        </div>
                    </Row>
                    <Menu mode="inline"
                        items={menuItems}
                        style={{ }} />
                </Sider>
                <Content className='customer_content_container'>
                    {/* <Outlet /> */}
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
    </Layout>
);

export default CustomerPage;
