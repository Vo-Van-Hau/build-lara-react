import React, { useEffect, useContext, useState, Fragment } from 'react';
import { OrdersContext } from '../Contexts/OrdersContext';
import {
    Table, Space, Input, Button, Row, Col, Divider, Typography, Result, Tabs, Image, Tag,
    Empty,
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
                    {orders_tab.length > 0 ? orders_tab.map((order, index) => {
                        let { order_detail } = order;
                        const columns = [
                            {
                                title: '',
                                render: (_, record) => {
                                    return (
                                        <><Space align="end">
                                            <Image width={78} height={78} src={record.product_image_link} alt={'product-image'} onClick={() => setRouter({
                                                module: 'products',
                                                controller: 'productdetail',
                                                action: 'view',
                                                id: record.product.id
                                            })}/>
                                                <div>
                                                    <Text><Text strong>Tên sản phẩm:</Text> { record.product_name || '-'}</Text><br/>
                                                    <Text><Text strong>Giá bán:</Text> { record.price_format || '-' } đ</Text><br/>
                                                    <Text><Text strong>Số lượng:</Text> x{ record.quantity || '-'}</Text><br/>
                                                </div>
                                        </Space></>
                                    )
                                },
                            },{
                                title: 'Thông tin liên hệ',
                                render: (_, record) => {
                                    return (
                                        <><Space align="end">
                                            <div>
                                                <Text><Text strong>Tên khách hàng:</Text> { order.receiver_name || '-'}</Text><br/>
                                                <Text><Text strong>Số điện thoại:</Text> { order.receiver_phone || '-' }</Text><br/>
                                                <Text><Text strong>Địa chỉ:</Text> { order.delivery_location || '-'}</Text><br/>
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
                                                        <div className="total_price" align='right'>Tổng cộng: <b>{ order.total_amount_format || '-'}đ</b></div>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                                        <Space wrap>
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
                        })
                    : <Empty
                        description={`Chưa có đơn hàng`}
                    />}
                </Space>)
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
        <OrderTrackingStatusDrawer visible={viewAction} setDrawer={setViewAction} orderDetail={orderDetail}/>
    </>);
}

export default ListOrders;
