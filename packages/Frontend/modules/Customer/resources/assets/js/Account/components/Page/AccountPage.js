import React, { useState, useEffect, useContext } from 'react';
import { Avatar, Col, Divider, Modal, Row, Typography,
    Button, Form, Input, Select,Layout, Menu, message, Upload
} from 'antd';
import { UserOutlined, BellOutlined, ShoppingCartOutlined, HomeOutlined,
    CreditCardOutlined, TagOutlined, HeartOutlined, UploadOutlined
} from '@ant-design/icons';
import { AccountContext } from '../Contexts/AccountContext';
import { GET_ACCOUNT } from '../Dispatch/type';

const { Content, Footer, Sider } = Layout;

const menuItems = [
    { key: 1, label: <a href='#' >Account</a>, icon: <UserOutlined /> },
    { key: 2, label: <a href='#' >Notifitation</a>, icon: <BellOutlined /> },
    { key: 3, label: <a href='#' >Orders</a>, icon: <ShoppingCartOutlined /> },
    { key: 4, label: <a href='#' >Address</a>, icon: <HomeOutlined /> },
    { key: 5, label: <a href='#' >Payment Card</a>, icon: <CreditCardOutlined /> },
    { key: 6, label: <a href='#' >Review Products</a>, icon: <TagOutlined /> },
    { key: 7, label: <a href='#' >Favor Products</a>, icon: <HeartOutlined /> },
];

const AccountPage = () => {

    const { data, get_account, set_table_loading, dispatch } = useContext(AccountContext);
    const { account } = data;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const { Title } = Typography;
    const { Option } = Select;

    const handleCancel = () => setPreviewOpen(false);

    const [form] = Form.useForm();

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 10,
            span: 12,
        },
    };

    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({
                    note: 'Hi, man!',
                });
                return;

            case 'female':
                form.setFieldsValue({
                    note: 'Hi, lady!',
                });
                return;

            case 'other':
                form.setFieldsValue({
                    note: 'Hi there!',
                });
            default: break;
        }
    };

    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const uploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },

        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    useEffect(() => {
        get_account()
        .then((res) => {
            if(res.data.status) {
                let { account } = res.data.data;
                let { user } = account;
                form.setFieldsValue({
                    fullname: account.fullname,
                    phone: account.phone,
                    email: user.email ? user.email : 'Undefined'
                });
                dispatch({ type: GET_ACCOUNT, payload: account });
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }, []);

    return (
        <Layout>
            <Content>
                <Layout className="customer-layout-background">
                    <Sider className="customer-layout-background" width={250} style={{ backgroundColor: '#fff' }} >
                        <Row className='customer_account_container' align="middle" style={{ background: 'white', padding: '1rem', gap: '1rem' }}>
                            <Avatar size={64} src='https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000' />
                            <div className='customer_account_text'>
                                <h5>Account</h5>
                                <h3>Thúy Mai</h3>
                            </div>
                        </Row>
                        <Menu mode="inline"
                            items={menuItems}
                            style={{}} />
                    </Sider>
                    <Content className='customer_content_container'>
                        <Row className="account_container">
                            <Col className="page_title" span={24} align="bottom">
                                <Title level={3}>Thông tin tài khoản</Title>
                            </Col>
                            <Col className="page_container" span={24}>
                                <Form {...layout} form={form} name="account_edit_form" requiredMark={false} onFinish={onFinish}>
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <Title level={5}>Thông tin cá nhân</Title>
                                            <Row style={{ marginBottom: '1rem' }}>
                                                <Col className="customer_avatar_col" span={5}>
                                                    <Avatar className="customer_avatar" onClick={() => setPreviewOpen(true)} size={100} src='https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000' />
                                                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                        <img alt="avatar_review"
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            src='https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'
                                                        />
                                                    </Modal>
                                                    <Upload {...uploadProps} className='customer_avatar_upload_btn'>
                                                        <Button icon={<UploadOutlined />}></Button>
                                                    </Upload>
                                                </Col>
                                                <Col span={19} >
                                                    <Form.Item name="fullname" label="Họ tên" rules={[{ required: true }]}>
                                                        <Input />
                                                    </Form.Item>

                                                    <Form.Item name="nickname" label="Nickname">
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                                                <Select
                                                    placeholder="Select a option and change input text above"
                                                    onChange={onGenderChange}
                                                    allowClear
                                                >
                                                    <Option value="male">male</Option>
                                                    <Option value="female">female</Option>
                                                    <Option value="other">other</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                noStyle
                                                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                                            >
                                                {({ getFieldValue }) =>
                                                    getFieldValue('gender') === 'other' ? (
                                                        <Form.Item name="other" label="Other" rules={[{ required: true }]}>
                                                            <Input />
                                                        </Form.Item>
                                                    ) : null
                                                }
                                            </Form.Item>
                                        </Col>
                                        <Col span={1}>
                                            <Divider type="vertical" style={{ height: '90%' }} />
                                        </Col>
                                        <Col span={11} >
                                            <Title level={5}>Số điện thoại và email</Title>
                                            <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                        <Button htmlType="button" onClick={onReset}>
                                            Reset
                                        </Button>
                                    </Form.Item>
                                </Form>

                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                MS Mall ©2022 Created
            </Footer>
        </Layout>
    )
};

export default AccountPage;
