import React, { useContext, useEffect } from 'react';
import { Card, Avatar, Rate, Image, Carousel, Button, Affix, BackTop, Col, Row, Space, Tabs, Typography } from 'antd';
import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Meta from "antd/lib/card/Meta";
import { HomeContext } from '../Contexts/HomeContext';

const HomePage = (props) => {
    const { data, get_products, setRouter, get_product_categories } = useContext(HomeContext);
    const { products, mouted, product_categories } = data;
    const { Text } = Typography;
    const imgSrc = [
        { id: 1, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/29/2c/4c/b8c757ba06d448ce3d2ec0bee3d75fa3.png.webp' },
        { id: 2, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/e5/db/cc/32b6b4268331a9ed46479ab0da46ae82.png.webp' },
        { id: 3, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/9b/19/a8/51a15d4d9811bdfa47559695a27d13a7.png.webp' },
        { id: 4, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/5f/8b/3d/96dc1c277cb1dbb4ea7d53a6f4c069f6.png.webp' },
        { id: 5, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/47/3f/c4/7cb5b763e8644aa1d4ef5c5639f2c029.jpg.webp' },
    ]
    const tittleArr = [
        { img: 'https://joeschmoe.io/api/v1/random', title: 'Just For You' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/7d/8a/6e/d8b76e2c43cbd06b7e1aa3ab8c54df64.png.webp', title: 'Market Center' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/41/99/9a/8898607d7fca4b79775a708c57a8152f.png.webp', title: 'Sale 50%' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/tikimsp/2e/9d/d1/df6a4b086a39de681ae46c210efb4afc.png.webp', title: 'Hot Deal' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/b7/aa/f3/bcff08097ead36826d2c9daf7c2debd5.png.webp', title: 'Freeship' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/dc/f1/b1/6ba9e529785de3ad1a81b9c569d05aa0.png.webp', title: 'Fashion' },
    ]
    const categoriesArr = [
        { img: 'https://static.vecteezy.com/system/resources/previews/003/717/164/non_2x/women-fashion-pink-flat-design-long-shadow-glyph-icon-luxury-clothes-and-accessories-female-shoes-apparel-details-e-commerce-department-online-shopping-categories-silhouette-illustration-vector.jpg', title: 'Quần Áo' },
        { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvach0GUaLjVFTsZQC1SmGaTv2vgmmkU79bXKEWSlGMryz4vFUgvPJ-Y3Sxtz7Xf-PYRw&usqp=CAU', title: 'SALE' },
        { img: 'https://static.vecteezy.com/system/resources/previews/003/769/924/original/electronics-and-accessories-pink-flat-design-long-shadow-glyph-icon-smartphone-and-laptop-computers-and-devices-e-commerce-department-online-shopping-categories-silhouette-illustration-vector.jpg', title: 'Đồ Gia Dụng' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/tikimsp/2e/9d/d1/df6a4b086a39de681ae46c210efb4afc.png.webp', title: 'Hot Deal' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/b7/aa/f3/bcff08097ead36826d2c9daf7c2debd5.png.webp', title: 'Freeship' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/dc/f1/b1/6ba9e529785de3ad1a81b9c569d05aa0.png.webp', title: 'Fashion' },
        { img: 'https://joeschmoe.io/api/v1/random', title: 'Just For You' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/7d/8a/6e/d8b76e2c43cbd06b7e1aa3ab8c54df64.png.webp', title: 'Market Center' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/41/99/9a/8898607d7fca4b79775a708c57a8152f.png.webp', title: 'Sale 50%' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/tikimsp/2e/9d/d1/df6a4b086a39de681ae46c210efb4afc.png.webp', title: 'Hot Deal' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/b7/aa/f3/bcff08097ead36826d2c9daf7c2debd5.png.webp', title: 'Freeship' },
        { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/dc/f1/b1/6ba9e529785de3ad1a81b9c569d05aa0.png.webp', title: 'Fashion' },

    ]

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const handleClickTab = (e) => {
        console.log(e);
    }

    useEffect(() => {
        if (mouted) {
            get_products(1, {});
            get_product_categories(1, {});
        }
    }, []);

    return (
        <>
        <Tabs activeKey={'none'}
            tabPosition={'top'}
            onTabClick={(e) => handleClickTab(e)}
            style={{ padding: '0px 5px', fontWeight: 500 }}
            items={product_categories.map((item, index) => {
                return {
                    label: item.label,
                    key: item.key,
                };
            })}
        />
        <Row className='home_top_banner_container'
            justify="space-between"
            gutter={[10, 16]}
        >
            <Col span={14} >
                <Carousel
                    autoplay
                    arrows={true}
                    prevArrow={<LeftOutlined />}
                    nextArrow={<RightOutlined />}
                    swipeToSlide draggable
                >
                    {imgSrc.map((item, index) => {
                        return <Image
                            height={355}
                            key={index}
                            preview={false}
                            style={contentStyle}
                            src={item.url} />
                    })}
                </Carousel>
            </Col>

            <Col span={10}>
                <Image preview={false}
                    style={{ objectFit: 'contain', borderRadius: '3px' }}
                    src={'https://salt.tikicdn.com/cache/w750/ts/banner/1f/48/85/1e0d26bf9e0f148402ef6e56ad374941.png.webp'}
                />
            </Col>
        </Row>
        <Row className='home_group_banner_container'
            justify="space-between"
            gutter={[10, 20]}
            style={{ padding: '1rem 0' }}
        >
            <Col flex="1">
                <Image preview={false}
                    style={{ objectFit: 'cover', borderRadius: '3px' }}
                    src={'https://salt.tikicdn.com/cache/w750/ts/banner/1f/48/85/1e0d26bf9e0f148402ef6e56ad374941.png.webp'}
                />
            </Col>
            <Col flex="3">
                <Image preview={false}
                    height={'100%'}
                    style={{ objectFit: 'cover', borderRadius: '3px' }}
                    src={'https://salt.tikicdn.com/cache/w1080/ts/banner/26/ea/9c/c3710ec037706052a7a2da56c4a66901.png.webp'}
                />
            </Col>
            <Col flex="1">
                <Image preview={false}
                    style={{ objectFit: 'cover', borderRadius: '3px' }}
                    src={'https://salt.tikicdn.com/cache/w750/ts/banner/1f/48/85/1e0d26bf9e0f148402ef6e56ad374941.png.webp'}
                />
            </Col>
        </Row>
        <Row className="titleHeading">
            <Col span={22}>
                <h2>Thương hiệu chính hãng</h2>
            </Col>
            <Col span={2} className='more-btn'>
                <Typography.Link type="primary" >Xem thêm</Typography.Link>
            </Col>
        </Row>
        <Row className="productContainer">
        <Col span={24} className='bannerSlider'>
            <Carousel
                slidesToShow={2}
                autoplay
                arrows={true}
                prevArrow={<LeftOutlined />}
                nextArrow={<RightOutlined />}
                swipeToSlide draggable
                >
                {imgSrc.map((item, index) => {
                    return <Image
                        height={355}
                        key={index}
                        preview={false}
                        style={contentStyle}
                        src={item.url} />
                })}
            </Carousel>    
        </Col>
        <Col span={24} className="productSlider">
            <Carousel
                slide
                slidesToShow={5}
                arrows={true}
                prevArrow={<LeftOutlined />}
                nextArrow={<RightOutlined />}
                swipeToSlide draggable
            >
                {products.map((item, index) => (
                    <Card key={item.id} className="productItem"
                        hoverable
                        cover={<img
                            alt={item.name ? item.name : `product-img`}
                            style={{ padding:10,height: '200px', width: '100%', objectFit: 'contain' }}
                            src={item.image_link}
                        />}
                        onClick={() => setRouter({
                            module: 'products',
                            controller: 'productdetail',
                            action: 'view',
                            id: item.id,
                        })}
                        style={{ padding: 12, marginLeft:5 }}
                    >
                        <Meta title={item.name ? item.name : ``} />
                        <div className="rating">
                            {/* <Rate defaultValue={item.rating} style={{ fontSize: 12 }} disabled /> */}
                            <small style={{ color: 'rgb(128, 128, 137)' }}> | Đã bán: 100++ </small>
                        </div>
                        <Text className="price" type="danger" strong>{item.price ? item.price : ``} đ</Text>
                    </Card>
                    ))}
            </Carousel>
        </Col>
        </Row>
        <Row className="titleHeading">
            <Col>
                <h2>Danh mục sản phẩm</h2>
            </Col>
        </Row>
        <Row className="categories_block_container">
        
            <Space size={[10, 16]} 
                    style={{
                    width: '100%', padding: '1rem',
                    backgroundColor: '#fff'
                    }}
            >
                <Row gutter={[16, 16]}>
                    {product_categories.map((item, index) => (
                        <Col span={3} key={item.value}>
                            <Button align='center' block style={{ height: '80px', borderRadius: 6 }}>
                                <Avatar src={item.icon_link} size={48} />
                                <p>{item.label}</p>
                            </Button>
                        </Col>
                    ))}
                </Row>
            </Space>
        </Row>
        <Row className='ads_banners_container'
            justify="space-between"
            gutter={[10, 20]}
            style={{ padding: '1rem 0' }}
        >
            <Col span={6}>
                <Image preview={false}
                    style={{ objectFit: 'cover', borderRadius: '3px' }}
                    src={'https://salt.tikicdn.com/cache/w400/ts/banner/d6/86/61/2bd493a55e955d6b70afe7ba5d0c8bdd.png.webp'}
                />
            </Col>
            <Col span={6}>
                <Image preview={false}
                    style={{ objectFit: 'cover', borderRadius: '3px' }}
                    src={'https://salt.tikicdn.com/cache/w400/ts/banner/40/7b/ec/c74769be66862263dc3d95ed92e73cfd.png.webp'}
                />
            </Col>
            <Col span={6}>
                <Image preview={false}
                    style={{ objectFit: 'cover', borderRadius: '3px' }}
                    src={'https://salt.tikicdn.com/cache/w400/ts/banner/f2/cb/06/5b1f4c52c2a4e312919e32470ccd2554.png.webp'}
                />
            </Col>
            <Col span={6}>
                <Image preview={false}
                    style={{ objectFit: 'cover', borderRadius: '3px' }}
                    src={'https://salt.tikicdn.com/cache/w400/ts/banner/63/67/34/84a791b2a02dcc9f1ce93df1414ca207.png.webp'}
                />
            </Col>
        </Row>
        <>
            <Affix offsetTop={0}>
                <div className="sectionContainer">
                    <Row className="titleHeading">
                        <Col>
                            <h2>Sản phẩm đề xuất</h2>
                        </Col>
                    </Row>
                    <Row className="widgetContainer">
                        <Space size={[10, 16]} wrap style={{ width: '100%', justifyContent: 'space-between' }} >
                            {tittleArr.map((item, index) => (
                                <Button key={index} align='center' block style={{ height: '80px', width: '200px' }}>
                                    <Avatar src={item.img} size={48} />
                                    <p>{item.title}</p>
                                </Button>
                            ))}
                        </Space>

                    </Row>
                </div>
            </Affix>
            <Row className="productContainer">
                <Space size={[10, 16]} style={{ width: '100%' }}>
                    <Row gutter={[16, 16]}>
                        {products.map((item, index) => (
                            <Col span={4} key={item.id}>
                                <Card className="productItem"
                                    hoverable
                                    cover={<img
                                        alt={item.name ? item.name : ``}
                                        style={{ height: 189, width: 165, objectFit: `contain` }}
                                        src={item.image_link}
                                    />}
                                    onClick={() => setRouter({
                                        module: 'products',
                                        controller: 'productdetail',
                                        action: 'view',
                                        id: item.id,
                                    })}
                                    style={{ padding: 12 }}
                                >
                                    <Meta title={item.name ? item.name : ``} />
                                    <div className="rating">
                                        {/* <Rate defaultValue={item.rating} style={{ fontSize: 12 }} disabled /> */}
                                        <small style={{ color: 'rgb(128, 128, 137)' }}> | Đã bán: 100++ </small>
                                    </div>
                                    <Text className="price" type="danger" strong>{item.price ? item.price : ``} đ</Text>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Space>
                <Row justify="center" style={{ padding: 8, width: '100%' }}>
                    <Col span={10}></Col>
                    <Col span={4}>
                        <div>
                            <div style={{ padding: 24, }}>
                                <Button type="primary" style={{ width: '100%', borderRadius: 6 }} size={`large`}>Xem thêm</Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={10}></Col>
                </Row>
            </Row>
        </>
        <BackTop>
            <div className="ant-back-top-inner">
                <Image width={65} height={65} src='/images/totop.png' alt='totop' preview={false} />
            </div>
        </BackTop>
        </>);
}

export default HomePage;
