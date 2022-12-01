import React, { useState, useContext, useEffect } from 'react';
import { Drawer, Radio, Space, Typography, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { OrdersContext } from '../Contexts/OrdersContext';
const { Text, Link } = Typography;

const OrderTrackingStatusDrawer = (props) => {

    const { visible, setDrawer, orderDetail } = props;
    const { data, create_order_tracking_detail, get_order_tracking_detail, setRouter } = useContext(OrdersContext);
    const { mouted, order_tracking_detail } = data;
    const { current_tracking, next_tracking_status } = order_tracking_detail;
    const [valueStatus, setValueStatus] = useState(1);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo
     * @param {Object} e
     * @return {void}
     */
    const onChangeStatus = (e) => {
        if(e && e.target && e.target.value) {
            try {
                create_order_tracking_detail({
                    status_target: e.target.value ? e.target.value : '',
                    order_id: orderDetail.order_id ? orderDetail.order_id : 0,
                    order_detail_id: orderDetail.id ? orderDetail.id : 0,
                });
            } catch(errors) {
                console.error(errors);
            }
        }
    }

    useEffect(() => {
        if(mouted && orderDetail) {
            get_order_tracking_detail({
                ...orderDetail,
                order_detail_id: orderDetail.id ? orderDetail.id : 0,
            });
        }
    }, [orderDetail]);

    return (
        <>
            <Drawer
                title="Cập nhật trạng thái đơn hàng"
                placement="right"
                onClose={() => setDrawer(false)}
                open={visible}
                width={580}
            >
                <div>
                    <Timeline mode={`right`}>
                        {
                            current_tracking.map((tracking, index) => {
                                const { order_tracking_status, tracking_at } = tracking;
                                return (
                                    <Timeline.Item label={`${tracking_at || ''}`} color="green">{ order_tracking_status.title || ''} <Radio value={order_tracking_status.id || 0} onChange={(e) => onChangeStatus(e)}></Radio></Timeline.Item>
                                )
                            })
                        }
                        {
                            next_tracking_status ?
                                <Timeline.Item
                                    label={`${'' || ''}`}
                                    dot={
                                        <ClockCircleOutlined
                                          style={{
                                            fontSize: '16px',
                                          }}
                                        />
                                    }
                                >
                                    { next_tracking_status.title || ''} <Radio value={next_tracking_status.id || 0} onChange={(e) => onChangeStatus(e)}></Radio>
                                </Timeline.Item>
                            : <></>
                        }
                    </Timeline>
                </div>
            </Drawer>
        </>
    )
}

export default OrderTrackingStatusDrawer;
