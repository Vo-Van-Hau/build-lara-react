import React,{ useContext, useState ,useEffect } from 'react';
import { GroupsContext } from '../Contexts/CartContextProvider';
import ListUsers from './Components/ListUsers';
import Helper from '../Helper/Helper';
import { Drawer, Table, Button, Avatar } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

const ActionUser = ({group, visible, setDrawer}) => {
    const { data, get_user_by_groups } = useContext(GroupsContext);
    const [loadingTable, setLoadingTable] = useState(false);
    const [users, setUsers] = useState([]);
    const [viewAction, setViewAction] = useState(false);

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
        if(visible){
            setLoadingTable(true);
            get_user_by_groups(group.id)
            .then((res) => {
                let {result} = res.data;
                let {users} = result;
                setUsers(users);
            })
            .catch((errors) => {})
            .finally(() => {setLoadingTable(false);});
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
                return (<Avatar icon={<UserOutlined />}/>)
            }
        }
    ];

    return(
        <Drawer
            title={group.id ? <>{group.name}</> : <></>}
            width={520}
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{padding: '0'}}
        >
            <Table
                title={(() => (
                    <>
                        <Button type='primary' icon={<PlusOutlined />} onClick={() => {setViewAction(true)}}>
                            List Users
                        </Button>
                    </>
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
                group={group}
                items={users}
                setItems={setUsers}
                visible={viewAction}
                setDrawer={setViewAction}
            />
        </Drawer>
    );
}

export default ActionUser;
