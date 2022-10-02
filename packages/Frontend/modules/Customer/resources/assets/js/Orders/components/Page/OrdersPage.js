import React from 'react';
import { UserOutlined, BellOutlined, ShoppingCartOutlined, HomeOutlined, CreditCardOutlined, TagOutlined, HeartOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu,Table } from 'antd';
import { Col, Result, Row, Typography,Button,Tabs } from "antd";
import { ShopOutlined } from '@ant-design/icons';
const { Content, Footer, Sider } = Layout;

const menuItems = [
    { key: 1, label: <a href='#' >Account</a>, icon: <UserOutlined /> },
    { key: 2, label: <a href='#' >Notifitation</a>, icon: <BellOutlined /> },
    { key: 3, label: <a href='#' >Orders</a>, icon: <ShoppingCartOutlined /> },
    { key: 4, label: <a href='#' >Address</a>, icon: <HomeOutlined /> },
    { key: 5, label: <a href='#' >Payment Card</a>, icon: <CreditCardOutlined /> },
    { key: 6, label: <a href='#' >Review Products</a>, icon: <TagOutlined /> },
    { key: 7, label: <a href='#' >Favor Products</a>, icon: <HeartOutlined /> },
];

const OrdersPage = () => {
    const { Title } = Typography;
    const onTabsChange = (key) => {
        console.log(key);
    };
    const AllOrders = () => {
        const columns = [
            {
                title: 'Order status here',
                dataIndex: 'img',
                render: (item) => <img src={item} alt='cart-item-img' />,
            },
            {
                title: 'Product',
                dataIndex: 'title',
                width: 300,
                render: (text) => <a>{text}</a>,
            },
            {
                title: 'Quantity',
                align: 'center',
                dataIndex: 'quantity',
            },
            {
                title: 'Unit Price',
                align: 'center',
                dataIndex: 'unitPrice',
            },

        ];
        const data = [
            {
                key: '1',
                img: 'https://salt.tikicdn.com/cache/w78/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
                title: 'We Will Be Happy, In Different Ways [Bonus: 01 Bookmark]',
                unitPrice: 32000,
                quantity: 1,
            },
            {
                key: '2',
                img: 'https://salt.tikicdn.com/cache/w78/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
                title: 'We Will Be Happy, In Different Ways [Bonus: 01 Bookmark]',
                unitPrice: 32000,
                quantity: 1,
            },
        ];
        return <>

            <Title level={5} className='shop_name'>
                <ShopOutlined /> OrderID here
            </Title>
            <Table
                pagination={false}
                columns={columns}
                dataSource={data}
                footer={() => { return <div className="total_price" align='right'>Tổng cộng: <b>200.000đ</b></div> }}
            />
            <Row align='end'>
                <Button type="primary" size={'large'} style={{ margin: '1rem' }} >See detail</Button>
            </Row>

        </>
    };
    const Waiting = () => {
        return <Result title="No orders yet" />
    };
    const Processing = () => {
        return <Result title="No orders yet" />
    };
    const Transporting = () => {
        return <Result title="No orders yet" />
    };
    const Delivered = () => {
        const columns = [
            {
                title: 'Order status here',
                dataIndex: 'img',
                render: (item) => <img src={item} alt='cart-item-img' />,
            },
            {
                title: 'Product',
                dataIndex: 'title',
                width: 300,
                render: (text) => <a>{text}</a>,
            },
            {
                title: 'Quantity',
                align: 'center',
                dataIndex: 'quantity',
            },
            {
                title: 'Unit Price',
                align: 'center',
                dataIndex: 'unitPrice',
            },

        ];
        const data = [
            {
                key: '1',
                img: 'https://salt.tikicdn.com/cache/w78/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
                title: 'We Will Be Happy, In Different Ways [Bonus: 01 Bookmark]',
                unitPrice: 32000,
                quantity: 1,
            },
            {
                key: '2',
                img: 'https://salt.tikicdn.com/cache/w78/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
                title: 'We Will Be Happy, In Different Ways [Bonus: 01 Bookmark]',
                unitPrice: 32000,
                quantity: 1,
            },
        ];
        return <>

            <Title level={5} className='shop_name'>
                <ShopOutlined /> OrderID here
            </Title>
            <Table
                pagination={false}
                columns={columns}
                dataSource={data}
                footer={() => { return <div className="total_price" align='right'>Tổng cộng: <b>200.000đ</b></div> }}
            />
            <Row align='end'>
                <Button type="primary" size={'large'} style={{ margin: '1rem' }} >See detail</Button>
            </Row>

        </>
    };
    const Canceled = () => {
        return <Result title="No orders yet" />
    };
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
                        <Row className="orders_container">
                            <Col className="page_title" span={24} align="bottom">
                                <Title level={3}>Page Title (Order)</Title>
                            </Col>
                            <Col className="page_container" span={24}>
                                <Tabs
                                    type="card"
                                    defaultActiveKey="1"
                                    onChange={onTabsChange}
                                    items={[
                                        {
                                            label: `All Orders`,
                                            key: '1',
                                            children: <AllOrders />,
                                        },
                                        {
                                            label: `Wait for pay`,
                                            key: '2',
                                            children: <Waiting />,
                                        },
                                        {
                                            label: `Processing`,
                                            key: '3',
                                            children: <Processing />,
                                        },
                                        {
                                            label: `Being transported`,
                                            key: '4',
                                            children: <Transporting />,
                                        },
                                        {
                                            label: `Delivered`,
                                            key: '5',
                                            children: <Delivered />,
                                        },
                                        {
                                            label: `Canceled`,
                                            key: '6',
                                            children: <Canceled />,
                                        }
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
        </Layout>
    )
};

export default OrdersPage;
