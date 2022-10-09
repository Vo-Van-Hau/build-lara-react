import { Button, Card, Col, Row, Typography } from "antd";
import { Avatar, Layout, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { UserOutlined, BellOutlined, ShoppingCartOutlined, HomeOutlined, CreditCardOutlined, TagOutlined, HeartOutlined } from '@ant-design/icons';
import SideBar from "../../../Customer/components/Layout/Sidebar";
import { AddressContext } from "../Contexts/AddressContext";
import { useContext } from "react";

const { Content, Footer, Sider } = Layout;

const menuItems = [
    { key: 1, label: <a href='#' >Account</a> , icon: <UserOutlined /> },
    { key: 2, label: <a href='#' >Notifitation</a> , icon: <BellOutlined /> },
    { key: 3, label: <a href='#' >Orders</a> , icon: <ShoppingCartOutlined /> },
    { key: 4, label: <a href='#' >Address</a> , icon: <HomeOutlined /> },
    { key: 5, label: <a href='#' >Payment Card</a>, icon: <CreditCardOutlined /> },
    { key: 6, label: <a href='#' >Review Products</a>, icon: <TagOutlined /> },
    { key: 7, label: <a href='#' >Favor Products</a> , icon: <HeartOutlined /> },
];

const AddressPage = (props) => {
    const { Title, Text, Link } = Typography;
    const { data, setRouter } = useContext(AddressContext);

    return (
        <Layout>
            <Content>
                <Layout className="customer-layout-background">
                   <SideBar {...props} setRouter={setRouter}/>
                    <Content className='customer_content_container'>
                        <Row className="address_container">
                            <Col className="page_title" span={24} align="bottom">
                                <Title level={3}>Page Title (Address)</Title>
                            </Col>
                            <Col className="page_container" span={24}>
                                <Button type="dashed" block>
                                    <Link> <PlusOutlined /> Thêm địa chỉ </Link>
                                </Button>
                                <Card
                                    style={{ marginTop: 16 }}
                                    type="inner"
                                    title=<Link>Địa chỉ mặc định</Link>
                                    extra={<Link href="https://ant.design" target="_blank">Chỉnh sửa</Link>}
                                >
                                    <p><b>Mai Nguyen</b></p>
                                    <p><Text type="secondary">Địa chỉ:</Text><span> Số 123, Đường 456, Phường 789, ... </span></p>
                                    <p><Text type="secondary">Điện thoại:</Text><span> 01234 567 890 </span></p>
                                </Card>
                                <Card style={{ marginTop: 16 }}>
                                    <Row justify="space-between">
                                        <Col span={18}><p><b>Mai Nguyen</b></p></Col>
                                        <Col span={4} >
                                            <Link href="https://ant.design" target="_blank">Chỉnh sửa</Link>
                                            <Button type="primary" danger style={{ marginLeft: 16 }}>Xóa</Button>
                                        </Col>
                                    </Row>

                                    <p><Text type="secondary">Địa chỉ:</Text><span> Số 123, Đường 456, Phường 789, ... </span></p>
                                    <p><Text type="secondary">Điện thoại:</Text><span> 01234 567 890 </span></p>
                                </Card>
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