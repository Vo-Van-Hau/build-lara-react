import React, { useContext ,useEffect } from 'react';
import { HomeOutlined, GiftOutlined, NotificationOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Layout, Row, Button, Col, Result, Tabs, Typography, Table, Space, Popconfirm } from 'antd';
import { NotificationContext } from '../Contexts/NotificationContext';
import SideBar from '../../../Customer/components/Layout/Sidebar';
const { Content, Footer } = Layout;
const { Title } = Typography;

const NotificationPage = (props) => {

    const { data, get_notifications, setRouter, mask_as_read_notification,
        delete_notification
    } = useContext(NotificationContext);
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
              align: 'center',
              render: (_, record) => (
                <Space size='middle' align='end' direction='horizontal'>
                    <>{ (!record.read_at) ? <Button type='link' onClick={() => maskAsRead(record)} >Đánh dấu đã đọc</Button> : <></> }</>
                    <Popconfirm title='Bạn có muốn xóa ?' placement='leftTop' onConfirm={() => deleteNotification(record)}>
                            <Button type='link' danger>Xóa</Button>
                    </Popconfirm>
                </Space>
              ),
            },
        ];

        /**
         * @author : <vanhau.vo@urekamedia.vn>
         * @todo:
         * @param
         * @return
         */
        const maskAsRead = (item) => {
            if(item.id) return mask_as_read_notification(item.id);
        }

        /**
         * @author : <vanhau.vo@urekamedia.vn>
         * @todo:
         * @param
         * @return
         */
        const deleteNotification = (item) => {
            if(item.id) return delete_notification(item.id);
        }

        return (<><Table
            columns={columns}
            dataSource={notifications}
            loading={loading_table}
            rowKey='id'
            rowClassName={(record, index) => { // @return {string}
                if(record.read_at) return `table-row-light`;
                return `table-row-dark`;
            }}
        /></>)
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
