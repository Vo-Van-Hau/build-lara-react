import React, { useEffect, useContext, useState } from 'react';
import { GroupsContext } from '../Contexts/GroupsContext';
import { Divider, Space, Popconfirm, Input, Button, Row, Col, Tooltip, Typography } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import Helper from '../Helper/Helper';
import { Line, Pie, Column as ColumnChart } from '@ant-design/plots';

const { Search } = Input;
const { Text, Link, Title } = Typography;

const Overview = (props) => {
    const { data, get_groups, set_mouted, destroy_group, set_table_loading } = useContext(GroupsContext);
    const { config, mouted, groups, loading_table, pagination } = data;

    useEffect(() => {
        // if(mouted) get_groups(1, keySearch);
        // return () => {set_mouted(false);}
    }, []);

    return (
        <div className="content">
            <>
                <Row>
                    <Col span={8}>
                        <><Title level={4}>Tổng Số Đơn Hàng: 396</Title></>
                    </Col>
                    <Col span={8}>
                        <><Title level={4}>Tổng Số Sản Phẩm: 24</Title></>
                    </Col>
                    <Col span={8}>
                        <><Title level={4}>Tổng Doanh thu: 692,000,000 VND</Title></>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={12}>
                        <PieChart />
                    </Col>
                    <Col span={12}>
                        <DemoColumn />
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

const PieChart = () => {
    const data = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其他',
        value: 5,
      },
    ];
    const config = {
      appendPadding: 10,
      data,
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
        },
        {
          type: 'element-active',
        },
      ],
    };
    return <Pie {...config} />;
};

const DemoColumn = () => {
    const data = [
      {
        type: '家具家电',
        sales: 38,
      },
      {
        type: '粮油副食',
        sales: 52,
      },
      {
        type: '生鲜水果',
        sales: 61,
      },
      {
        type: '美容洗护',
        sales: 145,
      },
      {
        type: '母婴用品',
        sales: 48,
      },
      {
        type: '进口食品',
        sales: 38,
      },
      {
        type: '食品饮料',
        sales: 38,
      },
      {
        type: '家庭清洁',
        sales: 38,
      },
    ];
    const config = {
      data,
      xField: 'type',
      yField: 'sales',
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
        sales: {
          alias: '销售额',
        },
      },
    };
    return <ColumnChart {...config} />;
};

export default Overview;
