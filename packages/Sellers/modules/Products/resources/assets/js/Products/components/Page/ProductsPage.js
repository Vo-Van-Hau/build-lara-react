import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Image, Input, Layout, Menu, Table, Tabs } from 'antd';
import { SettingOutlined, SearchOutlined } from '@ant-design/icons';
import { Select, Space } from 'antd';
import React, { useState } from 'react';
const { Option } = Select;
const { Header, Sider, Content } = Layout;

const ProductsPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const onTabsChange = (key) => {
        console.log(key);
    };

    const AllProductsTab = () => {
        const dataSource = [
            {
                key: '1',
                name: 'Mike',
                age: 32,
                address: '10 Downing Street',
            },
            {
                key: '2',
                name: 'John',
                age: 42,
                address: '10 Downing Street',
            },
        ];

        const columns = [
            {
                title: 'Product',
                dataIndex: 'product',
                key: 'product',
            },
            {
                title: 'Sellable stock 	',
                dataIndex: 'sellstock',
                key: 'sellstock',
            },
            {
                title: 'Selling price',
                dataIndex: 'sellprice',
                key: 'sellprice',
            },
            {
                title: 'Profit',
                dataIndex: 'profit',
                key: 'profit',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
            }
        ];
        return (

            <Table columns={columns} />
        )
    }

    const SellingTab = () => {
        return (
            <>
                Selling Tab
            </>
        )
    }
    const OutStockTab = () => {
        return (
            <>
                OutStockTab
            </>
        )
    }
    const selectBefore = (
        <Select defaultValue="name" className="select-before">
            <Option value="name">Product name</Option>
            <Option value="productID">Product ID</Option>
        </Select>
    );
    return (<>
        <Content className="site-layout-background">
            <Input addonBefore={selectBefore} prefix=<SearchOutlined /> defaultValue="Search products here..." style={{ width: '500px' }} />
            <Tabs
                defaultActiveKey="1"
                onChange={onTabsChange}
                items={[
                    {
                        label: `All`,
                        key: '1',
                        children: <AllProductsTab />,
                    },
                    {
                        label: `Selling`,
                        key: '2',
                        children: <SellingTab />,
                    },
                    {
                        label: `Out Of Stock`,
                        key: '3',
                        children: <OutStockTab />,
                    },
                ]} />
        </Content>
    </>)
}
export default ProductsPage;