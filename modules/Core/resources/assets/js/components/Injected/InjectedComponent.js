import React, { Component, useState, useEffect, useContext } from 'react';
import { Space, Table, Tag } from 'antd';
import { CoreContext } from '../Contexts/CoreContext';

const InjectedComponent = (props) => {

    const { data } = useContext(CoreContext);
    // const { component: Component, ...props } = props;
    // console.log(props);

    const [error, setError] = useState(null);

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';

                if (tag === 'loser') {
                  color = 'volcano';
                }

                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a>Invite {record.name}</a>
              <a>Delete</a>
            </Space>
          ),
        },
    ];
    const datasource = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    ];

    useEffect(function() {

    }, []);

    if(!error) {

        return (
            <>
                {/* <Table columns={columns} dataSource={datasource} /> */}
                {/* <Component
                    render={() => {
                        return (
                            <>Hello IT Team</>
                        )
                    }}
                /> */}
            </>
        )
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>
                            500
                        </h2>
                        <div className="error-details"></div>
                        <div className="error-actions"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InjectedComponent;
