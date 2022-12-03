import React, { useEffect, useContext, Fragment } from 'react';
import { BarcodeOutlined, BellOutlined, ShoppingCartOutlined, HomeOutlined,
    CreditCardOutlined, TagOutlined, HeartOutlined, ShopOutlined, ControlOutlined
} from '@ant-design/icons';
import { Layout, Table, Col, Card, Space, Tag, Divider,
    Row, Typography, Button, Tabs, Image
} from 'antd';
import { OrdersContext } from '../Contexts/OrdersContext';
import SideBar from '../../../Customer/components/Layout/Sidebar';
const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const OrderDetailPage = ({keyID, ...props}) => {

    const { data, setRouter, get_detail }  = useContext(OrdersContext);
    const { detail_item } = data;
    const { order_detail } = detail_item;

    const columnsOrderDetail = [
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
        },{
            title: '',
            align: 'center',
            render: (_, record) => {
                return (
                    <>
                        <Button type='primary'>Theo dõi đơn hàng</Button>
                    </>
                )
            }
        },

    ];

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
                                                    <Text strong>VÕ VĂN HẬU</Text>
                                                    <Text>Địa chỉ: 117/134/5 Nguyễn Hữu Cảnh street, 22 Ward, Bình Thạnh District, HCM city, Phường 22, Quận Bình Thạnh, Hồ Chí Minh, Việt Nam</Text>
                                                    <Text>Điện thoại: 0359744542</Text>
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
                                                    <Text>Giao trước 11:59 ngày 28/03/2022</Text>
                                                    <Text>Được giao bởi TikiNOW Smart Logistics (giao từ Hồ Chí Minh)</Text>
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
                                                    <Text>Thanh toán tiền mặt khi nhận hàng</Text>
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
                                                        <div className="total_price" align='right'>Tổng cộng: <b>200.000đ</b></div>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                                        <Space wrap>
                                                            <Button size={'small'}>Mua lại</Button>
                                                            <Button size={'small'} onClick={() => setRouter({
                                                                module: 'customer',
                                                                controller: 'orders',
                                                                action: 'detail',
                                                                id: detail_item.id || 0
                                                            })}>Xem chi tiết</Button>
                                                        </Space>
                                                    </div>
                                                </Space>
                                            )
                                        }}
                                    />
                                </div>
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

export default OrderDetailPage;
