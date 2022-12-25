import React, { useContext, useState ,useEffect } from 'react';
import { UserOutlined, BellOutlined, ShoppingCartOutlined,
    HomeOutlined, CreditCardOutlined, TagOutlined, HeartOutlined
} from '@ant-design/icons';
import { Avatar, Menu, Row, Button, Layout } from 'antd';
import { createSearchParams } from 'react-router-dom';
const { Sider } = Layout;

const SideBar = (props) => {
    const {  bp, setRouter } = props;
    const { user } = props.data;
    const { axios } = bp;
    const [data, setData] = useState({
        user: {
            avatar: '',
            email: '',
            customer: {
                fullname: '',
                phone: '',
            }
        }
    });
    const menuItems = [
        { key: 1, label: <><Button type='link' onClick={() => setRouter({
            module: 'customer',
            controller: 'account',
            action: '#',
            id: '#'
        })}>Thông tin tài khoản</Button></>, icon: <UserOutlined /> },
        { key: 2, label: <><Button type='link' onClick={() => setRouter({
            module: 'customer',
            controller: 'notification',
            action: '#',
            id: '#'
        })}>Thông báo của tôi</Button></>, icon: <BellOutlined /> },
        { key: 3, label: <><Button type='link' onClick={() => setRouter({
            module: 'customer',
            controller: 'orders',
            action: '#',
            id: '#'
        })}>Quản lý đơn hàng</Button></>, icon: <ShoppingCartOutlined /> },
        { key: 4, label: <><Button type='link' onClick={() => setRouter({
            module: 'customer',
            controller: 'address',
            action: '#',
            id: '#'
        })}>Sổ địa chỉ</Button></>, icon: <HomeOutlined /> },
        // { key: 5, label: <><Button type='link' onClick={() => setRouter({
        //     module: 'customer',
        //     controller: 'payment',
        //     action: '#',
        //     id: '#'
        // })}>Thông tin thanh toán</Button></>, icon: <CreditCardOutlined /> },
        // { key: 6, label: <><Button type='link' onClick={() => setRouter({
        //     module: 'customer',
        //     controller: 'reviewed',
        //     action: '#',
        //     id: '#'
        // })}>Đánh giá sản phẩm</Button></>, icon: <TagOutlined /> },
        // { key: 7, label: <><Button type='link' onClick={() => setRouter({
        //     module: 'customer',
        //     controller: 'favor',
        //     action: '#',
        //     id: '#'
        // })}>Sản phẩm yêu thích</Button></>, icon: <HeartOutlined /> }
    ];

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get account info
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_account = () => {
        return axios
        .get_secured()
        .post(`/customer/customer/get_by_auth`);
    }

    useEffect(() => {
        if(user) {
            if(user.is_login) {
                if(user.customer) {
                    setData({...data, user: {...user}});
                }
            }
        }
    }, [props]);

    return (
        <Sider className="customer-layout-background" width={250} style={{ backgroundColor: '#fff' }} >
            <Row className='customer_account_container' align="middle" style={{ background: 'white', padding: '1rem', gap: '1rem' }}>
                <Avatar size={64} src={data.user.avatar ? data.user.avatar : ``} />
                <div className='customer_account_text'>
                    <h5>Tài khoản của</h5>
                    <h3>
                        { data.user.customer.fullname ? data.user.customer.fullname : 'Loading...' }
                    </h3>
                </div>
            </Row>
            <Menu mode="inline"
                items={menuItems}
                style={{}}
            />
        </Sider>
    )
}

export default SideBar;
