import React, { useContext, useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import {
    Breadcrumb, Col, Row, Menu, Divider, Typography, Affix, Space, Card, Rate, Pagination, Button, Form, Checkbox, InputNumber, List,
    Tag,
} from 'antd';
import { Carousel, Image } from 'antd';
import { LeftOutlined, RightOutlined ,CaretUpOutlined,CaretDownOutlined,StarFilled} from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { ProductsContext } from '../Contexts/ProductsContext';
const { Title, Text } = Typography;

const ProductsPage = ({keyID, ...props}) => {

    const { setRouter, data, get_products, get_product_categories } = useContext(ProductsContext);
    const { products, mouted, product_categories } = data;
    const [isShowAll1, showAll1] = useState(false);
    const [isShowAll2, showAll2] = useState(false);
    const [isShowAll3, showAll3] = useState(false);
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

    const onCheckChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const itemToRender = (item, showAll, maxItem = 3) => {
        item.sort((a, b) => b.primary - a.primary);
        if (showAll) return item;
        return item.slice(0, maxItem);
      };
    const placeOfSaleList = [
        {place:'Hồ Chí Minh'},
        {place:'Hà Nội'},
        {place:'Hải Phòng'},
        {place:'Thái Nguyên'}
    ]
    const rate = [
        'Từ 5 sao',
        'Từ 4 sao',
        'Từ 3 sao'
    ]
    const trademark=[
        {name:'Samsung'},
        {name:'LG'},
        {name:'Samsung'},
        {name:'LG'},
        {name:'Panasonic'}
    ]
    const supplier=[
        {name:'Trường Thiên Long'},
        {name:'Điện máy Gia Khang'},
        {name:'Trường Thiên Long'},
        {name:'Điện máy Gia Khang'},
        {name:'Điện máy Liên Minh'}
    ]
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
            <Col className='leftSide' span={4}>
                {/* <Affix className='fixBar' offsetTop={0}> */}
                    <div>
                        {/* <Title level={5}>Danh sách thể loại</Title>
                        <Menu items={product_categories} /> */}
                        <div style={{
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 10,
                        }}>
                            <Text strong>Nơi bán</Text>
                            <List
                                itemLayout="horizontal"
                                dataSource={itemToRender(placeOfSaleList, isShowAll1)}
                                loadMore={
                                    <Button type="link" icon={isShowAll1 ? <CaretUpOutlined /> :<CaretDownOutlined />} onClick={() => showAll1(!isShowAll1)} style={{paddingLeft: 0}}>
                                        {isShowAll1 ? `Thu gọn` : `Xem thêm `}
                                    </Button>
                                }
                                renderItem={(item,index) => (
                                    <List.Item key={index} style={{ paddingBottom: 5, paddingTop: 5 }}>
                                        <Checkbox onChange={onCheckChange} >{item.place}</Checkbox>
                                    </List.Item>
                                )}
                            />
                        </div>
                        <Divider style={{margin: 0}}/>
                        <div style={{
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 10,
                        }}>
                            <Text strong>Thương hiệu</Text>
                            <List
                                itemLayout="horizontal"
                                dataSource={itemToRender(trademark, isShowAll2)}
                                loadMore={
                                    <Button type="link" icon={isShowAll2?<CaretUpOutlined /> :<CaretDownOutlined />}onClick={() => showAll2(!isShowAll2)} style={{paddingLeft: 0}}>
                                        {isShowAll2 ? `Thu gọn` : `Xem thêm `}
                                    </Button>}
                                renderItem={(item,index) => (
                                    <List.Item key={index} style={{ paddingBottom: 5, paddingTop: 5 }}>
                                        <Checkbox >{item.name}</Checkbox>
                                    </List.Item>
                                )}
                            />
                        </div>
                        <Divider style={{margin: 0}}/>
                        <div style={{
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 10,
                        }}>
                            <Text strong>Nhà cung cấp</Text>
                            <List
                                itemLayout="horizontal"
                                dataSource={itemToRender(supplier, isShowAll3)}
                                loadMore={
                                    <Button type="link" icon={isShowAll3?<CaretUpOutlined /> :<CaretDownOutlined />}onClick={() => showAll3(!isShowAll3)} style={{paddingLeft: 0}}>
                                        {isShowAll3 ? `Thu gọn` : `Xem thêm `}
                                    </Button>}
                                renderItem={(item,index) => (
                                    <List.Item key={index} style={{ paddingBottom: 5, paddingTop: 5 }}>
                                        <Checkbox >{item.name}</Checkbox>
                                    </List.Item>
                                )}
                            />
                        </div>
                        <Divider style={{margin: 0}}/>
                        <div style={{
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 10,
                        }}>
                            <Text strong>Đánh giá</Text>
                             <List
                                itemLayout="horizontal"
                                dataSource={itemToRender(rate)}
                                renderItem={(item, index) => (
                                    <List.Item key={index} style={{ paddingBottom: 5, paddingTop: 5 }}>
                                        <Checkbox >{item} <StarFilled /></Checkbox>
                                    </List.Item>
                                )}
                            />
                        </div>
                        <Divider style={{margin: 0}}/>
                        <div style={{
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 10,
                        }}>
                            <Text strong>Giá</Text><br/>
                            <Space
                                direction="vertical"
                                size={8}
                                style={{
                                    display: 'flex',
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                }}
                            >
                                <Tag color="default" style={{}}>Dưới 5.000.000đ</Tag>
                                <Tag color="default">Từ 5.000.000đ - 15.000.000</Tag>
                                <Tag color="default">Trên 17.500.000đ</Tag>
                            </Space>
                            <Space>
                                <Form.Item label="Từ" name="priceMin">
                                    <InputNumber defaultValue={0} />
                                </Form.Item> -
                                <Form.Item label="đến" name="priceMax">
                                    <InputNumber defaultValue={0} />
                                </Form.Item>
                            </Space>
                        </div>
                        <div>
                            <Button type="primary" style={{width: '100%',}}>Tìm</Button>
                        </div>
                        <Divider style={{}}/>
                    </div>
            </Col>
            <Col className='rightSide' span={20}>
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
