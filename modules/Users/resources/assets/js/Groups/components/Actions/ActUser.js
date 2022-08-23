/**
 * Groups - Thêm user vào groups
 * @author Quang Huy <quanghuy.phung@urekamedia.vn>
 * @since 1.0.0
 * @todo Action Groups trong module Users
 * @return View
 */
import React,{ useContext, useState ,useEffect } from 'react';
import { GroupsContext } from '../Contexts/GroupsContext';
import ListUsers from './Components/ListUsers';
import Helper from '../Helper/helper';
import { Drawer, Table, Button, Avatar } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
const ActUser = ({group, visible, setDrawer}) => {
    const { data, getUserbyGroups } = useContext(GroupsContext);
    const [ loadingTable, setLoadingTable ] = useState(false);
    const [ users, setUsers ] = useState([]);
    const [ viewAct, setViewAct ] = useState(false);

    const onClose = () =>{
        setDrawer(false);
        setUsers([]);
    }

    useEffect(() => {
        if(visible){
            setLoadingTable(true);
            getUserbyGroups(group.id).then((res) => {
                let {result} = res.data;
                let {users} = result;
                setUsers(users);
            }).catch((err)=>{
            }).finally(() => {
                setLoadingTable(false);
            });
        }
    }, [visible]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 75,
            fixed: 'left',
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
    ];

    return(
        <Drawer
            title={group.id ? <>{'Add User'}<br /><small>{group.name}</small></> : <></>}
            width={520}
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{padding: "0"}}
        >
            <Table
                title={(() => (
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined />} 
                        onClick={() => {setViewAct(true)}} 
                    >
                        List Users
                    </Button>
                ))}
                size="small"
                columns={columns}
                bordered={false}
                dataSource={users}
                pagination={false}
                loading={loadingTable}
                rowKey='id'
            />

            <ListUsers 
                group={group} 
                items={users} 
                setItems={setUsers} 
                visible={viewAct} 
                setDrawer={setViewAct}
            />
        </Drawer>
    );
}
export default ActUser;