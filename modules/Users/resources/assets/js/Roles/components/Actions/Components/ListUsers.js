/**
 * Groups - Thêm user vào groups
 * @author Quang Huy <quanghuy.phung@urekamedia.vn>
 * @since 1.0.0
 * @todo Action Groups trong module Users
 * @return View
 */
import React,{ useContext, useState ,useEffect } from 'react';
import { RolesContext } from '../../Contexts/RolesContext';
import Helper from '../../Helper/helper';
import { Drawer, Table, Button, Tooltip, Avatar, Input } from 'antd';
import { CheckOutlined, UserOutlined } from '@ant-design/icons';
const { Search } = Input;
const intvalues = {
    current: 1,
    defaultCurrent: 1,
    total: 0,
    defaultPageSize: 15,
    showSizeChanger: false
}
const ListUsers = ({role, items, setItems, visible, setDrawer}) => {
    const { data, getUsers, storageRoleUser, setUserGroup } = useContext(RolesContext);
    const [ loadingTable, setLoadingTable ] = useState(false);
    const [ keyword, setKeyword ] = useState(null);
    const [ listUsers, setListUsers ] = useState([]);
    const [ pagination, setPagination ] = useState(intvalues);
    
    useEffect(() => {
        if(visible){
            getListUsers(1);
        }
    }, [visible]);


    const getListUsers = (page) => {
        setLoadingTable(true);
        getUsers(page, {keyword}).then(res =>{
            let { users } = res.data;
            let { total, data, current_page, per_page } = users;
            setListUsers(data);
            setPagination({...pagination, total, current: current_page, defaultPageSize: per_page});
        }).catch(err =>{
        }).finally(() =>{
            setLoadingTable(false);
        });
    }

    const onClose = () =>{
        setDrawer(false);
        setListUsers();
        setPagination(intvalues);
    }

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
                            type={`${status?"primary":"dashed"}`} 
                            shape="circle" 
                            icon={<CheckOutlined />} 
                            onClick={() => {
                                if(!status){
                                    onSelect(record);
                                }else{
                                    Helper.Noti('error', '[User]', "This Item has been selected");
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
            title: 'Users',
            dataIndex: 'fullname',
            key: 'fullname',
            ellipsis: true,
            render: (_, record) => {
                return (
                    <>{record.name}<br /><small>{record.email}</small></>
                )
            }
        },{
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 80,
            align: 'center',
            render: (_, record) => {
                let { avatar } = record;
                if(avatar){
                    return (<Avatar src={avatar}/>);
                }
                return (<Avatar icon={<UserOutlined />}/>)
            }
        }
    ]

    const handleTableChange = (pagination) => {
        getListUsers(pagination.current);
    }

    const onSelect = (record) =>{
        let values = {
            role_id: role.id,
            user_id: record.id,
        }
        setLoadingTable(true);
        storageRoleUser(values).then((res) =>{
            let{status, mess} =  res.data;
            if(status){
                let newItems = [...items, record];
                setItems(newItems);
                setUserGroup(role.id, newItems, record);
                Helper.Noti('success', '[Users]', mess);
            }else{
                Helper.Noti('error', '[Users]', mess);
            }
        }).catch((err) =>{
        }).finally(() =>{
            setLoadingTable(false);
        })
    }

    return(
        <Drawer
            title={role.id ? <>{'Add User'}<br /><small>{role.name}</small></> : <></>}
            width={520}
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{padding: "0"}}
        >
            <Table
                title={(() => (
                    <Search placeholder="Search by name or email !!!" 
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