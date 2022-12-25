import React, { useState, useContext, useEffect } from 'react';
import { Drawer, Checkbox, Space, Typography, Timeline, Button, Modal, Input } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { OrdersContext } from '../Contexts/OrdersContext';

const { Text, Link } = Typography;
const { TextArea } = Input;

const OrderTrackingStatusDrawer = (props) => {

    const { visible, setDrawer, orderDetail } = props;
    const { data, create_order_tracking_detail, get_order_tracking_detail, setRouter } = useContext(OrdersContext);
    const { mouted, order_tracking_detail } = data;
    const { current_tracking, next_tracking_status, is_order_cancelled } = order_tracking_detail;

    console.log(is_order_cancelled);

    const [isCancelOrderModalOpen, setIsCancelOrderModalOpen] = useState(false);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo
     * @param {Object} e
     * @return {void}
     */
    const onChangeStatus = (e, values) => {
        if(e && e.target && e.target.checked) {
            try {
                if(values && values.id !== undefined) {
                    create_order_tracking_detail({
                        status_target: values.id,
                        order_id: orderDetail.order_id ? orderDetail.order_id : 0,
                        order_detail_id: orderDetail.id ? orderDetail.id : 0,
                    });
                }
            } catch(errors) {
                console.error(errors);
            }
        }
    }

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param
     * @return {void}
     */
    const showCancelOrderModal = () => {
        return setIsCancelOrderModalOpen(true);
    };
    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param
     * @return {void}
     */
    const handleCancelOrderOk = () => {
        const e = {
            target: {
                checked: true,
            }
        };
        const values = {
            id: 0,
            order_id: orderDetail.order_id ? orderDetail.order_id : 0,
            order_detail_id: orderDetail.id ? orderDetail.id : 0,
        };
        onChangeStatus(e, values);
        return setIsCancelOrderModalOpen(false);
    };
    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param
     * @return {void}
     */
    const handleCancelOrderCancel = () => {
        return setIsCancelOrderModalOpen(false);
    };

    useEffect(() => {
        if(orderDetail) {
            if(orderDetail.id) {
                get_order_tracking_detail({
                    ...orderDetail,
                    order_detail_id: orderDetail.id ? orderDetail.id : 0,
                });
            }
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
                        {is_order_cancelled === 0 ? (next_tracking_status ?
                            <Timeline.Item color="#3498db"
                                dot={
                                    <ClockCircleOutlined
                                        style={{
                                            fontSize: '16px',
                                        }}
                                    />
                                }
                                key={next_tracking_status.id}
                            >
                                <Space
                                    direction="vertical"
                                    size="small"
                                    style={{
                                        display: 'flex',
                                    }}
                                >   <Checkbox
                                        onChange={(e) => onChangeStatus(e, next_tracking_status)}
                                    >
                                        <Text strong>{next_tracking_status.order_tracking_group_status.title || ''}</Text>
                                    </Checkbox>
                                    <Text>{next_tracking_status.title || ''}</Text>
                                </Space>
                            </Timeline.Item>
                            : <></>) : <></>}
                        {current_tracking.map((tracking, index) => {
                            const { order_tracking_status, tracking_at } = tracking;
                            const { order_tracking_group_status } = order_tracking_status;
                            return (
                                <Timeline.Item color={tracking.order_tracking_status_id === 0 ? `#FF0000` : `green`}
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
                                            checked
                                            disabled
                                        >
                                            <Text strong>{order_tracking_group_status.title || ''}</Text>
                                        </Checkbox>
                                        <Text>{order_tracking_status.title || ''}</Text>
                                        <Text>{tracking_at || ''}</Text>
                                    </Space>
                                </Timeline.Item>
                            )
                        })}
                    </Timeline>
                </div>
                <div>
                    {<Space>
                            <Button danger onClick={showCancelOrderModal} 
                                disabled={is_order_cancelled === 0 ? false : true}
                            >Hủy đơn</Button>
                        </Space>}
                </div>
            </Drawer>

            <Modal title="Xác nhận" open={isCancelOrderModalOpen} 
                onOk={handleCancelOrderOk} onCancel={handleCancelOrderCancel}
                cancelText={'Trở lại'}
                okText={'Đồng ý'}
            >
                <Text>Bạn có chắc chắn hủy đơn hàng này ?</Text>
            </Modal>
        </>
    )
}

export default OrderTrackingStatusDrawer;
