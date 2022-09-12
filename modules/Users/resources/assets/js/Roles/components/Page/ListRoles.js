import React, { useEffect, useContext, useState } from 'react';
import { RolesContext } from '../Contexts/RolesContext';
import Helper from '../Helper/Helper';
import ActionRole from '../Actions/ActionRole';
import ActionUser from '../Actions/ActionUser';
import ActionACL from '../Actions/ActionACL';
import { Table, Space, Popconfirm, Input, Button, Row, Col, Tooltip } from 'antd';
import { UsergroupAddOutlined, ToolOutlined } from '@ant-design/icons';
const { Search } = Input;

const ListRoles = () => {
    const { data, get_roles, set_mouted, destroy_role, set_table_loading } = useContext(RolesContext);
    const { roles, config, pagination, loading_table, mouted } = data;
    const [role, setRole] = useState({});
    const [viewAction, setViewAction] = useState(false);
    const [viewUsers, setViewUsers] = useState(false);
    const [viewACL, setViewACL] = useState(false);
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
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
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
            title: 'Users',
            dataIndex: 'users',
            key: 'users',
            width: 100,
            ellipsis: true,
            render: (item) => {
                return (
                    <>{`${item.length} Users`}</>
                );
            }
        },
        {
            title: 'User Actions',
            dataIndex: 'User',
            key: 'User',
            width: 100,
            align: 'center',
            render: (_, record) => {
                return (
                    <Tooltip title='Add User' placement='topRight'>
                        <Button type='dashed' shape='circle' icon={<UsergroupAddOutlined />} onClick={() => group_users(record)}/>
                    </Tooltip>
                );
            }
        },
        {
            title: 'ACL',
            dataIndex: 'acl',
            key: 'acl',
            width: 100,
            align: 'center',
            render: (_, record) => {
                return (
                    <Tooltip title='Change ACL' placement='topRight'>
                        <Button type='dashed' shape='circle' icon={<ToolOutlined />} onClick={() => group_acl(record)}/>
                    </Tooltip>
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
                        <Button type='link' size='small' onClick={() => edit_role(record)}>Edit</Button>
                        <>||</>
                        <Popconfirm title='Sure to delete?' placement='leftTop' onConfirm={() => delete_role(record)}>
                            <Button type='link' size='small' danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: add user to role
     * @param {Object} record
     * @return {void}
     */
    const group_users = (record) => {
        setRole(record);
        setViewUsers(true);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} record
     * @return {void}
     */
    const group_acl = (record) => {
        setRole(record);
        setViewACL(true);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return {void}
     */
    const new_role = () =>{
        setRole({});
        setViewAction(true);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} record
     * @return {void}
     */
    const edit_role = (record) => {
        setRole(record);
        setViewAction(true);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} record
     * @return {void}
     */
    const delete_role = (record) => {
        destroy_role(record.id)
        .then((res) => {
            let { status, message } = res.data;
            if (status) {
                get_roles(1, {});
                Helper.Notification('success', '[Delete Role]', message);
            } else {
                Helper.Notification('error', '[Delete Role]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

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
        setRole(pagination.current, {...keySearch, status});
        get_roles(pagination.current, {...keySearch, status});
    }

    useEffect(() => {
        if(mouted) get_roles(1, keySearch);
        return () => { set_mouted(false); }
    }, []);

    return (
        <>
            <Table
                title={(() => (
                    <Row gutter={[8, 8]}>
                        <Col xs={24} xl={12}>
                            <Button type='primary' onClick={() => {new_role()}}>
                                New Role
                            </Button>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Search placeholder='Search by name !!!'
                                // onChange={(event) => {
                                //     let { value } = event.target;

                                // }}
                                // onSearch={()=>{
                                //     setRole(1, keySearch);
                                //     getRoles(1, keySearch);
                                // }}
                                // enterButton
                            />
                        </Col>
                    </Row>
                ))}
                columns={columns}
                bordered={true}
                loading={loading_table}
                dataSource={roles}
                pagination={pagination}
                scroll={{ x: 960 }}
                onChange={handleTableChange}
                rowKey='id'
            />
            <ActionRole role={role} visible={viewAction} setDrawer={setViewAction} />
            <ActionACL role={role} visible={viewACL} setDrawer={setViewACL}/>
            <ActionUser role={role} visible={viewUsers} setDrawer={setViewUsers}/>
        </>
    )
}
export default ListRoles;
