import React, { useState, useEffect, useContext } from 'react';
import {
    CloseOutlined, CheckOutlined
} from '@ant-design/icons';
import { Image, Input, Layout, Popconfirm, Table, Tabs, Select, Space, Button, Typography, Switch  } from 'antd';
import { ProductsContext } from '../Contexts/ProductsContext';
const { Option } = Select;
const { Text, Title } = Typography;
const { Content } = Layout;

const ProductsPage = () => {

    const { data, get_products, setRouter } = useContext(ProductsContext);
    const { products, loading_table } = data;

    const [collapsed, setCollapsed] = useState(false);
    const onTabsChange = (key) => {
        console.log(key);
    };

    const AllProductsTab = () => {

        const columns = [
            {
                title: 'Sản phẩm',
                render: (_, record) => {
                    return (<>
                        <Space>
                            <><Image width={78} height={78} src={record.image_link} alt={'product-image'} onClick={() => setRouter({
                                module: 'products',
                                controller: 'productdetail',
                                action: 'view',
                                id: record.product.id
                            })}/></>
                             <div>
                                <Text><Text strong>Tên sản phẩm:</Text> { record.name ? record.name : '' }</Text><br/>
                                <Text><Text strong>Mã sản phẩm:</Text> { record.price }</Text><br/>
                                <Text><Text strong>ID:</Text> { record.id }</Text><br/>
                                <Text><Text strong>SKU:</Text> { record.product_identifiers ? record.product_identifiers.sku : `` }</Text><br/>
                            </div>
                        </Space>
                    </>)
                }
            },{
                title: 'Giá bán',
                render: (_, record) => {
                    return (
                        <><Text>{ record.price_format ? record.price_format : `` }</Text></>
                    )
                },
            },{
                title: 'Phí Fanthbol thu',
                render: (_, record) => {
                    let FanthbolFee = record.price * (11 / 100);
                    return (<>
                        { record.price ? new Intl.NumberFormat().format(FanthbolFee) : ``}
                    </>)
                }
            },{
                title: 'Lợi nhuận',
                render: (_, record) => {
                    let FanthbolFee = record.price * (11 / 100);
                    return (<>
                        { record.price ? new Intl.NumberFormat().format(record.price - FanthbolFee) : ``}
                    </>)
                }
            },{
                title: 'Tồn kho',
                render: (_, record) => {
                    return (<>{ record.product_stock && record.product_stock.product_quantity ? record.product_stock.product_quantity : 'Undefined'}</>)
                }
            },{
                title: 'Ngày tạo',
                render: (_, record) => {
                    return (<>{ record.created_date && record.created_date.date && record.created_date.time ?
                        <Space
                            direction="vertical"
                            align="center"
                            size="small"
                        >
                            <Text>{record.created_date.date}</Text>
                            <Text>{record.created_date.time}</Text>
                        </Space> :
                    ''}</>)
                }
            },{
                title: 'Trạng thái',
                render: (_, record) => {
                    return (<>
                        <Switch
                            checkedChildren={`Bật`}
                            unCheckedChildren={`Tắt`}
                            defaultChecked
                        />
                    </>)
                }
            },{
                title: 'Thao tác',
                dataIndex: 'actions',
                key: 'actions',
                width: 150,
                render: (_, record) => {
                    return (
                        <Space size={5}>
                            <Button type="link" size="small" onClick={() => setRouter({
                                module: 'products',
                                controller: 'products',
                                action: 'upsert',
                                id: record.id
                            })}>Sửa</Button>
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
            <Table columns={columns} dataSource={products} rowKey={`id`} loading={loading_table}/>
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
        get_products(1, {});
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
