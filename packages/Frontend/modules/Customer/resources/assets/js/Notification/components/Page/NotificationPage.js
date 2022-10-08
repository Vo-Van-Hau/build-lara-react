import React, { useContext, useState ,useEffect } from 'react';
import { HomeOutlined, GiftOutlined, NotificationOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Row, Button, Col, Result, Tabs, Typography, Table, Space } from 'antd';
import { NotificationContext } from '../Contexts/NotificationContext';
import SideBar from '../../../Customer/components/Layout/Sidebar';
const { Content, Footer } = Layout;
const { Title } = Typography;

const NotificationPage = (props) => {

    const { data, get_notifications, setRouter } = useContext(NotificationContext);
    const { notifications, loading_table } = data;

    /**
     *
     */
    const HomeNotice = (props) => {

        const columns = [
            {
              title: '',
              dataIndex: 'created_at',
              key: 'created_at'
            },{
              title: 'Thông báo',
              key: 'id',
              render: (_, record) => {
                    let { data } = record;
                    let { message } = data;
                    return (<>
                            { message ? message : `` }
                    </>)
              }
            },{
              title: 'Thao tác',
              key: 'action',
              render: (_, record) => (
                <Space size="middle">
                    <Button type='link' onClick={() => maskAsRead(record)}>Đánh dấu đã đọc</Button>
                    <Button type='link' danger>Xóa</Button>
                </Space>
              ),
            },
        ];

        const maskAsRead = (item) => {
            console.log(item);
        }

        return (
            <>
                <Table columns={columns} dataSource={notifications} loading={loading_table} rowKey='id'/>;
            </>
        )
    }

    const PromotionNotice = () => {
        return <Result title="You don't have any notifications yet"
            extra={<Button type="primary">Continue Shopping</Button>}
            danger
        />
    }
    const OrdersNotice = () => {
        return <Result title="You don't have any notifications yet"
            extra={<Button type="primary">Continue Shopping</Button>}
            danger
        />
    }
    const SystemNotice = () => {
        return <Result title="You don't have any notifications yet"
            extra={<Button type="primary">Continue Shopping</Button>}
            danger />
    }

    useEffect(() => {
        get_notifications();
    }, []);

    return (
        <Layout>
            <Content>
                <Layout className="customer-layout-background">
                    <SideBar {...props} setRouter={setRouter}/>
                    <Content className='customer_content_container'>
                        <Row className="notification_container">
                            <Col className="page_title" span={24} align="bottom">
                                <Title level={3}>Thông báo của tôi ({ notifications.length })</Title>
                            </Col>
                            <Col className="page_container" span={24}>
                                <Tabs
                                    defaultActiveKey="1"
                                    items={[
                                        {
                                            label: <HomeOutlined style={{ fontSize: '24px', }} />,
                                            key: '1',
                                            children: <HomeNotice />,
                                        },
                                        {
                                            label: <GiftOutlined style={{ fontSize: '24px' }} />,
                                            key: '2',
                                            children: <PromotionNotice />,
                                        },
                                        {
                                            label: <NotificationOutlined style={{ fontSize: '24px' }} />,
                                            key: '3',
                                            children: <OrdersNotice />,
                                        },
                                        {
                                            label: <FieldTimeOutlined style={{ fontSize: '24px' }} />,
                                            key: '4',
                                            children: <SystemNotice />,
                                        },
                                    ]} />
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
        </Layout>)
};

export default NotificationPage;
