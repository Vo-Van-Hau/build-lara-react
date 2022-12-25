import React, { useEffect, useContext, useState } from 'react';
import { BarcodeOutlined, BellOutlined, ShoppingCartOutlined, HomeOutlined,
    CreditCardOutlined, TagOutlined, HeartOutlined, ShopOutlined, ControlOutlined
} from '@ant-design/icons';
import { Layout, Table, Col, Card, Space, Anchor, Divider,
    Row, Typography, Button, Tabs, Image
} from 'antd';
import { OrdersContext } from '../Contexts/OrdersContext';
import SideBar from '../../../Customer/components/Layout/Sidebar';
import OrderTrackingStatusDrawer from '../Actions/OrderTrackingStatusDrawer';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const OrderDetailPage = ({keyID, ...props}) => {

    const { config } = props.data;
    const { app } = config;
    const { baseURL} = app;
    const { data, setRouter, get_detail } = useContext(OrdersContext);
    const { detail_item } = data;
    const {
        order_detail, country, province, district, ward, receiver_address, receiver_name, receiver_phone,
        payment_method, estimated_delivery_date,
    } = detail_item;
    const [viewAction, setViewAction] = useState(false);
    const [orderDetail, setOrderDetail] = useState({});

    const columnsOrderDetail = [
        {
            title: '',
            render: (_, record) => {
                const { seller, product_identifiers } = record.product;
                const { store } = seller;
                const { sku } = product_identifiers;

                return (
                    <><Space align="start">
                        <Image width={78} height={78} src={record.product.image_link} alt={'product-image'} onClick={() => setRouter({
                            module: 'products',
                            controller: 'productdetail',
                            action: 'view',
                            id: record.product.id
                        })}/>
                            <div>
                                <Text strong>{ record.product_name ? record.product_name : '-'}</Text><br/>
                                <Text><ShopOutlined />  { store && store.name ? store.name : `-` }</Text><br/>
                                <Text><BarcodeOutlined />  SKU { sku ? sku : `-` }</Text><br/><br/>
                                <Space>
                                    <Button>Chat với nhà bán</Button>
                                    <Button>Viết nhận xét</Button>
                                    <Button onClick={() => setRouter({
                                        module: 'products',
                                        controller: 'productdetail',
                                        action: 'view',
                                        id: record.product.id
                                    })}>Mua lại</Button>
                                </Space>

                            </div>
                    </Space></>)
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
                    <>{ record.price_format }đ</>
                )
            }
        },{
            title: '',
            align: 'center',
            render: (_, record) => {
                return (
                    <>
                        <Button type='primary' onClick={() => openOrderTrackingDetailDrawer(record)}>Theo dõi đơn hàng</Button>
                    </>
                )
            }
        },

    ];

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Objetc} orderDetail
     * @return {void}
     */
    const openOrderTrackingDetailDrawer = (orderDetail) => {
        try {
            setViewAction(true);
            setOrderDetail(orderDetail);
        } catch (errors) {
            console.log(errors);
        }
    }

    useEffect(() => {
        if(keyID && keyID !== '') {
            get_detail({
                id: keyID,
            });
        }
    }, [keyID]);

    return (
        <Layout>
            <Content>
                <Layout className="customer-layout-background">
                    <SideBar {...props} setRouter={setRouter}/>
                    <Content className='customer_content_container'>
                        <Row className="orders_container">
                            <Col className="page_title" span={24} align="bottom">
                                <Text >Chi tiết đơn hàng #{ detail_item.code || ''}</Text>
                            </Col>
                            <Col className="page_container" span={24}>
                                <div className="site-card-wrapper">
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <Card title="ĐỊA CHỈ NGƯỜI NHẬN" bordered={false}>
                                                <Space
                                                    direction="vertical"
                                                    size="small"
                                                    style={{
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <Text strong>{`${receiver_name}`}</Text>
                                                    <Text>Địa chỉ: {`${receiver_address}, ${ward.name || ''}, ${district.name || ''}, ${province.name || ''}, ${country.name || ''}`}</Text>
                                                    <Text>Điện thoại: {`${receiver_phone}`}</Text>
                                                </Space>
                                            </Card>
                                        </Col>
                                        <Col span={8}>
                                            <Card title="HÌNH THỨC GIAO HÀNG" bordered={false}>
                                                <Space
                                                    direction="vertical"
                                                    size="small"
                                                    style={{
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <Text>Giao trước {estimated_delivery_date.time || '-'} ngày {estimated_delivery_date.date || '-'}</Text>
                                                    <Text>Được giao bởi <Text style={{fontWeight: 500}}>Giaohangtietkiem</Text></Text>
                                                    <Text>Phí vận chuyển: 14.000đ</Text>
                                                </Space>
                                            </Card>
                                        </Col>
                                        <Col span={8}>
                                            <Card title="HÌNH THỨC THANH TOÁN" bordered={false}>
                                                <Space
                                                    direction="vertical"
                                                    size="small"
                                                    style={{
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <Text>{`${payment_method.name || ''}`}</Text>
                                                </Space>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <Table
                                        pagination={false}
                                        columns={columnsOrderDetail}
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
                                                        <div className="total_price" align='right'>Tổng cộng: <b>{detail_item.total_amount_format || '-'}đ</b></div>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                                        <Space wrap>
                                                            <Button size={'small'} type={'link'}>Xem hóa đơn</Button>
                                                        </Space>
                                                    </div>
                                                </Space>
                                            )
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <OrderTrackingStatusDrawer visible={viewAction} setDrawer={setViewAction} orderDetail={orderDetail}/>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
};

export default OrderDetailPage;
