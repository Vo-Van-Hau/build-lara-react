import React,{ useContext, useState ,useEffect } from 'react';
import { RolesContext } from '../Contexts/RolesContext';
import ListUsers from './Components/ListUsers';
import { Drawer, Table, Button, Avatar } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

const ActionUser = ({role, visible, setDrawer}) => {

    const { data, get_users_by_role } = useContext(RolesContext);
    const [loadingTable, setLoadingTable] = useState(false);
    const [users, setUsers] = useState([]);
    const [viewAction, setViewAction] = useState(false);
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
            title: 'Users',
            dataIndex: 'fullname',
            key: 'fullname',
            ellipsis: true,
            render: (_, record) => {
                return (
                    <>{record.name}<br /><small>{record.email}</small></>
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
                return (<Avatar icon={<UserOutlined />}/>)
            }
        }
    ];

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: close Drawer
     * @return {void}
     */
    const onClose = () =>{
        setDrawer(false);
        setUsers([]);
    }

    useEffect(() => {
        if(visible) {
            setLoadingTable(true);
            get_users_by_role(role.id)
            .then((res) => {
                let {result} = res.data;
                let {users} = result;
                setUsers(users);
            })
            .catch((errors)=>{})
            .finally(() => {setLoadingTable(false);});
        }
    }, [visible]);

    return(
        <Drawer
            title={role.id ? <>{role.name}</> : <></>}
            width={520}
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{padding: '0'}}
        >
            <Table
                title={(() => (
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={() => {setViewAction(true)}}
                    >
                        List Users
                    </Button>
                ))}
                size='small'
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
                visible={viewAction}
                setDrawer={setViewAction}
            />
        </Drawer>
    );
}

export default ActionUser;
