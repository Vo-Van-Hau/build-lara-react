import { useContext, useEffect } from 'react';
import { Layout, Button, Card, Col, Row, Typography, Popover, Popconfirm } from 'antd';
import { PlusOutlined
} from '@ant-design/icons';
import SideBar from '../../../Customer/components/Layout/Sidebar';
import { AddressContext } from '../Contexts/AddressContext';

const { Content, Footer } = Layout;
const { Title, Text, Link } = Typography;


const AddressPage = (props) => {

    const { data, setRouter, get_address } = useContext(AddressContext);
    const { address } = data;

    useEffect(function() {
        get_address();
    }, []);

    return (
        <Layout>
            <Content>
                <Layout className="customer-layout-background">
                   <SideBar {...props} setRouter={setRouter}/>
                    <Content className='customer_content_container'>
                        <Row className="address_container">
                            <Col className="page_title" span={24} align="bottom">
                                <Title level={3}>Sổ địa chỉ</Title>
                            </Col>
                            <Col className="page_container" span={24}>
                                <Button type="dashed" block icon={<PlusOutlined />} onClick={() => setRouter({
                                    module: 'customer',
                                    controller: 'address',
                                    action: 'upsert',
                                    id: '#'
                                })}>Thêm địa chỉ</Button>
                                {address.map((item, _i) => {
                                    return (
                                        <Card style={{ marginTop: 16 }} key={_i}>
                                            <Row justify='space-between'>
                                                <Col span={18}>
                                                    <>
                                                        <Text code>{ item.customer_name }</Text>
                                                        {
                                                            item.is_default === 1 ? (<Text type='success' align='end' style={{marginLeft: 8}}>
                                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
                                                                </svg>
                                                                {`Địa chỉ mặc định`}
                                                            </Text>) : <></>
                                                        }
                                                    </>
                                                </Col>
                                                <Col span={4}>
                                                    <Popover content={`Thay đổi địa chỉ giao hàng`} title={`Bạn có muốn thay đổi ?`}>
                                                        <Button type='link'>Chỉnh sửa</Button>
                                                    </Popover>
                                                    { item.is_default === 1 ? `` : <Popconfirm title='Bạn có muốn xóa ?' placement='leftTop' onConfirm={() => {}}>
                                                    <Button type='primary' danger style={{ marginLeft: 16 }}>Xóa</Button></Popconfirm> }
                                                </Col>
                                            </Row>
                                            <p>
                                                <Text type='secondary'>Địa chỉ:</Text>
                                                <span> { `${item.address}, ${item.ward.name}, ${item.district.type} ${item.district.name}, ${item.province.type} ${item.province.name}` } </span>
                                            </p>
                                            <p><Text type='secondary'>Điện thoại:</Text><span> { item.phone}</span></p>
                                        </Card>
                                    )
                                })}
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
}

export default AddressPage;
