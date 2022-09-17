import React,{ useContext, useState ,useEffect } from 'react';
import { GroupsContext } from '../../Contexts/GroupsContext';
import Helper from '../../Helper/Helper';
import { Drawer, Table, Button, Tooltip, Avatar, Input } from 'antd';
import { CheckOutlined, UserOutlined } from '@ant-design/icons';
const { Search } = Input;
const initialvalues = {
    current: 1,
    defaultCurrent: 1,
    total: 0,
    defaultPageSize: 15,
    showSizeChanger: false
}

const ListUsers = ({group, items, setItems, visible, setDrawer}) => {
    const { data, get_users, set_user_group, storage_user_to_group } = useContext(GroupsContext);
    const [loadingTable, setLoadingTable] = useState(false);
    const [keyword, setKeyword] = useState(null);
    const [listUsers, setListUsers] = useState([]);
    const [pagination, setPagination] = useState(initialvalues);
    const columns = [
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            width: 50,
            align: 'center',
            render: (_, record) => {
                let status = items.find(item => item.id == record.id);
                return (
                    <Tooltip title={`${status?"Selected":"Select"}`}>
                        <Button
                            type={`${status? 'primary' : 'dashed'}`}
                            shape='circle'
                            icon={<CheckOutlined />}
                            onClick={() => {
                                if(!status) {
                                    onSelect(record);
                                } else {
                                    Helper.Notification('error', '[User]', 'This Item has been selected');
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
            title: 'Users',
            dataIndex: 'fullname',
            key: 'fullname',
            ellipsis: true,
            render: (_, record) => {
                return (
                    <>{record.name}<br/><small>{record.email}</small></>
                )
            }
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 80,
            align: 'center',
            render: (_, record) => {
                let { avatar } = record;
                if(avatar) return (<Avatar src={avatar}/>);
                return (<Avatar icon={<UserOutlined />}/>);
            }
        }
    ];

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get all users
     * @param {number} page
     * @return {void}
     */
     const get_list_users = (page) => {
        setLoadingTable(true);
        get_users(page, {keyword})
        .then(res => {
            let { users } = res.data;
            let { total, data, current_page, per_page } = users;
            setListUsers(data);
            setPagination({...pagination, total, current: current_page, defaultPageSize: per_page});
        })
        .catch(errors =>{})
        .finally(() => {setLoadingTable(false);});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {number} pagination
     * @param {mixed} filters
     * @return {void}
     */
    const handleTableChange = (pagination = 1) => {
        return get_list_users(pagination.current);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: close Drawer
     * @return {void}
     */
    const onClose = () =>{
        setDrawer(false);
        setListUsers([]);
        setPagination(initialvalues);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Objetc} record
     * @return {void}
     */
    const onSelect = (record) =>{
        let values = {
            group_id: group.id,
            user_id: record.id,
        }
        setLoadingTable(true);
        storage_user_to_group(values)
        .then((res) => {
            let{status, message} =  res.data;
            if(status) {
                let new_items = [...items, record];
                setItems(new_items);
                set_user_group(group.id, new_items);
                Helper.Notification('success', '[Users]', message);
            } else {
                Helper.Notification('error', '[Users]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {setLoadingTable(false);});
    }

    useEffect(() => {
        if(visible) get_list_users(1);
    }, [visible]);

    return(
        <Drawer
            title={group.id ? <>{'Users'}<br /><small>{group.name}</small></> : <></>}
            width={520}
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{padding: '0'}}
        >
            <Table
                title={(() => (
                    <Search placeholder='Search by name or email !!!'
                        onChange={(event) => {
                            let { value } = event.target;
                            setKeyword(value);
                        }}
                        onSearch={()=>{
                            getListUsers(1);
                        }}
                        enterButton
                    />
                ))}
                size="small"
                sticky={true}
                columns={columns}
                loading={loadingTable}
                dataSource={listUsers}
                pagination={pagination}
                onChange={handleTableChange}
                rowKey='id'
            />
        </Drawer>
    );

}

export default ListUsers;
