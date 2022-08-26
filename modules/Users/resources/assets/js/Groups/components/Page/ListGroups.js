import React, { useEffect, useContext, useState } from 'react';
import { GroupsContext } from '../Contexts/GroupsContext';
import ActionGroup from '../Actions/ActionGroup';
// import ActUser from '../Actions/ActUser';
import { Table, Space, Popconfirm, Input, Button, Row, Col, Tooltip } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import Helper from '../Helper/Helper';
const { Search } = Input;

const ListGroups = (props) => {
    const { data, get_groups, set_mouted, destroy_group, set_table_loading } = useContext(GroupsContext);
    const { config, mouted, groups, loading_table, pagination } = data;
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
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
        },
        {
            title: 'Parent',
            dataIndex: 'parent_group',
            key: 'parent_group',
            width: 200,
            ellipsis: true,
            render: (item) => {
                return (
                    <>{item ? item.name : ''}</>
                );
            }
        },
        {
            title: 'Users',
            dataIndex: 'users',
            key: 'users',
            width: 150,
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
        //                 <Button type="dashed" shape="circle" icon={<UsergroupAddOutlined />} onClick={() => group_user(record)}/>
        //             </Tooltip>
        //         );
        //     }
        // },
        {
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
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: 150,
            render: (_, record) => {
                return (
                    <Space size={5}>
                        <Button type="link" size="small" onClick={() => edit_group(record)}>Edit</Button>
                        <>||</>
                        <Popconfirm title="Sure to delete?" placement="leftTop" onConfirm={() => delete_group(record)}>
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
     * @return {void}
     */
    const new_group = () => {
        setGroup({});
        setViewAction(true);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: update an existed record
     * @param {Object} record
     * @return {void}
     */
    const edit_group = (record) => {
        setGroup(record);
        setViewAction(true);
    }

    // /**
    //  * @author: <vanhau.vo@urekamedia.vn>
    //  * @todo: remove an existed record
    //  * @param {Object} record
    //  * @return {void}
    //  */
    // const remove_group = (record) => {
    //     destroyGroup(record.id);
    // }
     /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: remove an existed record
     * @param {Object} record
     * @return {void}
     */
    const delete_group = (record) => {
        destroy_group(record.id)
        .then((res) => {
            console.log(res);
            let { status, message } = res.data;
            if (status) {
                get_groups(1, {});
                Helper.Notification('success', '[Delete Group]', message);
            } else {
                Helper.Notification('error', '[Delete Group]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    // const group_user = (record) => {
    //     setGroup(record);
    //     setViewUsers(true);
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
        get_groups(pagination.current, {...keySearch, status});
    }

    useEffect(() => {
        if(mouted) get_groups(1, keySearch);
        return () => {set_mouted(false);}
    }, []);

    return (
        <div className="content">
            <Table
                title={(() => (
                    <Row gutter={[8, 8]}>
                        <Col xs={24} xl={12}>
                            <Button
                                type="primary"
                                onClick={() => {new_group()}}
                            >
                                New Group
                            </Button>
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
                dataSource={groups}
                pagination={pagination}
                scroll={{ x: 960 }}
                onChange={handleTableChange} // Callback executed when pagination, filters or sorter is changed
                rowKey='id'
            />
            <ActionGroup group={group} visible={viewAction} setDrawer={setViewAction}/>
            {/* <ActUser group={group} visible={viewUsers} setDrawer={setViewUsers}/> */}
        </div>
    );
}

export default ListGroups;
