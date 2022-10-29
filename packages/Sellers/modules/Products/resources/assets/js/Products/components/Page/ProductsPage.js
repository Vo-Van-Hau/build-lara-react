import React, { useState, useEffect, useContext } from 'react';
import {
    MenuFoldOutlined, SettingOutlined, SearchOutlined, MenuUnfoldOutlined,
    UploadOutlined, UserOutlined, VideoCameraOutlined,
} from '@ant-design/icons';
import { Image, Input, Layout, Popconfirm, Table, Tabs, Select, Space, Button } from 'antd';
import { ProductsContext } from '../Contexts/ProductsContext';
const { Option } = Select;
const { Header, Sider, Content } = Layout;

const ProductsPage = () => {

    const { data, get_products } = useContext(ProductsContext);
    const { products } = data;

    const [collapsed, setCollapsed] = useState(false);
    const onTabsChange = (key) => {
        console.log(key);
    };

    const AllProductsTab = () => {

        const columns = [
            {
                title: 'ID sản phẩm',
                dataIndex: 'id'
            },{
                title: '',
                render: (_, record) => {
                    return (
                        <><Image width={78} height={78} src={record.image_link} alt={'product-image'} onClick={() => setRouter({
                            module: 'products',
                            controller: 'productdetail',
                            action: 'view',
                            id: record.product.id
                        })}/></>
                    )
                },
            },{
                title: 'Tên sản phẩm',
                dataIndex: 'name',
                key: 'name',
            },{
                title: 'Đơn giá',
                dataIndex: 'price',
                key: 'price',
            },{
                title: 'Số lượng tồn kho',
                render: (_, record) => {
                    return (<>{ record.stock && record.stock.product_quantity ? record.stock.product_quantity : 'Undefined'}</>)
                }
            },{
                title: 'Thao tác',
                dataIndex: 'actions',
                key: 'actions',
                width: 150,
                render: (_, record) => {
                    return (
                        <Space size={5}>
                            <Button type="link" size="small" onClick={() => {}}>Chỉnh sửa</Button>
                            <>||</>
                            <Popconfirm title="Sure to delete?" placement="leftTop" onConfirm={() => {}}>
                                <Button type="link" size="small" danger>Xóa</Button>
                            </Popconfirm>
                        </Space>
                    )
                }
            }
        ];
        return (
            <Table columns={columns} dataSource={products} rowKey={`id`}/>
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

    useEffect(function() {
        get_products();
    }, []);

    return (<>
        <Content className="site-layout-background">
            {/* <Input addonBefore={selectBefore} prefix=<SearchOutlined /> defaultValue="Search products here..." style={{ width: '500px' }} /> */}
            <Tabs
                defaultActiveKey={1}
                onChange={onTabsChange}
                items={[
                    {
                        label: `Tất cả`,
                        key: '1',
                        children: <AllProductsTab />,
                    },{
                        label: `Đang chờ duyệt`,
                        key: '2',
                        children: <SellingTab />,
                    },{
                        label: `Đang bán`,
                        key: '3',
                        children: <OutStockTab />,
                    },
                ]}
            />
        </Content>
    </>)
}
export default ProductsPage;
