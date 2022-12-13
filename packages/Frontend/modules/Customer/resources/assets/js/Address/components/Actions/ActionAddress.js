import React, { useContext, useState, useEffect } from 'react';
import { AddressContext } from '../Contexts/AddressContext';
import SideBar from '../../../Customer/components/Layout/Sidebar';
import {
    Layout, Typography, Button, Checkbox,
    Select, Radio, Form, Input
} from 'antd';

const { Title, Text, Link } = Typography;
const { Content, Footer, Sider } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const ActionAddress = ({keyID, ...props}) => {
    const {
        data, setRouter, get_areas, get_districs_by_province, get_wards_by_district,
        save_address, get_item,
    } = useContext(AddressContext);
    const { areas, loading_table, mouted } = data;
    const { countries } = areas;
    const { provinces, districts, wards } = countries;
    const [form] = Form.useForm();

    /**
     * @author <hauvo1709@gmail.com>
     * @todo
     * @param {Objtec} values
     * @return {void}
     */
    const onFinish = (values) => {
        if(keyID) {
            values.keyID = keyID;
        }
        save_address(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param {number} step
     * @param {number} id
     * @return {void}
     */
    const onChangeAreas = (step = 2, value = 0) => {
        if(step === 2) {
            return get_districs_by_province(value);
        } else if(step === 3) {
            return get_wards_by_district(value);
        }
    };

    useEffect(() => {
        if(mouted) {
            get_areas(1, {});
            if(keyID) {
                get_item(keyID).then((res) => {
                    let { status, data, message } = res.data;
                    let { item } = data;
                    onChangeAreas(2, item.province_id);
                    onChangeAreas(3, item.district_id);
                    form.setFieldsValue({
                        customer_name: item.customer_name,
                        company_name: item.company_name,
                        phone: item.phone,
                        address: item.address,
                        delivery_address_type: item.delivery_address_type,
                        province_id: item.province_id,
                        district_id: item.district_id,
                        ward_id: item.ward_id,
                        is_default: item.is_default,
                    });
                });
            }
        }
    }, [keyID]);

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
                            form={form}
                            loading={true}
                        >
                            <Form.Item label="Họ và tên" name="customer_name" placeholder="Nhập họ và tên..."
                                rules={[{
                                    required: true,
                                    message: 'Hãy nhập Họ và Tên!',
                                },]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Công ty" name="company_name" placeholder="Nhập công ty..."
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
                            <Form.Item name="province_id" label="Thành phố / Tỉnh" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Chọn Tỉnh / Thành phố..."
                                    onChange={(value) => onChangeAreas(2, value)}
                                    allowClear
                                    loading={loading_table}
                                >
                                    {provinces && provinces.map((province, _i) => {
                                         return <Option value={ province.id } key={`${_i}`}>{ province.name }</Option>
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item name="district_id" label="Quận / Huyện" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Chọn Quận / Huyện"
                                    onChange={(value) => onChangeAreas(3, value)}
                                    allowClear
                                    loading={loading_table}
                                >
                                    {districts && districts.map((district, _i) => {
                                         return <Option value={ district.id } key={`${_i}`}>{ district.name }</Option>
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item name="ward_id" label="Phường / Xã" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Chọn Phường / Xã"
                                    allowClear
                                    loading={loading_table}
                                >
                                    {wards && wards.map((ward, _i) => {
                                         return <Option value={ ward.id } key={`${_i}`}>{ ward.name }</Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Địa chỉ" name="address" placeholder="Nhập địa chỉ...">
                                <TextArea showCount maxLength={100} style={{ height: 120 }} />
                            </Form.Item>
                            <Form.Item name="delivery_address_type" label="Loại địa chỉ">
                                <Radio.Group>
                                    <Radio value="house">Nhà / Chung cư</Radio>
                                    <Radio value="company">Cơ quan / Công ty</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="is_default" valuePropName="checked" wrapperCol={{ offset: 8, span: 0 }}>
                                <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 0,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    {keyID ? `Cập nhật địa chỉ` : `Thêm địa chỉ`}
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
