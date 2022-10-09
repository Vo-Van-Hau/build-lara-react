import React, { useContext, useState, useEffect } from 'react';
import { AddressContext } from '../Contexts/AddressContext';
import SideBar from "../../../Customer/components/Layout/Sidebar";
import {
    Layout, Typography, Button, Checkbox,
    Select, Radio, Form, Input
} from 'antd';

const { Title, Text, Link } = Typography;
const { Content, Footer, Sider } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const ActionAddress = (props) => {
    const { data, setRouter } = useContext(AddressContext);
    const onCityChange = (value) => {
        console.log(value);
    };
    const onDistrictChange = (value) => {
        console.log(value);
    };
    const onWardChange = (value) => {
        console.log(value);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Layout>
            <Content>
                <Layout className="customer-layout-background">
                    <SideBar {...props} setRouter={setRouter} />
                    <Content className='customer_content_container'>
                        <Form name="basic"
                            labelCol={{ span: 5, }}
                            initialValues={{ remember: true, }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item label="Họ và tên" name="fullname" placeholder="Nhập họ và tên..."
                                rules={[{
                                    required: true,
                                    message: 'Hãy nhập Họ và Tên!',
                                },]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Công ty" name="company" placeholder="Nhập công ty..."
                                rules={[{
                                    required: true,
                                    message: 'Hãy nhập Công ty!',
                                }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Số điện thoại" name="phone" placeholder="Nhập số điện thoại..."
                                rules={[{
                                    required: true,
                                    message: 'Hãy nhập số điện thoại!',
                                },]}>
                                <Input />
                            </Form.Item>

                            <Form.Item name="city" label="Thành phố / Tỉnh" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Chọn thành phố..."
                                    onChange={onCityChange}
                                    allowClear
                                >
                                    <Option value="0">Hồ Chí Minh</Option>
                                    <Option value="1">Hà Nội</Option>
                                    <Option value="2">Hải Phòng</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name="district" label="Quận / Huyện" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Chọn Quận huyện"
                                    onChange={onDistrictChange}
                                    allowClear
                                >
                                    <Option value="0">Quận 1</Option>
                                    <Option value="1">Quận 2</Option>
                                    <Option value="2">Quận 3</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name="ward" label="Phường / Xã" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Chọn phường / xã"
                                    onChange={onWardChange}
                                    allowClear
                                >
                                    <Option value="0">Phường 1</Option>
                                    <Option value="1">Phường 2</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Địa chỉ" name="address" placeholder="Nhập địa chỉ..."  >
                                <TextArea showCount maxLength={100} style={{ height: 120 }} />
                            </Form.Item>


                            <Form.Item name="addressType" label="Loại địa chỉ">
                                <Radio.Group>
                                    <Radio value="1">Nhà / Chung cư</Radio>
                                    <Radio value="2">Cơ quan / Công ty</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Thêm địa chỉ
                                </Button>
                            </Form.Item>
                        </Form>

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
    );
}

export default ActionAddress;
