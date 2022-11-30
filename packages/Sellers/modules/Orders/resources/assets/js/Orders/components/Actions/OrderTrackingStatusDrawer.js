import React, { useState } from 'react';
import { Drawer, Radio, Space, Typography, Timeline } from 'antd';

const { Text, Link } = Typography;

const OrderTrackingStatusDrawer = (props) => {

    const { visible, setDrawer } = props;

    return (
        <>
            <Drawer title="Cập nhật trạng thái đơn hàng" placement="right" onClose={() => setDrawer(false)} open={visible}>
                <div>
                    {/* <Radio.Group value={1}>
                        <Space
                            direction="vertical"
                            size="middle"
                            style={{
                                display: 'flex',
                            }}
                        >
                            <Radio value={1}>Chờ xác nhận</Radio>
                            <Radio value={2}>Đã tiếp nhận đơn hàng</Radio>
                            <Radio value={3}>Đang chuẩn bị hàng và đóng gói</Radio>
                            <Radio value={3}>Đã giao hàng cho nhà vận chuyển</Radio>
                            <Radio value={4}><Text type="danger">Hủy đơn hàng</Text></Radio>

                        </Space>
                    </Radio.Group> */}
                    <Timeline mode={`right`}>
                        <Timeline.Item label="2015-09-01">Chờ xác nhận <Radio value="left"></Radio></Timeline.Item>
                        <Timeline.Item label="2015-09-01 09:12:11">Đã tiếp nhận đơn hàng <Radio value="left"></Radio></Timeline.Item>
                        <Timeline.Item label="2015-09-01 09:12:11">Đang chuẩn bị hàng và đóng gói <Radio value="left"></Radio></Timeline.Item>
                        <Timeline.Item label="2015-09-01 09:12:11">Đã giao hàng cho nhà vận chuyển <Radio value="left"></Radio></Timeline.Item>
                        <Timeline.Item label="2015-09-01 09:12:11">Hủy đơn hàng <Radio value="left"></Radio></Timeline.Item>
                    </Timeline>
                </div>
            </Drawer>
        </>
    )
}

export default OrderTrackingStatusDrawer;
