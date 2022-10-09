import React, { useEffect, useContext, useState } from 'react';
import { OrdersContext } from '../Contexts/OrdersContext';
import { Table, Space, Popconfirm, Input, Button, Row, Col, Tooltip } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import Helper from '../Helper/Helper';
const { Search } = Input;

const ListOrders = (props) => {
    const { data, get_orders, set_mouted } = useContext(OrdersContext);
    const { config, mouted, loading_table, pagination, orders } = data;
    const [group, setGroup] = useState({});
    const [viewAction, setViewAction] = useState(false);
    const [viewUsers, setViewUsers] = useState(false);
    const [keySearch, setKeySearch] = useState({
        keyword: null,
        status: null
    });
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 75,
            fixed: 'left',
            align: 'center',
        },{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
        },{
            title: 'Parent',
            dataIndex: 'parent_group',
            key: 'parent_group',
            width: 200,
            ellipsis: true,
            render: (item, record) => {
                return (
                    <>{item ? item.name : ''}</>
                );
            }
        }, {
            title: 'Users',
            dataIndex: 'users',
            key: 'users',
            width: 150,
            ellipsis: true,
            render: (item, record) => {
                return (
                    <>{`${item.length} Users`}</>
                );
            }
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            filters: config.status,
            render: (value) => {
                let { status } = config;
                let text = status ? status.find(item => item.value == value): null;
                return (
                    <>{text ? text.text : ''}</>
                );
            }
        }, {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: 150,
            render: (_, record) => {
                return (
                    <Space size={5}>
                        <Button type="link" size="small" onClick={() => {}}>Edit</Button>
                        <>||</>
                        <Popconfirm title="Sure to delete?" placement="leftTop" onConfirm={() => {}}>
                            <Button type="link" size="small" danger>Delete</Button>
                        </Popconfirm>
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
