import React, { useState } from 'react';
import { Badge } from 'antd';
import { Col, Row, Image, Input, Modal, Button, Form ,Layout} from 'antd';
import { UserOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;

const HeaderSection = ({...props}) => {

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

     // const confirm = () => {
     //     message.info('Clicked on Yes.');
     // };

     return (<>
         <header className='main_header_container'>
             <Row className='header_container' justify="center"  >
                 <Col className='logo_container' >
                     <Link to="/shopping/home/home" > <Image preview={false} width={120} height={120} src="/images/msmall-icon.png"  /></Link>
                     {/* <Image preview={false} width={129} height={18} src="https://salt.tikicdn.com/ts/brickv2og/70/07/62/9a90de2324bda05df7ff137972de1c70.png" /> */}
                 </Col>

                 <Col className='formSearch_container' span={12} >
                     <Search placeholder="Search..." enterButton={<SearchOutlined />} size="large" />
                 </Col>

                 <Col className='header_account_container' >
                     <UserOutlined style={{ color: '#fff', fontSize: '32px' }} />
                     <div className='user_itemText'>
                         <Button type="text" style={{ color: '#fff' }} onClick={showModal} >
                             Login / SignUp
                         </Button>
                     </div>
                 </Col>

                 <Col className='header_cart_container' >
                     <Badge count={1} >
                         <ShoppingCartOutlined style={{ color: '#fff', fontSize: '32px' }} />
                     </Badge>
                     <div className='user_itemText'>
                         <Button type="text" style={{ color: '#fff' }} >
                             Cart
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
