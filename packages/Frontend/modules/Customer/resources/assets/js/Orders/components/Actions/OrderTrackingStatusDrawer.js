import React, { useState, useContext, useEffect } from 'react';
import { Drawer, Radio, Space, Typography, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { OrdersContext } from '../Contexts/OrdersContext';
const { Text, Link } = Typography;

const OrderTrackingStatusDrawer = (props) => {

    const { visible, setDrawer, orderDetail } = props;
    const { order_tracking_details } = orderDetail
    const { data, } = useContext(OrdersContext);
    const { mouted } = data;
    // const { current_tracking, next_tracking_status } = order_tracking_detail;
    const [valueStatus, setValueStatus] = useState(1);

    useEffect(() => {
        if(mouted && orderDetail) {
            console.log(orderDetail);
            // get_order_tracking_detail({
            //     ...orderDetail,
            //     order_detail_id: orderDetail.id ? orderDetail.id : 0,
            // });
        }
    }, [orderDetail]);

    return (
        <>
            <Drawer
                title="Theo dõi trạng thái đơn hàng"
                placement="right"
                onClose={() => setDrawer(false)}
                open={visible}
                width={620}
            >
                <div>
                    <Timeline mode="left">
                        {order_tracking_details ? order_tracking_details.map((tracking, index) => {
                            const { order_tracking_status } = tracking;
                            const { order_tracking_group_status } = order_tracking_status;
                            return (
                                <Timeline.Item color="green"
                                    dot={
                                        <ClockCircleOutlined
                                            style={{
                                                fontSize: '16px',
                                            }}
                                        />
                                    }
                                    key={index}
                                >
                                    <Space
                                        direction="vertical"
                                        size="small"
                                        style={{
                                            display: 'flex',
                                        }}
                                    >
                                        <Text strong>{order_tracking_group_status.title || ''}</Text>
                                        <Text>{order_tracking_status.title || ''}</Text>
                                        <Text>{tracking.tracking_at || ''}</Text>
                                    </Space>
                                </Timeline.Item>
                            )
                        }) : ''}
                    </Timeline>
                </div>
            </Drawer>
        </>
    )
}

export default OrderTrackingStatusDrawer;
