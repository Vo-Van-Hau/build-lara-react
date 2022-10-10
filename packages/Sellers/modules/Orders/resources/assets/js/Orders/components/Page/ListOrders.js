import React, { useEffect, useContext, useState } from 'react';
import { OrdersContext } from '../Contexts/OrdersContext';
import { Table, Space, Input, Button, Row, Col, Tooltip, Image, Typography } from 'antd';
import {  } from '@ant-design/icons';
import Helper from '../Helper/Helper';
const { Search } = Input;
const { Text } = Typography;

const ListOrders = (props) => {
    const { data, get_orders, set_mouted } = useContext(OrdersContext);
    const { config, mouted, loading_table, pagination, orders } = data;
    const [keySearch, setKeySearch] = useState({
        keyword: null,
        status: null
    });
    const columns = [
        {
            title: 'Mã đơn hàng',
            key: 'id',
            fixed: 'left',
            align: 'center',
            render: (_, record) => {
                return (
                    <>{ `#${record.order.code}` }</>
                )
            }
        },{
            title: 'Sản phẩm',
            dataIndex: 'product_image_link',
            key: 'product_image_link',
            render: (_, record) => {
                return (
                    <>
                        <Space size={`small`} align='center'>
                            <Image width={78} height={78} src={record.product_image_link} alt={'product-image'} onClick={() => setRouter({
                                module: 'products',
                                controller: 'productdetail',
                                action: 'view',
                                id: record.product.id
                            })}/>
                            <Text strong>{ record.product_name }</Text>
                        </Space>
                    </>
                )
            },
        },{
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            ellipsis: true,
        },{
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            ellipsis: true,
        },{
            title: 'Trạng thái đơn hàng',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            filters: config.status,
            render: (value) => {
                return (
                    <><Text type='success'>Đang vận chuyển</Text></>
                )
            }
        },{
            title: 'Thao tác',
            dataIndex: 'actions',
            key: 'actions',
            width: 150,
            render: (_, record) => {
                return (
                    <Space size={5}>
                        <Button type='link' size='small' onClick={() => {}}>Xem chi tiết</Button>
                    </Space>
                )
            }
        }
    ];

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

    useEffect(() => {
        if(mouted) get_orders(1, keySearch);
        return () => {set_mouted(false);}
    }, []);

    return (
        <div className="content">
            <Table
                title={(() => (
                    <Row gutter={[8, 8]}>
                        <Col xs={24} xl={12}>

                        </Col>
                        <Col xs={24} xl={12}>
                            <Search placeholder="Search by name !!!"
                                // onChange={(event) => {
                                //     let { value } = event.target;
                                //     setkeySearch({...keySearch, keyword: value});
                                // }}
                                // onSearch={()=>{
                                //     getGroups(1, keySearch);
                                // }}
                                // enterButton
                            />
                        </Col>
                    </Row>
                ))}
                columns={columns}
                bordered={true}
                loading={loading_table}
                dataSource={orders}
                pagination={pagination}
                scroll={{ x: 960 }}
                onChange={handleTableChange} // Callback executed when pagination, filters or sorter is changed
                rowKey='id'
            />
        </div>
    );
}

export default ListOrders;
