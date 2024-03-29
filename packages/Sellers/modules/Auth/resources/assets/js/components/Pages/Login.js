import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Form, Input, Button, Row, Spin, Space } from 'antd';
import { UserOutlined, LockOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Helper from '../../helpers/helper';

const Login = ({ history, ...props }) => {

    const { login } = useContext(AuthContext);
    const { change_page, data } = props;
    console.log(props);
    const { config } = data;
    const { app } = config;
    const { baseURL, adminPrefix } = app;
    const [error, setError] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [form] = Form.useForm();

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: authentication
     * @param {Object} values
     * @return {void}
     */
    const onFinish  = async (values) => {
        setError(null);
        setLoadingStatus(true);
        let data = await login(values);
        setLoadingStatus(false);
        if(data.error !== null) {
            setError(data.error);
        }
        if(data.status && data.redirect_to) {
            window.location.replace(data.redirect_to);
        } else {
            Helper.Notification('error', '[Đăng nhập nhà bán hàng]', data.message || 'Errors for login');
        }
    };

    const onFinishFailed = errors => {};

    useEffect(function() {
        form.setFieldsValue({
            remember: false
        });
    }, []);

    return (
        <>
            <Form name='basic'
                initialValues={{
                    remember: false
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Form.Item name='email' rules={[{required: true}]}>
                    <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email'/>
                </Form.Item>
                <Form.Item name='password' rules={[{required: true}]}>
                    <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} placeholder='Mật khẩu'/>
                </Form.Item>
                <Row justify='center'>
                    <Form.Item style={{width: '100%'}}>
                        {
                        loadingStatus == true ? (
                            <div style={{ textAlign: 'center' }}>
                                <Spin size='large' />
                            </div>
                        ) : (
                            <Button className='btn-login-custom' type='primary' htmlType='submit' style={{width: '100%'}} size={'large'}>
                                ĐĂNG NHẬP
                            </Button>
                        )}
                    </Form.Item>
                </Row>
                <Space style={{width: '100%' }} align="center">
                    <Button type="text" icon={<ShoppingCartOutlined />} onClick={() => ( window.location.replace(`${baseURL}/${adminPrefix}/home/home`))}>Tiếp tục mua sắm</Button>
                    <Button type="text" icon={<UserOutlined />} onClick={() => ( window.location.replace(`${baseURL}/${adminPrefix}/auth/register`))}>Bạn chưa có tài khoản?</Button>
                </Space>
            </Form>
        </>
    );
};

export default Login;
