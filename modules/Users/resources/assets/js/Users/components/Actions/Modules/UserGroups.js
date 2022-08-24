import React, { useState, useContext, useEffect } from 'react';
import { UsersContext } from '../../Contexts/UsersContext';

import { Table, Popconfirm, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DrawerGroups from './DrawerGroups';

const UserGroups = ({userGroups, setUserGroups}) => {
    const { data } = useContext(UsersContext);
    const { config } = data;
    const { status } = config;
    
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 75,
            fixed: 'left',
            align: 'center',
        },{
            title: 'Group Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
        },{
            title: 'Groups Parent',
            dataIndex: 'parent_group',
            key: 'parent_group',
            ellipsis: true,
            width: 250,
            render: (parent_group) => {
                return (
                    <>{parent_group?parent_group.name:""}</>
                )
            }
        },{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            align: 'right',
            width: 80,
            render: (value) => {
                let text = status?status.find(item => item.value == value):null;
                return (
                    <>{text?text.text:""}</>
                );
            }
        },{
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: 150,
            render: (_, record) => {
                return (
                    <Popconfirm title="Sure to remove?" placement="leftTop" onConfirm={() => remove(record)}>
                        <Button type="link" size="small" danger>Remove</Button>
                    </Popconfirm>
                );
            }
        }
    ];

    const remove = (record) => {
        let newItem = userGroups.filter(item => item.id !== record.id);
        setUserGroups([...newItem]);
    }

    return (
        <>
            <Table
                title={(() => (
                    <Button 
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() =>{ 
                            setVisible(true);
                        }}
                    >
                        Groups
                    </Button>
                ))}
                size="small"
                columns={columns}
                bordered={true}
                loading={loading}
                dataSource={userGroups}
                pagination={false}
                scroll={{ x: 750 }} 
                rowKey='id' 
            />
            <DrawerGroups 
                visible={visible} 
                setVisible={setVisible} 
                selectedRowKeys={userGroups} 
                setSelectedRowKeys={setUserGroups}
            />
        </>
        
    )
}

export default UserGroups;