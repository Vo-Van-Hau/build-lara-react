import React, { useEffect, useContext, useState } from 'react';
import { DashboardContext } from '../Contexts/DashboardContext';
import { Divider, Space, Input, Button, Row, Col, Typography, Statistic, DatePicker } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Helper from '../Helper/Helper';
import { Line, Pie, Column as ColumnChart } from '@ant-design/plots';

const { Search } = Input;
const { Text, Link, Title } = Typography;
const { RangePicker } = DatePicker;

const Overview = ({keyID, ...props}) => {
    const { data, set_table_loading, get_overview } = useContext(DashboardContext);
    const { config, mouted, loading_table, pagination, overview } = data;
    const { products, orders } = overview;
    const { orders_in_year } = orders;

    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param {Object} props
     * @return
     */
    const StatictisProductsPieChart = (props) => {
        const dataSource = [];
        products.data.map(function(item, i) {
            dataSource.push({
                type: item.name ? item.name : ``,
                value: item.count_orders ? item.count_orders : 0,
            });
        });
        const config = {
            appendPadding: 10,
            data: dataSource,
            angleField: 'value',
            colorField: 'type',
            radius: 0.75,
            label: {
                type: 'spider',
                labelHeight: 28,
                content: '{name}\n{percentage}',
            },
            interactions: [
                {
                    type: 'element-selected',
                },{
                    type: 'element-active',
                },
            ],
        };
        return <Pie {...config} />;
    };


    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param {Object} props
     * @return
     */
    const StatictisOrdersInYearColumn = (props) => {
        const dataSource = [
            {
                type: 'Tháng 1',
                orders: 0,
            },{
                type: 'Tháng 2',
                orders: 0,
            },{
                type: 'Tháng 3',
                orders: 0,
            },{
                type: 'Tháng 4',
                orders: 0,
            },{
                type: 'Tháng 5',
                orders: 0,
            },{
                type: 'Tháng 6',
                orders: 0,
            },{
                type: 'Tháng 7',
                orders: 0,
            },{
                type: 'Tháng 8',
                orders: 0,
            },{
                type: 'Tháng 9',
                orders: 0,
            },{
                type: 'Tháng 10',
                orders: 0,
            },{
                type: 'Tháng 11',
                orders: 0,
            },{
                type: 'Tháng 12',
                orders: 0,
            },
        ];
        orders_in_year.map((item, i) => {
            dataSource[i].orders = item.total;
        });
        const config = {
            data: dataSource,
            xField: 'type',
            yField: 'orders',
            label: {
                // 可手动配置 label 数据标签位置
                position: 'middle',
                // 'top', 'bottom', 'middle',
                // 配置样式
                style: {
                    fill: '#FFFFFF',
                    opacity: 0.6,
                },
            },
            xAxis: {
                label: {
                    autoHide: true,
                    autoRotate: false,
                },
            },
            meta: {
                type: {
                    alias: '类别',
                },
                orders: {
                    alias: '销售额',
                },
            },
        };
        return <ColumnChart {...config} />;
    };

    useEffect(() => {
        if(mouted) {
            get_overview({});
        }
    }, []);

    return (
        <div className="content">
            <>
                <Row justify="end">
                    <Col span={12}>
                        <Title level={4}>Sellers Report</Title>
                    </Col>
                    <Col span={12} style={{display: 'flex', justifyContent: 'end'}}>
                        <RangePicker />
                    </Col>
                </Row>
                <Divider />
                <div className="site-statistic-card">
                    <Row>
                        <Col className="site-statistic-box-container" span={8}>
                            <div className="site-statistic-box">
                                <Statistic
                                    title="Tổng Số Đơn Hàng: "
                                    value={orders.total}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix=""
                                    loading={loading_table}
                                />
                            </div>
                        </Col>
                        <Col className="site-statistic-box-container" span={8}>
                            <div className="site-statistic-box">
                                <Statistic
                                    title="Tổng Số Sản Phẩm: "
                                    value={products.total}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix=""
                                    loading={loading_table}
                                />
                            </div>
                        </Col>
                        <Col className="site-statistic-box-container" span={8}>
                            <div className="site-statistic-box">
                                <Statistic
                                    title="Tổng Doanh thu: "
                                    value={9300000}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="VND"
                                    loading={loading_table}
                                />
                            </div>
                        </Col>
                        <Col className="site-statistic-box-container" span={8}>
                            <div className="site-statistic-box">
                                <Statistic
                                    title="Đơn hàng đang chờ xử lý: "
                                    value={orders.total}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix=""
                                    loading={loading_table}
                                />
                            </div>
                        </Col>
                        <Col className="site-statistic-box-container" span={8}>
                            <div className="site-statistic-box">
                                <Statistic
                                    title="Sản phẩm đang bán: "
                                    value={products.total}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix=""
                                    loading={loading_table}
                                />
                            </div>
                        </Col>
                        <Col className="site-statistic-box-container" span={8}>
                        <div className="site-statistic-box">
                            <Statistic
                                title="Doanh thu hôm nay: "
                                value={650000}
                                precision={0}
                                valueStyle={{
                                    color: '#3f8600',
                                }}
                                prefix={<ArrowUpOutlined />}
                                suffix="VND"
                                loading={loading_table}
                            />
                        </div>
                        </Col>
                    </Row>
                </div>
                <Divider />
                <Row>
                    <Col span={24}>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <Title level={5}>Thống Kê Sản Phẩm</Title>
                            <StatictisProductsPieChart />
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <Title level={5}>Thống Kê Đơn Hàng</Title>
                            <StatictisOrdersInYearColumn />
                        </Space>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={24}>
                        <LineChart />
                    </Col>
                </Row>
            </>
        </div>
    );
}

const LineChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);

    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/c48dbbb1-fccf-4a46-b68f-a3ddb4908b68.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    const config = {
      data,
      xField: 'date',
      yField: 'value',
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      seriesField: 'type',
      color: ({ type }) => {
        return type === 'register' ? '#F4664A' : type === 'download' ? '#30BF78' : '#FAAD14';
      },
      lineStyle: ({ type }) => {
        if (type === 'register') {
          return {
            lineDash: [4, 4],
            opacity: 1,
          };
        }

        return {
          opacity: 0.5,
        };
      },
    };

    return <Line {...config} />;
};

export default Overview;
