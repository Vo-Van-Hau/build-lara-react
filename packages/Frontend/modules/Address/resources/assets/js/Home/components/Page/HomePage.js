import React from 'react';
import { Col, Image, Row, Tabs, Typography } from 'antd';
import { Card, Avatar, Rate, Carousel } from "antd"
import { Button, Space, Affix } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Meta from "antd/lib/card/Meta";

const HomePage = (props) => {

    const CategoryBar = () => {
        const categories = [
            { id: 1, name: 'Thịt, Rau Củ' },
            { id: 2, name: 'Bách Hóa' },
            { id: 3, name: 'Nhà Cửa' },
            { id: 4, name: 'Điện Tử' },
            { id: 5, name: 'Thiết Bị Số' },
            { id: 6, name: 'Điện Thoại' },
            { id: 7, name: 'Mẹ & Bé' },
            { id: 8, name: 'Loại 8' },
            { id: 9, name: 'Loại 9' },
            { id: 10, name: 'Thịt, Rau Củ' },
            { id: 12, name: 'Bách Hóa' },
            { id: 13, name: 'Nhà Cửa' },
            { id: 14, name: 'Điện Tử' },
            { id: 15, name: 'Thiết Bị Số' },
            { id: 16, name: 'Điện Thoại' },
            { id: 17, name: 'Mẹ & Bé' },
            { id: 18, name: 'Loại 8' },
            { id: 19, name: 'Loại 9' },
        ]

        const handleClickTab = (e) => {
            console.log(e);

        }

        return <Tabs
            activeKey={'none'}
            tabPosition={'top'}
            onTabClick={(e) => handleClickTab(e)}
            style={{ padding: '0px 5px' }}
            items={categories.map((item, index) => {
                return {
                    label: item.name,
                    key: item.id,
                    disabled: index === categories.length,
                };
            })}
        />
    }

    const HomeBanner = () => {
        const imgSrc = [
            { id: 1, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/29/2c/4c/b8c757ba06d448ce3d2ec0bee3d75fa3.png.webp' },
            { id: 2, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/e5/db/cc/32b6b4268331a9ed46479ab0da46ae82.png.webp' },
            { id: 3, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/9b/19/a8/51a15d4d9811bdfa47559695a27d13a7.png.webp' },
            { id: 4, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/5f/8b/3d/96dc1c277cb1dbb4ea7d53a6f4c069f6.png.webp' },
            { id: 5, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/47/3f/c4/7cb5b763e8644aa1d4ef5c5639f2c029.jpg.webp' },
        ]
        const contentStyle = {
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
        };


        return <>
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
        </>
    }
    const TopBanner = () => {


        return <>
            <Row className='home_top_banner_container'
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
        </>
    }
    const CategoriesContainer = () => {
        const tittleArr = [
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
        return (<>
            <Row className="widgetContainer">
                <Space size={[10, 16]} wrap
                    style={{
                        width: '100%', padding: '1rem',
                        justifyContent: 'space-between',
                        backgroundColor: '#fff'
                    }} >
                    {tittleArr.map((item, index) => (
                        <Button key={index} align='center' block style={{ height: '80px' }}>
                            <Avatar src={item.img} size={48} />
                            <p>{item.title}</p>
                        </Button>
                    ))}
                </Space>

            </Row>
        </>)
    }
    const AdsBanners = () => {

        return (<>
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
        </>)
    }

    const SuggestionProduct = () => {
        const tittleArr = [
            { img: 'https://joeschmoe.io/api/v1/random', title: 'Just For You' },
            { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/7d/8a/6e/d8b76e2c43cbd06b7e1aa3ab8c54df64.png.webp', title: 'Market Center' },
            { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/41/99/9a/8898607d7fca4b79775a708c57a8152f.png.webp', title: 'Sale 50%' },
            { img: 'https://salt.tikicdn.com/cache/w100/ts/tikimsp/2e/9d/d1/df6a4b086a39de681ae46c210efb4afc.png.webp', title: 'Hot Deal' },
            { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/b7/aa/f3/bcff08097ead36826d2c9daf7c2debd5.png.webp', title: 'Freeship' },
            { img: 'https://salt.tikicdn.com/cache/w100/ts/personalish/dc/f1/b1/6ba9e529785de3ad1a81b9c569d05aa0.png.webp', title: 'Fashion' },

        ]

        const productArr = [
            { img: '', title: 'Europe Street beat', price: 120000, rating: 4, soldquantity: 11 },
            { img: '', title: 'Europe Street beat 2', price: 120000, rating: 3, soldquantity: 11 },
            { img: '', title: 'Europe Street beat 3', price: 120000, rating: 5, soldquantity: 11 },
            { img: '', title: 'Europe Street beat 4', price: 120000, rating: 4, soldquantity: 11 },
            { img: '', title: 'Europe Street beat 5', price: 120000, rating: 2, soldquantity: 11 },
            { img: '', title: 'Europe Street beat 6', price: 120000, rating: 4, soldquantity: 11 },
            { img: '', title: 'Europe Street beat 7', price: 120000, rating: 3, soldquantity: 11 },

        ]
        return <>
            <Affix offsetTop={0}>
                <div className="sectionContainer">
                    <Row className="titleHeading">
                        <Col>
                            <h2>Sản phẩm đề xuất hôm nay</h2>
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
                <Space size={[10, 16]} wrap style={{ width: '100%' }} justify="space-between">

                    {productArr.map((item, index) => (

                        <Card className="productItem"
                            key={index}
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title={item.title} />

                            <div className="rating">
                                <Rate defaultValue={item.rating} style={{ fontSize: 12 }} disabled />
                                <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 100++ </small>
                            </div>

                            <Text className="price" type="danger" strong>120.000 đ</Text>

                        </Card>
                    ),
                    )}
                </Space>
            </Row>
        </>
    }

    return (<>
        <CategoryBar />
        <HomeBanner />
        <TopBanner />
        <CategoriesContainer />
        <AdsBanners />
        <SuggestionProduct />
    </>
    );
}

export default HomePage;

const { Text } = Typography;



