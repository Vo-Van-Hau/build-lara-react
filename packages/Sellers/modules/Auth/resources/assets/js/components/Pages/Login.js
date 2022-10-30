import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Form, Input, Button, Row, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = ({ history, ...props }) => {

    const { login } = useContext(AuthContext);
    const { change_page } = props;
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
        if(data.redirect_to) {
            window.location.replace(data.redirect_to);
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
                    <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} placeholder='Password'/>
                </Form.Item>
                <Row justify='center'>
                    <Form.Item>
                        {
                        loadingStatus == true ? (
                            <div style={{ textAlign: 'center' }}>
                                <Spin size='large' />
                            </div>
                        ) : (
                            <Button className='btn-login-custom' type='primary' htmlType='submit' style={{width: '100%'}}>
                                Login
                            </Button>
                        )}
                    </Form.Item>
                </Row>
            </Form>
        </>
    );
};

export default Login;
