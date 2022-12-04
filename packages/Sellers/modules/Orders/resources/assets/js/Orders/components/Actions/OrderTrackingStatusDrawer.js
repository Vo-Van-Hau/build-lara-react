import React, { useState, useContext, useEffect } from 'react';
import { Drawer, Checkbox, Space, Typography, Timeline } from 'antd';
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
        // if(e && e.target && e.target.value) {
        //     try {
        //         create_order_tracking_detail({
        //             status_target: e.target.value ? e.target.value : '',
        //             order_id: orderDetail.order_id ? orderDetail.order_id : 0,
        //             order_detail_id: orderDetail.id ? orderDetail.id : 0,
        //         });
        //     } catch(errors) {
        //         console.error(errors);
        //     }
        // }
        console.log(e.target);
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
                    <Timeline mode={`left`}>
                        {
                            current_tracking.map((tracking, index) => {
                                const { order_tracking_status, tracking_at } = tracking;
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
                                            <Checkbox
                                                onChange={(e) => onChangeStatus(e)}
                                                checked
                                                disabled
                                            >
                                                <Text strong>{order_tracking_group_status.title || ''}</Text>
                                            </Checkbox>
                                            <Text>{order_tracking_status.title || ''}</Text>
                                            <Text>{tracking.tracking_at || ''}</Text>
                                        </Space>
                                    </Timeline.Item>
                                )
                            })
                        }
                        {
                            next_tracking_status ?
                                // <Timeline.Item
                                //     label={`${'' || ''}`}
                                //     dot={
                                //         <ClockCircleOutlined
                                //           style={{
                                //             fontSize: '16px',
                                //           }}
                                //         />
                                //     }
                                // >
                                //     { next_tracking_status.title || ''} <Radio value={next_tracking_status.id || 0} onChange={(e) => onChangeStatus(e)}></Radio>
                                // </Timeline.Item>
                                // <Timeline.Item color="green"
                                //     dot={
                                //         <ClockCircleOutlined
                                //             style={{
                                //                 fontSize: '16px',
                                //             }}
                                //         />
                                //     }
                                //     key={index}
                                // >
                                //     <Space
                                //         direction="vertical"
                                //         size="small"
                                //         style={{
                                //             display: 'flex',
                                //         }}
                                //     >
                                //         <Text strong>{order_tracking_group_status.title || ''}</Text>
                                //         <Text>{order_tracking_status.title || ''}</Text>
                                //         <Text>{tracking.tracking_at || ''}</Text>
                                //     </Space>
                                // </Timeline.Item>
                                <></>
                            : <></>
                        }
                    </Timeline>
                </div>
            </Drawer>
        </>
    )
}

export default OrderTrackingStatusDrawer;
