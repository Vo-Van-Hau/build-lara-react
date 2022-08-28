import React, { useState, useContext } from 'react';
import { UsersContext } from '../../Contexts/UsersContext';
import { Table, Popconfirm, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DrawerPublishers from './DrawerPublishers';

const UserPublishers = ({userPublishers, setUserPublishers}) => {
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
            title: 'Publisher Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
        },{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            align: 'right',
            width: 80,
            render: (value) => {
                let text = status ? status.find(item => item.value == value) : null;
                return (
                    <>{text ? text.text : ''}</>
                );
            }
        },{
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: 150,
            render: (_, record) => {
                return (
                    <Popconfirm title='Sure to remove?' placement='leftTop' onConfirm={() => remove(record)}>
                        <Button type='link' size='small' danger>Remove</Button>
                    </Popconfirm>
                );
            }
        }
    ];

    /**
     * @author : <vanhau.vo@urekamedia.vn>
     * @todo
     * @param {Objetc} record
     * @return {void}
     */
    const remove = (record) => {
        let newSources = userPublishers.filter(item => item.id !== record.id);
        setUserPublishers([...newSources]);
    }

    return (
        <>
            <Table
                title={(() => (
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={() => {setVisible(true);}}
                    >
                        Publishers
                    </Button>
                ))}
                size='small'
                columns={columns}
                bordered={true}
                loading={loading}
                dataSource={userPublishers}
                pagination={false}
                scroll={{ x: 750 }}
                rowKey='id'
            />
            <DrawerPublishers
                visible={visible}
                setVisible={setVisible}
                selectedRowKeys={userPublishers}
                setSelectedRowKeys={setUserPublishers}
            />
        </>

    )
}

export default UserPublishers;
