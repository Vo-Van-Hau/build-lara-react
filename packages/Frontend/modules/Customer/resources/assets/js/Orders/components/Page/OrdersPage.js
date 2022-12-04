import React, { useEffect, useContext, Fragment } from 'react';
import { BarcodeOutlined, BellOutlined, ShoppingCartOutlined, HomeOutlined,
    CreditCardOutlined, TagOutlined, HeartOutlined, ShopOutlined, ControlOutlined
} from '@ant-design/icons';
import { Layout, Table, Col, Result, Space, Tag, Divider,
    Row, Typography, Button, Tabs, Image
} from 'antd';
import { OrdersContext } from '../Contexts/OrdersContext';
import SideBar from '../../../Customer/components/Layout/Sidebar';
const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const OrdersPage = ({keyID, ...props}) => {

    const { data, setRouter, get_orders_history }  = useContext(OrdersContext);
    const { orders } = data;

    const onTabsChange = (key) => {
        console.log(key);
    };

    const AllOrders = () => {
        return (<Space
            direction="vertical"
            size="large"
            style={{
                display: 'flex',
            }}
        >
            {orders.map((order) => {
                let { order_detail, order_tracking_status } = order;
                const columns = [
                    {
                        title: '',
                        render: (_, record) => {
                            const { seller } = record.product;
                            const { store } = seller;
                            return (
                                <><Space align="start">
                                    <Image width={78} height={78} src={record.product.image_link} alt={'product-image'} onClick={() => setRouter({
                                        module: 'products',
                                        controller: 'productdetail',
                                        action: 'view',
                                        id: record.product.id
                                    })}/>
                                        <div>
                                            <><ShopOutlined />  { store && store.name ? store.name : `` }</><br/>
                                        </div>
                                </Space></>)
                        },
                    },{
                        title: 'Tên sản phẩm',
                        width: 300,
                        render: (_, record) => {
                            return (
                                <a>{ record.product_name }</a>
                            )
                        },
                    },{
                        title: 'Số lượng',
                        align: 'center',
                        render: (_, record) => {
                            return (
                                <>x{ record.quantity }</>
                            )
                        }
                    },{
                        title: 'Đơn giá',
                        align: 'center',
                        render: (_, record) => {
                            return (
                                <>{ record.price }</>
                            )
                        }
                    },

                ];
                return (<Fragment>
                    <div>
                        <div>
                            <Space size={`small`} direction="vertical" style={{paddingBottom: 12, paddingTop: 12}}>
                                <Text className='shop_name'>
                                    <BarcodeOutlined /> Mã đơn hàng: #{ order.code ? order.code : '' }
                                </Text>
                                <Text><ControlOutlined /> Trạng thái: <><Tag color={order_tracking_status.tag_name ? order_tracking_status.tag_name : 'blue'}>{ order_tracking_status.title ? order_tracking_status.title : '' }</Tag></></Text>
                            </Space>
                        </div>
                        <div>
                            <Table
                                pagination={false}
                                columns={columns}
                                dataSource={order_detail}
                                rowKey={'id'}
                                footer={() => {
                                    return (
                                        <Space
                                            direction="vertical"
                                            size="small"
                                            style={{
                                                display: 'flex',
                                            }}
                                        >
                                            <div>
                                                <div className="total_price" align='right'>Tổng cộng: <b>200.000đ</b></div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                                <Space wrap>
                                                    <Button size={'small'}>Mua lại</Button>
                                                    <Button size={'small'} onClick={() => setRouter({
                                                        module: 'customer',
                                                        controller: 'orders',
                                                        action: 'detail',
                                                        id: order.id || 0
                                                    })}>Xem chi tiết</Button>
                                                </Space>
                                            </div>
                                        </Space>
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <Divider />
                </Fragment>)
            })}
        </Space>)
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

    useEffect(() => {
        if(keyID !== '' || keyID !== '#') {
            get_orders_history();
        }
    }, []);

    return (
        <Layout>
            <Content>
                <Layout className="customer-layout-background">
                    <SideBar {...props} setRouter={setRouter}/>
                    <Content className='customer_content_container'>
                        <Row className="orders_container">
                            <Col className="page_title" span={24} align="bottom">
                                <Title level={5}>Đơn hàng của tôi</Title>
                            </Col>
                            <Col className="page_container" span={24}>
                                <Tabs
                                    type="card"
                                    defaultActiveKey="1"
                                    onChange={onTabsChange}
                                    items={[
                                        {
                                            label: `Tất cả đơn`,
                                            key: '1',
                                            children: <AllOrders />,
                                        },{
                                            label: `Đang xử lý`,
                                            key: '2',
                                            children: <Processing />,
                                        },{
                                            label: `Đang vận chuyển`,
                                            key: '3',
                                            children: <Transporting />,
                                        },{
                                            label: `Đã giao`,
                                            key: '4',
                                            children: <Delivered />,
                                        },{
                                            label: `Đã huỷ`,
                                            key: '5',
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
