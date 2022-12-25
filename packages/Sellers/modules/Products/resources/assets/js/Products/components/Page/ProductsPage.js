import React, { useState, useEffect, useContext } from 'react';
import {
    PlusOutlined, CheckOutlined
} from '@ant-design/icons';
import { Image, Row, Layout, Popconfirm, Table, Tabs, Select, Space, Button, Typography, Switch, Col } from 'antd';
import { ProductsContext } from '../Contexts/ProductsContext';
import Helper from '../Helper/Helper';

const { Option } = Select;
const { Text, Title } = Typography;
const { Content } = Layout;

const ProductsPage = (props) => {

    const { data, get_products, setRouter, update } = useContext(ProductsContext);
    const { products, loading_table, pagination } = data;

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param
     * @return {void}
     */
    const AllProductsTab = () => {

        /**
         * @author: <vanhau.vo@urekamedia.vn>
         * @todo:
         * @param {mixed} pagination
         * @param {mixed} filters
         * @return {void}
         */
        const handleTableChange = (pagination, filters) => {
            return get_products(pagination.current, {});
        }

        /**
         * @author: <vanhau.vo@urekamedia.vn>
         * @todo:
         * @param {Object} product
         * @return {void}
         */
        const handleChangeProductStatus = async (checked, event, product) => {
            if(product && product.id) {
                let values = {
                    type: 'UPDATE_STATUS'
                };
                values.id = product.id;
                if(checked) {
                    values.status = 1; 
                } else {
                    values.status = 0; 
                }
                return await update(values);

            } else {
                Helper.Notification('success', '[Cập nhật]', 'Cập nhật thất bại');
            }
        }
        
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
               
                    if(record.id === 91) {
                        console.log(record.product_stock.product_quantity);
                    }
                    return (<>{ record.product_stock && record.product_stock.product_quantity ? record.product_stock.product_quantity : '-'}</>)
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
                            defaultChecked={record.status === 1 ? true : false}
                            onChange={(checked, event) => handleChangeProductStatus(checked, event, record)}
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
            <Table
                columns={columns}
                dataSource={products}
                rowKey={`id`}
                loading={loading_table}
                pagination={pagination}
                onChange={handleTableChange}  // Callback executed when pagination, filters or sorter is changed
            />
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

    useEffect(function() {
        get_products(1, {});
    }, []);

    return (<>
        <Content className="site-layout-background">
            <Row>
                <Col>
                    <Space wrap>
                        <Button type="primary" icon={<PlusOutlined />}
                            onClick={() => setRouter({
                                module: 'products',
                                controller: 'products',
                                action: 'upsert'
                            })}
                        >
                            Thêm sản phẩm
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Tabs
                defaultActiveKey={1}
                items={[
                    {
                        label: `Tất cả`,
                        key: '1',
                        children: <AllProductsTab />,
                    },
                    // {
                    //     label: `Đang chờ duyệt`,
                    //     key: '2',
                    //     children: <SellingTab />,
                    // },{
                    //     label: `Đang bán`,
                    //     key: '3',
                    //     children: <OutStockTab />,
                    // },
                ]}
            />
        </Content>
    </>)
}
export default ProductsPage;
