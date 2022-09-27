import React, { useEffect, useContext, useState } from 'react';
import { GroupsContext } from '../Contexts/GroupsContext';
import ActionGroup from '../Actions/ActionGroup';
import ActionUser from '../Actions/ActionUser';
import { Table, Space, Popconfirm, Input, Button, Row, Col, Tooltip } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import Helper from '../Helper/Helper';

import { Line, Pie, Column as ColumnChart } from '@ant-design/plots';

const { Search } = Input;

const Overview = (props) => {
    const { data, get_groups, set_mouted, destroy_group, set_table_loading } = useContext(GroupsContext);
    const { config, mouted, groups, loading_table, pagination } = data;
    const [group, setGroup] = useState({});
    const [viewAction, setViewAction] = useState(false);
    const [viewUsers, setViewUsers] = useState(false);
    const [keySearch, setKeySearch] = useState({
        keyword: null,
        status: null
    });
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 75,
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
        },
        {
            title: 'Parent',
            dataIndex: 'parent_group',
            key: 'parent_group',
            width: 200,
            ellipsis: true,
            render: (item, record) => {
                return (
                    <>{item ? item.name : ''}</>
                );
            }
        },
        {
            title: 'Users',
            dataIndex: 'users',
            key: 'users',
            width: 150,
            ellipsis: true,
            render: (item, record) => {
                return (
                    <>{`${item.length} Users`}</>
                );
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            filters: config.status,
            render: (value) => {
                let { status } = config;
                let text = status ? status.find(item => item.value == value): null;
                return (
                    <>{text ? text.text : ''}</>
                );
            }
        },
        {
            title: 'User Actions',
            dataIndex: 'User',
            key: 'User',
            width: 100,
            align: 'center',
            render: (_, record) => {
                return (
                    <Tooltip title="Add User" placement="topRight">
                        <Button type="dashed" shape="circle" icon={<UsergroupAddOutlined />} onClick={() => group_user(record)}/>
                    </Tooltip>
                );
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: 150,
            render: (_, record) => {
                return (
                    <Space size={5}>
                        <Button type="link" size="small" onClick={() => edit_group(record)}>Edit</Button>
                        <>||</>
                        <Popconfirm title="Sure to delete?" placement="leftTop" onConfirm={() => delete_group(record)}>
                            <Button type="link" size="small" danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return {void}
     */
    const new_group = () => {
        setGroup({});
        setViewAction(true);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: update an existed record
     * @param {Object} record
     * @return {void}
     */
    const edit_group = (record) => {
        setGroup(record);
        setViewAction(true);
    }

     /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: remove an existed record
     * @param {Object} record
     * @return {void}
     */
    const delete_group = (record) => {
        destroy_group(record.id)
        .then((res) => {
            console.log(res);
            let { status, message } = res.data;
            if (status) {
                get_groups(1, {});
                Helper.Notification('success', '[Delete Group]', message);
            } else {
                Helper.Notification('error', '[Delete Group]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {object} record
     * @return {void}
     */
    const group_user = (record) => {
        setGroup(record);
        setViewUsers(true);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {mixed} pagination
     * @param {mixed} filters
     * @return {void}
     */
    const handleTableChange = (pagination, filters) => {
        let { status } = filters;
        setKeySearch({...keySearch, status });
        get_groups(pagination.current, {...keySearch, status});
    }

    useEffect(() => {
        // if(mouted) get_groups(1, keySearch);
        // return () => {set_mouted(false);}
    }, []);

    return (
        <div className="content">
            <>
                <Row>
                    <Col span={12}>
                        <PieChart />
                    </Col>
                    <Col span={12}>
                        <DemoColumn />
                    </Col>
                </Row>
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
