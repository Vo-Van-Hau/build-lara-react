import React, { useEffect, useContext, useState, Fragment } from 'react';
import { OrdersContext } from '../Contexts/OrdersContext';
import {
    Table, Space, Input, Button, Row, Col, Divider, Typography, Result, Tabs, Image, Tag,
    Select
} from 'antd';
import { ShopOutlined, BarcodeOutlined, BranchesOutlined } from '@ant-design/icons';
import Helper from '../Helper/Helper';
import OrderTrackingStatusDrawer from '../Actions/OrderTrackingStatusDrawer';
const { Search } = Input;
const { Text, Title } = Typography;

const ListOrders = (props) => {
    const { data, get_orders, set_mouted, setRouter } = useContext(OrdersContext);
    const { config, mouted, loading_table, pagination, orders } = data;
    const [keySearch, setKeySearch] = useState({
        keyword: null,
        status: null
    });
    const [viewAction, setViewAction] = useState(false);
    const [orderDetail, setOrderDetail] = useState({});

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {mixed} pagination
     * @param {mixed} filters
     * @return {void}
     */
    const handleTableChange = (pagination, filters) => {
        let { status } = filters;
        setKeySearch({...keySearch, status });
        get_orders(pagination.current, {...keySearch, status});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Objetc} orderDetail
     * @return {void}
     */
    const openOrderTrackingDetailDrawer = (orderDetail) => {
        try {
            if(Object.prototype.toString.call(orderDetail) === '[object Object]') {
                setViewAction(true);
                setOrderDetail(orderDetail);
            }
        } catch (errors) {
            console.log(errors);
        }
    }

    const onTabsChange = (key) => {
        console.log(key);
    };

    const AllOrders = () => {
        return orders.map((order, index) => {
            let { order_detail } = order;
            const columns = [
                {
                    title: 'Giao hàng thành công',
                    render: (_, record) => {
                        return (
                            <><Space align="end">
                                <Image width={78} height={78} src={record.product.image_link} alt={'product-image'} onClick={() => setRouter({
                                    module: 'products',
                                    controller: 'productdetail',
                                    action: 'view',
                                    id: record.product.id
                                })}/>
                                    <div>
                                        <Text><Text strong>Tên sản phẩm:</Text> { record.product_name }</Text><br/>
                                        <Text><Text strong>Giá bán:</Text> { record.price }</Text><br/>
                                        <Text><Text strong>Số lượng:</Text> x{ record.quantity }</Text><br/>
                                    </div>
                            </Space></>
                        )
                    },
                },{
                    title: 'Trạng thái đơn hàng',
                    align: 'center',
                    render: (_, record) => {
                        let { order_tracking_status } = record;
                        let { title, tag_name } = order_tracking_status;
                        return (
                            <><Tag color={tag_name}>{ title }</Tag></>
                        )
                    }
                },{
                    title: 'Thời gian đặt hàng',
                    align: 'center',
                    render: (_, record) => {
                        return (<>{ order.order_date && order.order_date.date && order.order_date.time ?
                            <Space
                                direction="vertical"
                                align="center"
                                size="small"
                            >
                                <Text>{order.order_date.time}</Text>
                                <Text>{order.order_date.date}</Text>
                            </Space> :
                        ''}</>)
                    }
                },{
                    title: 'Hành động',
                    align: 'center',
                    render: (_, record) => {
                        return (
                            <div>
                                <Button type="primary" icon={<BranchesOutlined />} onClick={() => openOrderTrackingDetailDrawer(record)}/>
                            </div>
                        )
                    }
                },
            ];

            return (<Fragment key={index}>
                <div>
                    <div>
                        <Space size={`small`} direction="vertical" style={{paddingBottom: 12, paddingTop: 12}}>
                            <Text className='shop_name'>
                                <BarcodeOutlined /> Mã đơn hàng: #{ order.code ? order.code : '' }
                            </Text>
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
                                                <Button size={'small'}>Xem chi tiết</Button>
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
            });
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
        if(mouted) get_orders(1, keySearch);
        return () => {set_mouted(false);}
    }, []);

    return (
    <><Row className="orders_container">
            <Col className="page_title" span={24} align="bottom">
                <Title level={3}>Đơn hàng của tôi</Title>
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
        <OrderTrackingStatusDrawer visible={viewAction} setDrawer={setViewAction} orderDetail={orderDetail}/>
    </>);
}

export default ListOrders;
