import React, { useEffect, useContext, useState } from 'react';
import { OrdersContext } from '../Contexts/OrdersContext';
import {
    Table, Space, Input, Button, Row, Col, Content, SideBar, Typography,
    Layout, Result, Tabs, Image
} from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import Helper from '../Helper/Helper';
const { Search } = Input;
const { Text, Title } = Typography;

const ListOrders = (props) => {
    const { data, get_orders, set_mouted, setRouter } = useContext(OrdersContext);
    const { config, mouted, loading_table, pagination, orders } = data;
    const [keySearch, setKeySearch] = useState({
        keyword: null,
        status: null
    });

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

    const onTabsChange = (key) => {
        console.log(key);
    };

    const AllOrders = () => {
        return orders.map((order) => {
            let { order_detail } = order;
            const columns = [
                {
                    title: 'Giao hàng thành công',
                    render: (_, record) => {
                        return (
                            <><Image width={78} height={78} src={record.product.image_link} alt={'product-image'} onClick={() => setRouter({
                                module: 'products',
                                controller: 'productdetail',
                                action: 'view',
                                id: record.product.id
                            })}/></>
                        )
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
                    dataIndex: 'quantity',
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
            return (<>
                <Title level={5} className='shop_name'>
                    <ShopOutlined /> Mã đơn hàng: #{ order.code ? order.code : 'Undefined' }
                </Title>
                <Table
                    pagination={false}
                    columns={columns}
                    dataSource={order_detail}
                    rowKey={'id'}
                    footer={() => { return <div className="total_price" align='right'>Tổng cộng: <b>200.000đ</b></div> }}
                />
                <Row align='end'>
                    <Button type="primary" size={'large'} style={{ margin: '1rem' }} >Xem chi tiết</Button>
                </Row>
            </>)
            });
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
                            label: `Tất cả đơn hàng`,
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
        </Row></>
    );
}

export default ListOrders;
