/**
 * Groups - Thêm user vào groups
 * @author Quang Huy <quanghuy.phung@urekamedia.vn>
 * @since 1.0.0
 * @todo Action Groups trong module Users
 * @return View
 */
import React,{ useContext, useState ,useEffect } from 'react';
import { RolesContext } from '../Contexts/RolesContext';
import ListUsers from './Components/ListUsers';
import Helper from '../Helper/helper';
import { Drawer, Table, Button, Avatar } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
const ActUser = ({role, visible, setDrawer}) => {
    const { data, getUserbyRoles } = useContext(RolesContext);
    const [ loadingTable, setLoadingTable ] = useState(false);
    const [ users, setUsers ] = useState([]);
    const [viewAct, setViewAct] = useState(false);

    useEffect(() => {
        if(visible){
            setLoadingTable(true);
            getUserbyRoles(role.id).then((res) => {
                let {result} = res.data;
                let {users} = result;
                setUsers(users);
            }).catch((err)=>{
            }).finally(() => {
                setLoadingTable(false);
            });
        }
    }, [visible]);

    const onClose = () =>{
        setDrawer(false);
        setUsers([]);
    }

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
            title={role.id ? <>{'Add User'}<br /><small>{role.name}</small></> : <></>}
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
                role={role} 
                items={users} 
                setItems={setUsers} 
                visible={viewAct} 
                setDrawer={setViewAct}
            />
        </Drawer>
    );
}
export default ActUser;