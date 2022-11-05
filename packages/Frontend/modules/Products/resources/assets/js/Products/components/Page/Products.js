import React, { useContext, useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Row, Menu, Divider, Typography, Affix, Space, Card, Rate, Pagination } from 'antd';
import { Carousel, Image } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { ProductsContext } from '../Contexts/ProductsContext';
const { Title, Text } = Typography;

const ProductsPage = ({keyID, ...props}) => {

    const { setRouter, data, get_products, get_product_categories } = useContext(ProductsContext);
    const { products, mouted, product_categories } = data;

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(5);
    const numEachPage = 5   // Use a constant here to keep track of number of cards per page
    const imgSrc = [
        { id: 1, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/42/6b/f0/4cb3546248e0a34e9b974481ed275590.jpg.webp' },
        { id: 2, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/e5/db/cc/32b6b4268331a9ed46479ab0da46ae82.png.webp' },
        { id: 3, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/71/77/c8/fc9e2f84c2790afd605c58a99a680dd6.jpg.webp' },
        { id: 4, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/5f/8b/3d/96dc1c277cb1dbb4ea7d53a6f4c069f6.png.webp' },
        { id: 5, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/3e/8f/20/f512b3f7fdbc4279cc6c17ae831a03bc.png.webp' },
    ]
    const contentStyle = {
        height: '200px',
        objectFit: 'cover',
        color: '#fff',
        textAlign: 'center',
        background: '#364d79',
    };
    const handleChange = value => {
        setMinValue((value - 1) * numEachPage);
        setMaxValue(value * numEachPage);
    };

    const menuRightItems = [
        { key: 1, label: 'Popular' },
        { key: 2, label: 'Selling' },
        { key: 3, label: 'New Products' },
        { key: 4, label: 'Low to high price' },
        { key: 5, label: 'Price high to low' },
    ];

    useEffect(() => {
        if(mouted) {
            get_products();
            get_product_categories();
        }
    }, []);

    return (<>
        <Breadcrumb style={{ padding: '12px' }}>
            <Breadcrumb.Item style={{ cursor: 'pointer' }} >
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ cursor: 'pointer' }}>
                <span>Sản phẩm</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Sản phẩm gợi ý</Breadcrumb.Item>
        </Breadcrumb>
        <Row className='products_by_category_container' gutter={24}>
            <Col className='leftSide' span={5}>
                <Affix className='fixBar' offsetTop={0}>
                    <div>
                        <Title level={5}>Danh sách thể loại</Title>
                        <Menu items={product_categories} />
                        <Divider />
                    </div>
                </Affix>
            </Col>
            <Col className='rightSide' span={19}>
                <Title level={5}>Product Category Name</Title>
                <Row className='home_top_banner_container' justify="space-between">
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
                <Menu items={menuRightItems} mode="horizontal" />
                <Row className="productContainer">
                    <Space size={[20, 16]} wrap style={{ width: '100%' }} >
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
                        ),
                        )}
                    </Space>
                    <Pagination
                        defaultCurrent={1}
                        defaultPageSize={5} //default size of page
                        onChange={handleChange}
                        total={products.length}//total number of card data available/>
                    />
                </Row>
            </Col>
        </Row>
    </>)
}

export default ProductsPage;
