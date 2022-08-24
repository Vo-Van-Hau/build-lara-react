import React, { useEffect, useContext, useState } from 'react';
import { UsersContext } from '../Contexts/UsersContext';
import Helper from '../Helper/helper';
import { Table, Space, Popconfirm, Input, Button, Row, Col, Avatar, Popover, Tooltip } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
const { Search } = Input;

const ListUsers = () => {
    const { data, get_users, set_mouted } = useContext(UsersContext);
    const { users, config, pagination, loading_table, mouted } = data;
    const [ user, setUser ] = useState({});
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
        },
        {
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
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
            width: 200,
        },
        {
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
        },
        {
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
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: 150,
            render: (_, record) => {
                return (
                    <Space size={5}>
                        <Button type="link" size="small">Edit</Button>
                        <>||</>
                        <Popconfirm title="Sure to delete?" placement="leftTop">
                            <Button type="link" size="small" danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
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

    // const access = user =>{
    //     setTable();
    //     accessUser(user.id).then((res)=>{
    //         let {status, mess} = res.data;
    //         if(status){
    //             let {redirect_to} = res.data;
    //             if(redirect_to){
    //                 window.location.replace(redirect_to);
    //             }
    //             Helper.Noti('success', '['+user.email+']', mess);
    //         }else{
    //             Helper.Noti('error', '['+user.email+']', mess);
    //         }
    //     }).catch((err) =>{
    //     }).finally(() =>{
    //         setTable();
    //     })
    // }

    // const update = (record) => {
    //     setRouter("detail", record.id);
    // }

    // const remove = (record) => {
    //     deleteUser(record.id);
    // }

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
        get_users(pagination.current, {...keySearch, status, is_publisher});
    }

    useEffect(() => {
        if(mouted) get_users(1, keySearch);
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
                                    onClick={() =>{ setRouter("detail", '') }}
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
                    dataSource={users}
                    pagination={pagination}
                    scroll={{ x: 1200 }}
                    onChange={handleTableChange}  // Callback executed when pagination, filters or sorter is changed
                    rowKey='id'
                />
            </div>
        </>
    );

}

export default ListUsers;
