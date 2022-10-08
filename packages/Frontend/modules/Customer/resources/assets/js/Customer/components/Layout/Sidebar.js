import React, { useContext, useState ,useEffect } from 'react';
import { UserOutlined, BellOutlined, ShoppingCartOutlined,
    HomeOutlined, CreditCardOutlined, TagOutlined, HeartOutlined
} from '@ant-design/icons';
import { Avatar, Menu, Row, Button, Layout } from 'antd';
import { createSearchParams } from 'react-router-dom';
const { Sider } = Layout;

const SideBar = (props) => {
    const {  bp, setRouter } = props;
    const { axios } = bp;
    const [data, setData] = useState({
        account: {
            fullname: '',
            phone: '',
            user: {
                avatar: '',
                email: '',
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
        { key: 4, label: <><Button type='link'>Sổ địa chỉ</Button></>, icon: <HomeOutlined /> },
        { key: 5, label: <><Button type='link'>Thông tin thanh toán</Button></>, icon: <CreditCardOutlined /> },
        { key: 6, label: <><Button type='link'>Đánh giá sản phẩm</Button></>, icon: <TagOutlined /> },
        { key: 7, label: <><Button type='link'>Sản phẩm yêu thích</Button></>, icon: <HeartOutlined /> }
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
        get_account()
        .then((res) => {
            if(res.data.status) {
                let { account } = res.data.data;
                setData({...data, account});
            }
        })
        .catch((errors) => {})
        .finally(() => {});
    }, []);

    return (
        <Sider className="customer-layout-background" width={250} style={{ backgroundColor: '#fff' }} >
            <Row className='customer_account_container' align="middle" style={{ background: 'white', padding: '1rem', gap: '1rem' }}>
                <Avatar size={64} src={data.account.user.avatar ? data.account.user.avatar : 'https://salt.tikicdn.com/desktop/img/avatar.png'} />
                <div className='customer_account_text'>
                    <h5>Tài khoản của</h5>
                    <h3>
                        { data.account.fullname ? data.account.fullname : 'Loading' }
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
