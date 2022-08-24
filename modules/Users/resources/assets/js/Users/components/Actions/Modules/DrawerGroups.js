import React, { useState, useContext, useEffect } from 'react';
import { UsersContext } from '../../Contexts/UsersContext';
import { Button, Drawer, Table, Input, Tooltip, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Helper from '../../Helper/helper';
const { Search } = Input;

const DrawerGroups = ({visible, setVisible, selectedRowKeys, setSelectedRowKeys}) => {
    const { data, getGroups } = useContext(UsersContext);
    const { config } = data;
    const { status } = config;
    const [ dataSource, setDataSource ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keySearch, setkeySearch] = useState({
        keyword: null,
    });
    const [pagination, setPagination] = useState({
        current: 1,
        defaultCurrent: 1,
        total: 0,
        defaultPageSize: 15,
        showSizeChanger: false,
        size:"default"
    });

    useEffect(() => {
        if(visible){
            getlist(1, keySearch);
        }
    }, [visible]);

    const onClose = () => {
        setVisible(false);
        setkeySearch({keyword: null});
    }

    const handleTableChange = (pagination) =>{
        getlist(pagination.current, {...keySearch});
    }

    const getlist = (page, keySearch) => {
        setLoading(true);
        getGroups(page, keySearch).then((res) =>{
            let result= res.data;
            let { total, data, current_page, per_page } = result.data;
            setDataSource(data);
            setPagination({ ...pagination, total, current: current_page, defaultPageSize: per_page });
        }).catch((err) =>{
        }).finally(() =>{
            setLoading(false);
        })
    }

    const onSelect = (record) =>{
        let newSource = [...selectedRowKeys, record];
        setSelectedRowKeys(newSource);
    }

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
                    <Tooltip placement="topLeft" title={record.name}>
                        <Button 
                            type={`${status?"primary":"dashed"}`} 
                            shape="circle" 
                            icon={<CheckOutlined />} 
                            onClick={() => {
                                if(!status){
                                    onSelect(record);  
                                }else{
                                    Helper.Noti('error', '[AdSource]', "This Item has been selected",'topLeft');
                                }
                            }}
                        />
                    </Tooltip>
                )
            }
        },{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            align: 'center',
        },{
            title: 'Groups Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            render: (_, record) => {
                let { parent_group } = record;
                return (
                    <Space direction="vertical" size="small">
                        <Tooltip placement="topLeft" title={record.name}>Groups: {record.name}</Tooltip>
                        <small>Groups Parent: {parent_group?parent_group.name:""}</small>
                    </Space>
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
        }
    ];

    return (
        <Drawer
            title={<h6>{'Groups'}</h6>}
            width={720}
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{padding: "0"}}
        >
            <Table
                title={(() => (
                    <Search placeholder="Search by name !!!" 
                        onChange={(event) => {
                            let { value } = event.target;
                            setkeySearch({...keySearch, keyword: value});
                        }}
                        onSearch={()=>{
                            getlist(1, keySearch);
                        }} 
                        enterButton 
                    />
                ))}
                size="small"
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