import React, { useEffect, useContext, useState } from 'react';
import { SellersContext } from '../Contexts/SellersContext';
import Helper from '../Helper/Helper';
import { Table, Space, Popconfirm, Input, Button, Row, Col, Avatar, Switch, Tooltip } from 'antd';
import { UserOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
const { Search } = Input;

const ListSellers = () => {

    const { data, get_sellers, set_mouted, setRouter, accept_seller } = useContext(SellersContext);
    const { sellers, config, pagination, loading_table, mouted, loadingState } = data;
    const [keySearch, setKeySearch] = useState({
        keyword: null,
        status: null,
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
            title: 'Fullname',
            dataIndex: 'fullname',
            key: 'fullname',
            ellipsis: true,
            render: (_, record) => {
                return (
                    <>
                        {`Name: ${record.name}`}<br />
                        {`UserName: ${record.username}`}
                    </>
                )
            }
        },{
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
            width: 200,
        },{
            title: 'Type User',
            dataIndex: 'is_publisher',
            key: 'is_publisher',
            width: 200,
            filters: config.is_publisher,
            render: (value) => {
                let { account_type } = config;
                let text = account_type ? account_type.find(item => item.value == value) : null;
                return (
                    <>{text ? text.text : ''}</>
                );
            }
        },{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            filters: config.status,
            render: (value) => {
                let { status } = config;
                let text = status ? status.find(item => item.value == value) : null;
                return (
                    <>{text ? text.text : ''}</>
                );
            }
        },{
            title: 'Acceptance',
            key: 'acceptance',
            width: 150,
            align: 'center',
            render: (_, record) => {
                const { seller } = record;
                const { is_accepted } = seller;
                return (
                    <Space size={5}>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={is_accepted === 0 ? false : true}
                            onChange={(checked, event) => handleAcceptableSeller({
                                checked, event, seller_id: seller.id || 0
                            })}
                            loading={loadingState}
                        />
                    </Space>
                )
            }
        },{
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (_, record) => {
                return (
                    <Space size={5}>
                        <Button type="link" size="small" onClick={() => edit_user(record)}>Edit</Button>
                        <>||</>
                        <Popconfirm title="Sure to delete?" placement="leftTop" onConfirm={() => delete_user(record)}>
                            <Button type="link" size="small" danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },{
            title: 'Access',
            key: 'access',
            width: 100,
            align: 'center',
            render: (_, record) => {
                let { avatar } = record;
                return (
                    <Tooltip title="Access Account" placement="topRight">
                        <Button type="link" size="small">
                            <Avatar src={avatar} icon={<UserOutlined />}/>
                        </Button>
                    </Tooltip>
                );
            }
        }
    ];

    /**
     * @author <hauvo1709@gmail.com>
     * @todo
     * @param
     * @return {void}
     */
    const handleAcceptableSeller = (data) => {
        const { checked } = data;
        if(checked !== undefined && data.seller_id !== undefined) {
            return accept_seller({
                is_accepted: checked ? 1 : 0,
                seller_id: data.seller_id
            });
        }
        return Helper.Notification('error', ['Acceptable Seller'], 'Error for Accepting');
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {mixed} pagination
     * @param {mixed} filters
     * @return {void}
     */
    const handleTableChange = (pagination, filters) => {
        let { status, is_publisher } = filters;
        setKeySearch({...keySearch, status, is_publisher});
        get_sellers(pagination.current, {...keySearch, status, is_publisher});
    }

    useEffect(() => {
        if(mouted) get_sellers(1, keySearch);
        return () => { set_mouted(false); }
    }, []);

    return (
        <>
            <div className="content">
                <Table
                    title={(() => (
                        <Row gutter={[8, 8]}>
                            <Col xs={24} xl={12}>
                                <Button
                                    type="primary"
                                    onClick={() =>{ setRouter('upsert', '') }}
                                >
                                    New User
                                </Button>
                            </Col>
                            <Col xs={24} xl={12}>
                                <Search placeholder="Search by name or email !!!"
                                    // onChange={(event) => {
                                    //     let { value } = event.target;
                                    //     setkeySearch({...keySearch, keyword: value});
                                    // }}
                                    // onSearch={()=>{
                                    //     getUsers(1, keySearch);
                                    // }}
                                    // enterButton
                                />
                            </Col>
                        </Row>
                    ))}
                    columns={columns}
                    bordered={true}
                    loading={loading_table}
                    dataSource={sellers}
                    pagination={pagination}
                    scroll={{ x: 1200 }}
                    onChange={handleTableChange}  // Callback executed when pagination, filters or sorter is changed
                    rowKey='id'
                />
            </div>
        </>
    );

}

export default ListSellers;
