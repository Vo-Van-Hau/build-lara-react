import React, { useState, useEffect, useContext } from 'react';
import { Avatar, Col, Divider, Modal, Row, Typography, Space, DatePicker,
    Button, Form, Input, Select, Layout, Radio, message, Upload
} from 'antd';
import {
    UploadOutlined,
} from '@ant-design/icons';
import { AccountContext } from '../Contexts/AccountContext';
import { GET_ACCOUNT } from '../Dispatch/type';
import SideBar from '../../../Customer/components/Layout/Sidebar';
import Helper from '../Helper/Helper';
import moment from 'moment';
const { Content, Footer } = Layout;

const AccountPage = (props) => {
    const { get_user } = props;
    const { user } = props.data;
    const { data, dispatch, setRouter, update_account } = useContext(AccountContext);
    const { } = data;

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
            // span: 12,
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

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} values
     * @return
     */
    const onFinish = (values) => {
        let date_of_birth = Helper.formatTime(values.date_of_birth, 'YYYY-MM-DD');
        values.date_of_birth = date_of_birth;
        update_account(values).then((res) => {
            let { status, message } = res.data;
            if(status) {
                dispatch({ type: GET_ACCOUNT, payload: {...user, ...values} });
                get_user();
                Helper.Notification('success', '[Cập nhật tài khoản]', message);
            } else {
                Helper.Notification('error', '[Cập nhật tài khoản]', message);
            }
        });
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
        if(user) {
            dispatch({ type: GET_ACCOUNT, payload: user });
            if(user.is_login) {
                if(user.customer) {
                    let customer = user.customer;
                    console.log(customer);
                    form.setFieldsValue({
                        fullname: customer.fullname,
                        phone: customer.phone,
                        email: user.email ? user.email : '',
                        gender: customer.gender ? customer.gender : 'unisex',
                        date_of_birth: customer.date_of_birth ? moment(customer.date_of_birth) : moment(),
                        nickname: customer.nickname ? customer.nickname : '',
                    });
                }
            }
        }
    }, [props]);

    return (
        <Layout>
            <Content>
                <Layout className="customer-layout-background">
                    <SideBar {...props} setRouter={setRouter}/>
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
                                                    {/* <Avatar
                                                        className="customer_avatar"
                                                        onClick={() => setPreviewOpen(true)}
                                                        size={100}
                                                        src={user.avatar ? user.avatar : ``}
                                                    />
                                                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                        <img alt="avatar_review"
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            src={user.avatar ? user.avatar : ``}
                                                        />
                                                    </Modal>
                                                    <Upload {...uploadProps} className='customer_avatar_upload_btn'>
                                                        <Button icon={<UploadOutlined />}></Button>
                                                    </Upload> */}
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
                                            <Form.Item label={`Ngày sinh`} rules={[{ required: true }]} name='date_of_birth'>
                                                <DatePicker placeholder={`Chọn ngày sinh`}/>
                                            </Form.Item>
                                            <Form.Item name="gender" label={`Giới tính`} rules={[{ required: true }]}>
                                                <Radio.Group value={`male`}>
                                                    <Radio value={`male`}>Nam</Radio>
                                                    <Radio value={`female`}>Nữ</Radio>
                                                    <Radio value={`unisex`}>Khác</Radio>
                                                </Radio.Group>
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
                                            <Form.Item {...tailLayout}>
                                                <Button type="primary" htmlType="submit">
                                                    Lưu thay đổi
                                                </Button>
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
                                </Form>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
};

export default AccountPage;
