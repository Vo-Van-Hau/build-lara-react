import React, { useContext, useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import {
    Breadcrumb, Col, Row, Menu, Divider, Typography, Affix, Space, Card, Rate, Pagination,
    Carousel, Image, Alert ,
} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { ProductsContext } from '../Contexts/ProductsContext';
const { Title, Text } = Typography;

const ProductsByCategoryPage = ({keyID, ...props}) => {

    const { setRouter, data, get_products_by_category, get_product_categories, get_product_category } = useContext(ProductsContext);
    const { products, mouted, product_categories, product_category } = data;

    const [minShowProductsValue, setMinValue] = useState(0);
    const [maxShowProductsValue, setMaxValue] = useState(50);
    const numEachPage = 5   // Use a constant here to keep track of number of cards per page

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param {Object} data { item, key, keyPath, selectedKeys, domEvent }
     * @return {void}
     */
    const getProductsByCategory = (data) => {
        if(data && data.key) {
            const { key } = data;
            return setRouter({
                module: 'products',
                controller: 'products',
                action: 'bycategory',
                id: key,
            });
        }
    }

    const menuTabRightItems = [
        { key: 1, label: 'Phổ Biến' },
        { key: 2, label: 'Bán Chạy' },
        { key: 3, label: 'Hàng Mới' },
        { key: 4, label: 'Giá Thấp Đến Cao' },
        { key: 5, label: 'Giá Cao Đến Thấp' },
    ];


    useEffect(() => {
        if(mouted) {
            get_products_by_category({keyID});
            get_product_category({keyID});
            get_product_categories(1, {});
        }
    }, [keyID]);

    return (<>
        <Breadcrumb style={{ padding: '12px' }}>
            <Breadcrumb.Item style={{ cursor: 'pointer' }} >
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ cursor: 'pointer' }}>
                <span>Sản phẩm</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Sản phẩm theo thể loại</Breadcrumb.Item>
        </Breadcrumb>
        <Row className='products_by_category_container' gutter={24}>
            <Col className='leftSide' span={5}>
                {/* <Affix className='fixBar' offsetTop={0}> */}
                    <div>
                        <Title level={5}>Danh sách thể loại</Title>
                        <Menu items={product_categories}
                            onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => getProductsByCategory({ item, key, keyPath, selectedKeys, domEvent })}
                            onClick={({ item, key, keyPath, domEvent }) => console.log('Hi')}
                        />
                        <Divider />
                    </div>
                {/* </Affix> */}
            </Col>
            <Col className='rightSide' span={19}>
                <Title level={5} style={{ paddingLeft: 0 }}>Thể loại: {product_category && product_category.title ? product_category.title : ''}</Title>
                {/* {products &&                                                                                                                                                                                                                                                                                                                                                                            products.length <= 0 ? (<Alert
                    message='Thông báo'
                    description='Xin lỗi, hiện tại không có sản phẩm nào thuộc danh mục này, hãy tìm những sản phẩm thuộc danh mục khác có thể.'
                    type='info'
                    showIcon
                    />) : (<><Row className='home_top_banner_container' justify="space-between">
                            <Col >
                                <Carousel
                                    autoplay arrows swipeToSlide draggable
                                    prevArrow={<LeftOutlined />}
                                    nextArrow={<RightOutlined />}
                                >
                                    {imgSrc.map((item, index) => {
                                        return <Image
                                            key={index}
                                            preview={false}
                                            style={contentStyle}
                                            src={item.url} />
                                    })}
                                </Carousel>
                            </Col>
                        </Row>

                        <Row>
                            <Space size={[4, 4]} wrap style={{ width: '100%' }} >
                                {products.slice(minValue, maxValue).map((item, index) => (
                                    <Card className="productItem"
                                        key={index}
                                        hoverable
                                        style={{ width: 200 }}
                                        cover={<img alt={item.slug_name} src={item.image_link} />}
                                        onClick={() => setRouter({
                                            module: 'products',
                                            controller: 'productdetail',
                                            action: 'view',
                                            id: item.id,
                                        })}
                                    >
                                        <Meta title={item.name} />

                                        <div className="rating">
                                            <Rate defaultValue={item.rating} style={{ fontSize: 12 }} disabled />
                                            <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 100++ </small>
                                        </div>

                                        <Text className="price" type="danger" strong>{item.price} đ</Text>
                                    </Card>
                                ))}
                            </Space>
                            <Pagination
                                defaultCurrent={1}
                                defaultPageSize={50} //default size of page
                                onChange={handleChange}
                                total={products.length}//total number of card data available/>
                            />
                        </Row></>)} */}
                <Menu items={menuTabRightItems} mode="horizontal" />
                <Row className="productContainer">
                    <Space size={[10, 16]} style={{ width: '100%' }}>
                        <Row gutter={[8, 8]}>
                            {products.length > 0 ? products.slice(minShowProductsValue, maxShowProductsValue).map((item, index) => (
                                <Col span={4} key={`${item.id}_${index}`}>
                                    <Card className="productItem"
                                        key={index}
                                        hoverable
                                        cover={<img alt={item.slug_name} src={item.image_link} />}
                                        onClick={() => setRouter({
                                            module: 'products',
                                            controller: 'productdetail',
                                            action: 'view',
                                            id: item.id,
                                        })}
                                        style={{ padding: 12 }}
                                        bodyStyle={{ padding: '8px 0'}}
                                    >
                                        <Space
                                            direction="vertical"
                                            size={0}
                                            style={{
                                                display: 'flex',
                                            }}
                                        >
                                            <Text style={{ fontWeight: 490, fontSize: 14 }} ellipsis={true}>{item.name ? item.name : ``}</Text>
                                            <div className="rating" style={{marginTop: 5, marginBottom: 5}}>
                                                {/* <Rate defaultValue={item.rating} style={{ fontSize: 12 }} disabled /> */}
                                                <span style={{ color: 'rgb(128, 128, 137)' }}> | Đã bán: {item.quantity_sold ? item.quantity_sold.length : 0} </span>
                                            </div>
                                            <Text className="price" type="danger" style={{fontSize: 16}}>{item.price_format ? item.price_format : ``} đ</Text>
                                        </Space>
                                    </Card>
                                </Col>
                            ))
                            : <>
                                <Alert
                                    message="Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn"
                                    type="warning"
                                    showIcon
                                    closable={false}
                                />
                            </>}
                        </Row>
                    </Space>
                    {/* <Pagination
                        defaultCurrent={1}
                        // defaultPageSize={5} //default size of page
                        // onChange={handleChange}
                        total={products.length}//total number of card data available/>
                    /> */}
                </Row>
            </Col>
        </Row>
    </>)
}

export default ProductsByCategoryPage;
