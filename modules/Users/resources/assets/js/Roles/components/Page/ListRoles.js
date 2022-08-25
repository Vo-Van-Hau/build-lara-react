import React, { useEffect, useContext, useState } from 'react';
import { RolesContext } from '../Contexts/RolesContext';
import ActGroup from '../Actions/ActGroup';
import ActRole from '../Actions/ActRole';
import ActUser from '../Actions/ActUser';
import { Table, Space, Popconfirm, Input, Button, Row, Col, Tooltip } from 'antd';
import { UsergroupAddOutlined, ToolOutlined } from '@ant-design/icons';
const { Search } = Input;

const ListRoles = () => {
    // const { data, getRoles, destroyRoles, setMouted } = useContext(RolesContext);
    const { data, get_roles, set_mouted } = useContext(RolesContext);
    const { roles, config, pagination, loading_table, mouted } = data;
    const [role, setRole] = useState({});
    const [viewAct, setViewAct] = useState(false);
    const [viewUsers, setViewUsers] = useState(false);
    const [viewRoles, setViewRoles] = useState(false);
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
        // {
        //     title: 'User',
        //     dataIndex: 'User',
        //     key: 'User',
        //     width: 100,
        //     align: 'center',
        //     render: (_, record) => {
        //         return (
        //             <Tooltip title="Add User" placement="topRight">
        //                 <Button type="dashed" shape="circle" icon={<UsergroupAddOutlined />} onClick={() => groupUser(record)}/>
        //             </Tooltip>
        //         );
        //     }
        // },
        // {
        //     title: 'Acl',
        //     dataIndex: 'acl',
        //     key: 'acl',
        //     width: 100,
        //     align: 'center',
        //     render: (_, record) => {
        //         return (
        //             <Tooltip title="Change Acl" placement="topRight">
        //                 <Button type="dashed" shape="circle" icon={<ToolOutlined />} onClick={() => groupRoles(record)}/>
        //             </Tooltip>
        //         );
        //     }
        // },
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
        }
    ];

    // const groupRoles = (record) => {
    //     setRole(record);
    //     setViewRoles(true);
    // }

    // const groupUser = (record) => {
    //     setRole(record);
    //     setViewUsers(true);
    // }

    // const update = (record) => {
    //     setRole(record);
    //     setViewAct(true);
    // }

    // const remove = (record) => {
    //     destroyRoles(record.id);
    // }

    // const newGroup = () =>{
    //     setRole({});
    //     setViewAct(true);
    // }

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
        <div className="content">
            <Table
                title={(() => (
                    <Row gutter={[8, 8]}>
                        <Col xs={24} xl={12}>
                            <Button
                                type="primary"
                                // onClick={() =>{ newGroup() }}
                            >
                                New Role
                            </Button>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Search placeholder="Search by name !!!"
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
            {/* <ActGroup role={role} visible={viewAct} setDrawer={setViewAct}/>
            <ActRole role={role} visible={viewRoles} setDrawer={setViewRoles}/>
            <ActUser role={role} visible={viewUsers} setDrawer={setViewUsers}/> */}
            {/* List Roles */}
        </div>
    )
}
export default ListRoles;
