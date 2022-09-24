import React, { useState, useContext, useEffect } from 'react';
import { UsersContext } from '../../Contexts/UsersContext';
import { Button, Drawer, Table, Input, Tooltip, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Helper from '../../Helper/Helper';
const { Search } = Input;

const DrawerGroups = ({visible, setVisible, selectedRowKeys, setSelectedRowKeys}) => {
    const { data, get_groups } = useContext(UsersContext);
    const { config } = data;
    const { status } = config;
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keySearch, setKeySearch] = useState({
        keyword: null,
    });
    const [pagination, setPagination] = useState({
        current: 1,
        defaultCurrent: 1,
        total: 0,
        defaultPageSize: 15,
        showSizeChanger: false,
        size: 'default'
    });
    const columns = [
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            width: 70,
            align: 'center',
            render: (_, record) => {
                let status = selectedRowKeys.find(item => item.id == record.id);
                return (
                    <Tooltip placement='topLeft' title={record.name}>
                        <Button
                            type={`${status ? 'primary' : 'dashed'}`}
                            shape='circle'
                            icon={<CheckOutlined />}
                            onClick={() => {
                                if(!status) {
                                    onSelect(record);
                                } else {
                                    Helper.Notification('error', '[Groups]', "This Item has been selected", 'topLeft');
                                }
                            }}
                        />
                    </Tooltip>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            align: 'center',
        },
        {
            title: 'Groups Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            render: (_, record) => {
                let { parent_group } = record;
                return (
                    <Space direction='vertical' size='small'>
                        <Tooltip placement='topLeft' title={record.name}>Groups: {record.name}</Tooltip>
                        <small>Groups Parent: {parent_group ? parent_group.name : ''}</small>
                    </Space>
                )
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            align: 'right',
            width: 80,
            render: (value) => {
                let text = status? status.find(item => item.value == value) : null;
                return (
                    <>{text ? text.text : ''}</>
                );
            }
        }
    ];

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return {void}
     */
    const onClose = () => {
        setVisible(false);
        setKeySearch({keyword: null});
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
        _get_groups(pagination.current, {...keySearch});
    }

    /**
     * @auhor : <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {number} page
     * @param {Object} keySearch
     * @return {void}
     */
    const _get_groups = (page, keySearch) => {
        setLoading(true);
        get_groups(page, keySearch).then((res) => {
            let { groups } = res.data;
            let { total, data, current_page, per_page } = groups;
            setDataSource(data);
            setPagination({...pagination, total, current: current_page, defaultPageSize: per_page});
        })
        .catch((errors) => {})
        .finally(() => {setLoading(false);});
    }

    /**
     * @auhor : <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} record
     * @return {void}
     */
    const onSelect = (record) => {
        let newSource = [...selectedRowKeys, record];
        setSelectedRowKeys(newSource);
    }

    useEffect(() => {
        if(visible) _get_groups(1, keySearch);
    }, [visible]);

    return (
        <Drawer
            title={<h6>{'Groups'}</h6>}
            width={720}
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{padding: '0'}}
        >
            <Table
                title={(() => (
                    <Search placeholder='Search by name !!!'
                        onChange={(event) => {
                            let { value } = event.target;
                            setKeySearch({...keySearch, keyword: value});
                        }}
                        onSearch={() => {_get_groups(1, keySearch);}}
                        enterButton
                    />
                ))}
                size='small'
                sticky={true}
                columns={columns}
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
                rowKey='id'
            />
        </Drawer>
    )
}

export default DrawerGroups;
