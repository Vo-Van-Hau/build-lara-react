import React, { useState } from 'react';
import { Col, Row, Image, Input, Modal, Button, Form, Typography, Space, Badge, Dropdown } from 'antd';
import { UserOutlined, SearchOutlined, ShoppingCartOutlined, DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;
const { Search } = Input;

const HeaderSection = (props) => {

    const { data, history } = props;
    const { user } = data;
    const { is_login } = user;

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @returns {Object}
     */
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        console.log('show login')
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param {Object} props
     * @returns
     */
    const AuthenticatedBox = (props) => {
        return (<>
            <Button type="text" style={{ color: '#fff' }} onClick={showModal} >
                Đăng nhập / Đăng ký
            </Button>
        </>)
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param {Object} props
     * @returns
     */
    const AccountBox = (props) => {

        const { data, history } = props;
        const { user } = data;
        const accountdropdown = [
            {
                key: '1',
                label: (
                    <Link to='/shopping/account/account'>Thông báo</Link>
                )
            },{
                key: '2',
                label: (
                    <Link to='/seller'>Đơn hàng của tôi</Link>
                )
            },{
                key: '3',
                label: (
                    <Link to=''>Tài khoản của tôi</Link>
                )
            },{
                key: '4',
                label: (
                    <Link to=''>Đăng xuất</Link>
                )
            },
        ];

        return (<>
            {/* <Dropdown menu={accountdropdown} placement="bottom" arrow>
                <Space> */}
                    <><Row justify='center' align='center' style={{justify: 'center', align: 'center'}}>
                        <Col span={24} style={{padding: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}><Text level={4}><span style={{color: '#FFFFFF'}}>Tài khoản</span></Text></Col>
                        <Col span={24} style={{padding: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}><Text keyboard level={3}><span style={{color: '#FFFFFF'}}>{ user.name ? user.name : '' }</span></Text></Col>
                    </Row></>
                    {/* <DownOutlined />
                </Space>
            </Dropdown> */}
        </>)
    }

    return (<>
        <header className='main_header_container'>
            <Row className='header_container' justify="center"  >
                <Col className='logo_container' >
                    <Link to="/shopping/home/home" > <Image preview={false} width={60} height={60} src="/images/msmall-icon.png" /></Link>
                    {/* <Image preview={false} width={129} height={18} src="https://salt.tikicdn.com/ts/brickv2og/70/07/62/9a90de2324bda05df7ff137972de1c70.png" /> */}
                </Col>

                <Col className='formSearch_container' span={12} >
                    <Search placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
                        enterButton={<><Space>
                                <SearchOutlined />
                                <Text><span style={{color: '#FFFFFF'}}>Tìm Kiếm</span></Text>
                            </Space></>}
                        size="large"
                    />
                </Col>

                <Col className='header_account_container' >
                    <Space
                        direction="horizontal"
                        size="small"
                        style={{
                            display: 'flex',
                        }}
                        align="center"
                    >
                        <UserOutlined style={{ color: '#fff', fontSize: '32px' }} />
                        <div className='user_itemText'>
                            {is_login ? <AccountBox {...props}/> : <AuthenticatedBox {...props}/>}
                        </div>
                    </Space>
                </Col>

                <Col className='header_cart_container'>
                    <Badge count={1} >
                        <ShoppingCartOutlined style={{ color: '#fff', fontSize: '32px' }} />
                    </Badge>
                    <div className='user_itemText'>
                        <Button type="text" style={{ color: '#fff' }} >
                            Giỏ Hàng
                        </Button>
                    </div>
                </Col>
            </Row>
        </header>

        <Modal className='login_popup_container'
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
        >
            <Row className='login_popup' >
                <Col className='leftside' span={16} >
                    <h1>Welcome,</h1>
                    <p>Login / Signup </p>
                    <Form name="login_form"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16, }}
                        initialValues={{ remember: true, }}
                        autoComplete="off"  >

                        <Form.Item label="Username" name="username"
                            rules={[{
                                required: true,
                                message: 'Please input your username!',
                            }]} >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Password" name="password"
                            rules={[{
                                required: true,
                                message: 'Please input your password!',
                            }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16, }} >
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
                <Col className='rightside' span={8} >
                    <img src='https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png' alt='login_img' />
                </Col>
            </Row>
        </Modal>
    </>)
}

export default HeaderSection;
