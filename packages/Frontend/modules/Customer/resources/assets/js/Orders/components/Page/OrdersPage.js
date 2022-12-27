import React, { useEffect, useContext, Fragment } from 'react';
import { BarcodeOutlined, BellOutlined, ShoppingCartOutlined, HomeOutlined,
    CreditCardOutlined, TagOutlined, HeartOutlined, ShopOutlined, ControlOutlined
} from '@ant-design/icons';
import { Layout, Table, Col, Empty, Space, Tag, Divider,
    Row, Typography, Button, Tabs, Image
} from 'antd';
import { OrdersContext } from '../Contexts/OrdersContext';
import SideBar from '../../../Customer/components/Layout/Sidebar';
const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const OrdersPage = ({keyID, ...props}) => {

    const { data, setRouter, get_orders_history }  = useContext(OrdersContext);
    const { orders } = data;

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param
     * @returns {void}
     */
    const AllOrders = (values) => {

        const { type } = values;
        let orders_tab = type > -1 ? orders.filter((_orders, _index) => {
            if(_orders.order_tracking_status) {
                const { group_status_id } = _orders.order_tracking_status;
                return group_status_id === type;
            }
        }) : orders;

        switch(type) {
            case -1:
                break;
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }

        return (<Space
            direction="vertical"
            size="large"
            style={{
                display: 'flex',
            }}
        >
            {orders_tab.length > 0 ? orders_tab.map((order) => {
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
                                <>{ record.price_format || '-' }</>
                            )
                        }
                    },

                ];
                return (<Fragment key={order.id}>
                    <div>
                        <div>
                            <Space size={`small`} direction="vertical" style={{paddingBottom: 12, paddingTop: 12}}>
                                <Text className='shop_name'>
                                    <BarcodeOutlined /> Mã đơn hàng: #{ order.code ? order.code : '' }
                                </Text>
                                {/* <Text><ControlOutlined /> Trạng thái: <><Tag color={order_tracking_status.tag_name ? order_tracking_status.tag_name : 'blue'}>{ order_tracking_status.title ? order_tracking_status.title : '' }</Tag></></Text> */}
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
                                                <div className="total_price" align='right'>Tổng cộng: <b>{order.total_amount_format || '-'} đ</b></div>
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
            }) : <Empty
                description={`Chưa có đơn hàng`}
            />}
        </Space>)
    };

    useEffect(() => {
        if(keyID !== '' || keyID !== '#') {
            get_orders_history(1, {});
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
                                    defaultActiveKey={-1}
                                    items={[
                                        {
                                            label: `Tất cả đơn`,
                                            key: -1,
                                            children: <AllOrders type={-1}/>,
                                        },{
                                            label: `Chờ xác nhận`,
                                            key: 1,
                                            children: <AllOrders type={1}/>,
                                        },{
                                            label: `Đang xử lý`,
                                            key: 2,
                                            children: <AllOrders type={2} />,
                                        },{
                                            label: `Đang vận chuyển`,
                                            key: 3,
                                            children: <AllOrders type={3} />,
                                        },{
                                            label: `Giao hàng thành công`,
                                            key: 4,
                                            children: <AllOrders type={4} />,
                                        },{
                                            label: `Đơn hàng đã hủy`,
                                            key: 0,
                                            children: <AllOrders type={0} />,
                                        }
                                    ]} />
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
};

export default OrdersPage;
