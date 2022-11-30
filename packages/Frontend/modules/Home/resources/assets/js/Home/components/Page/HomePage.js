import React, { useContext, useEffect, useState } from 'react';
import { Card, Avatar, Rate, Image, Carousel, Button, Affix, BackTop, Col, Row, Space, Tabs, Typography, Tooltip, Popover, message } from 'antd';
import { LeftOutlined, RightOutlined, SearchOutlined, HeartOutlined, ShoppingCartOutlined, ShareAltOutlined, CloseOutlined, CopyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Meta from "antd/lib/card/Meta";
import { HomeContext } from '../Contexts/HomeContext';

const { Text } = Typography;
const HomePage = (props) => {
    const { config } = props.data;
    const { app } = config;
    const { baseURL } = app;
    const { data, get_products, setRouter, get_product_categories } = useContext(HomeContext);
    const { products, mouted, product_categories, loading_table } = data;
    const [messageApi, contextHolder] = message.useMessage();
    const [urlCoppied, seUrlCoppied] = useState('https://www.facebook.com/msmall.vn');
    const [openSharingPopup, setOpenSharingPopup] = useState(false);
    const [openBar, setOpenBar] = useState(false);
    const [copyTextClipBrd, setCopyTextClipBrd] = useState(false);
    const [paginatePage, setPaginatePage] = useState({
        current_page: 1,
        start: 0,
    });

    /**
     * @author: <thuymai0805@gmail.com>
     * @todo{Carousel Actions , DumyImage List *delete after change realdata*}
     * @param {unknown}
     * @returns {void}
     */
    const DummyImgList = [
        { id: 1, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/29/2c/4c/b8c757ba06d448ce3d2ec0bee3d75fa3.png.webp' },
        { id: 2, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/e5/db/cc/32b6b4268331a9ed46479ab0da46ae82.png.webp' },
        { id: 3, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/9b/19/a8/51a15d4d9811bdfa47559695a27d13a7.png.webp' },
        { id: 4, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/5f/8b/3d/96dc1c277cb1dbb4ea7d53a6f4c069f6.png.webp' },
        { id: 5, url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/47/3f/c4/7cb5b763e8644aa1d4ef5c5639f2c029.jpg.webp' },
    ];
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={
                "slick-prev slick-arrow" +
                (currentSlide === 0 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === 0 ? true : false}
            type="button"
        >
            <LeftOutlined />
        </button>
    );
    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={
                "slick-next slick-arrow" +
                (currentSlide === slideCount - 1 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1 ? true : false}
            type="button"
        >
            <RightOutlined />
        </button>
    );
    /**
     * @author: <thuymai0805@gmail.com>
     * @todo{css custome}
     * @param {unknown}
     * @returns {void}
     */
    const CarouselContentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    /**
     * @author: <thuymai0805@gmail.com>
     * @todo{css custome}
     * @param {unknown}
     * @returns {void}
     */
    const handleClickCategoriesTab = (e) => {
        console.log(e);
        setRouter({
            module: 'products',
            controller: 'products',
            action: 'bycategory',
            id: e ? e : 0
        })
    }


    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo
     * @param {unknown}
     * @returns {void}
     */
    const loadMoreProducts = () => {
        let next = paginatePage.start + 1;
        return setPaginatePage({
            ...paginatePage,
            start: next,
        });
    }

    const hide = () => {
        setOpenSharingPopup(false);
        setOpenBar(false);
        setCopyTextClipBrd(false);
    };

    /**
     * @author:
     * @todo:
     * @param {*} newOpen
     * @returns
     */
    const handleOpenSharingPopupChange = (newOpen) => {
        console.log(newOpen);
        return;
        setOpenSharingPopup(newOpen);
        setOpenBar(newOpen);
    };


    const copy = async () => {
        await navigator.clipboard.writeText(urlCoppied);
    }
    const copyToClipBoard = () => {
        copy();
        setCopyTextClipBrd(true);
        messageApi.open({
            type: 'success',
            content: 'Đã sao chép liên kết',
        });
    };

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo
     * @param {unknown}
     * @returns {void}
     */

    useEffect(() => {
        if (mouted) {
            get_products(paginatePage.start, {});
        }
    }, [paginatePage]);

    useEffect(() => {
        if (mouted) {
            get_product_categories(1, {});
        }
    }, []);

    return (
        <>
            <Tabs activeKey={'none'}
                tabPosition={'top'}
                onTabClick={(e) => handleClickCategoriesTab(e)}
                style={{ padding: '0px 5px', fontWeight: 500 }}
                items={product_categories.map((item) => {
                    return {
                        label: item.label,
                        key: item.key,
                    };
                })}

            />
            <Row className='home_top_banner_container'
                justify="space-between"
                gutter={[10, 16]} >
                <Col span={14} >
                    <Carousel
                        autoplay
                        arrows={true}
                        prevArrow=<SlickArrowLeft />
                        nextArrow=<SlickArrowRight />
                        swipeToSlide draggable >
                        {DummyImgList.map((item, index) => {
                            return <Image
                                height={355}
                                key={index}
                                preview={false}
                                style={CarouselContentStyle}
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
                style={{ padding: '1rem 0' }}>
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
                        prevArrow=<SlickArrowLeft />
                        nextArrow=<SlickArrowRight />
                        swipeToSlide draggable>
                        {DummyImgList.map((item, index) => {
                            return <Image
                                height={355}
                                key={index}
                                preview={false}
                                style={CarouselContentStyle}
                                src={item.url} />
                        })}
                    </Carousel>
                </Col>
                <Col span={24} className="productSlider">
                    <Carousel
                        slide
                        slidesToShow={5}
                        arrows={true}
                        prevArrow=<SlickArrowLeft />
                        nextArrow=<SlickArrowRight />
                        swipeToSlide draggable >
                        {products.map((item) => (
                            <Card key={item.id}
                                className="productItem"
                                hoverable
                                cover={<img
                                    alt={item.name ? item.name : `product-img`}
                                    style={{ padding: 10, height: '200px', width: '100%', objectFit: 'contain' }}
                                    src={item.image_link}
                                />}
                                onClick={() => setRouter({
                                    module: 'products',
                                    controller: 'productdetail',
                                    action: 'view',
                                    id: item.id,
                                })}
                                style={{ padding: 12, marginLeft: 5 }} >
                                <Meta title={item.name ? item.name : ``} />
                                <div className="rating">
                                    {/* <Rate defaultValue={item.rating} style={{ fontSize: 12 }} disabled /> */}
                                    <small style={{ color: 'rgb(128, 128, 137)' }}> | Đã bán: 100++ </small>
                                </div>
                                <Text className="price" type="danger" strong>{item.price ? item.price : ``} đ</Text>
                                <Space size={[0]} direction="vertical" className="productItem-btn-group">
                                    <Tooltip placement="rightTop" title={'Thêm vào Yêu thích'}>
                                        <Button icon={<HeartOutlined />} href="#" />
                                    </Tooltip>
                                    <Tooltip placement="right" title={'Thêm vào giỏ hàng'}>
                                        <Button icon={<ShoppingCartOutlined />} href="#" />
                                    </Tooltip>
                                    <Popover
                                        placement="rightTop"
                                        id="socialBtnBar"
                                        trigger="click"
                                        open={open}
                                        onOpenChange={handleOpenSharingPopupChange}
                                        content={<>
                                            <a className="close-btn" onClick={hide}><CloseOutlined /></a>
                                            <Space className="social-bar-container" align="end" size="small">
                                                Chia sẻ:
                                                <img src="/facebook.png" width={20} />
                                                <img src="/icon_instagram.png" width={20} />
                                                <img src="/twitter.png" width={20} />
                                                <CopyOutlined className={copyTextClipBrd == true ? 'copyClicked' : ''} style={{ fontSize: 16, }} onClick={copyToClipBoard} />
                                            </Space>
                                        </>}>
                                        <Button icon={<ShareAltOutlined />} href="#" />
                                    </Popover>
                                </Space>
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
                        {product_categories.map((item) => (
                            <Col span={3} key={item.value}>
                                <Button align='center' block style={{ height: '80px', borderRadius: 6 }} onClick={() => setRouter({
                                    module: 'products',
                                    controller: 'products',
                                    action: 'bycategory',
                                    id: item.value ? item.value : 0
                                })}>
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
                        <Row className="widgetContainer" gutter={[8, 8]}>
                            {product_categories.map((item, index) => (
                                <Col span={3} key={index}>
                                    <Button key={index} align='center' block style={{ height: 'auto' }}>
                                        <Avatar src={item.icon_link} size={48} />
                                        <p style={{ marginBottom: 0 }}>{item.label}</p>
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Affix>
                <Row className="productContainer">
                    <Space size={[10, 16]} style={{ width: '100%' }}>
                        <Row gutter={[8, 8]}>
                            {products.map((item, index) => (
                                <Col span={4} key={`${item.id}_${index}`}>
                                    <Card className="productItem"
                                        hoverable
                                        cover={<img
                                            alt={item.name ? item.name : ``}
                                            style={{ height: 189, width: 165, objectFit: `contain` }}
                                            src={item.image_link}
                                        />}
                                        // onClick={() => setRouter({
                                        //     module: 'products',
                                        //     controller: 'productdetail',
                                        //     action: 'view',
                                        //     id: item.id,
                                        // })}
                                        style={{ padding: 12 }}
                                        bodyStyle={{ padding: 0 }}
                                    >
                                        <div>
                                            {/* <Meta title={item.name ? item.name : ``} style={{fontWeight: 400}}/> */}
                                            <Text style={{ fontWeight: 400 }} ellipsis={true}>{item.name ? item.name : ``}</Text>
                                            <div className="rating">
                                                {/* <Rate defaultValue={item.rating} style={{ fontSize: 12 }} disabled /> */}
                                                <small style={{ color: 'rgb(128, 128, 137)' }}> | Đã bán: 100++ </small>
                                            </div>
                                            <Text className="price" type="danger" strong>{item.price ? item.price : ``} đ</Text>
                                        </div>
                                        <Space size={[0]} direction="vertical" className="productItem-btn-group">
                                            <Tooltip placement="rightTop" title={'Thêm vào Yêu thích'}>
                                                <Button icon={<HeartOutlined />} type="primary" />
                                            </Tooltip>
                                            <Tooltip placement="right" title={'Thêm vào giỏ hàng'}>
                                                <Button icon={<ShoppingCartOutlined />} type="primary" />
                                            </Tooltip>
                                            <Popover
                                                placement="rightTop"
                                                id="socialBtnBar"
                                                trigger="click"
                                                open={openSharingPopup}
                                                onOpenChange={handleOpenSharingPopupChange}
                                                content={<>
                                                    <a className="close-btn" onClick={hide}><CloseOutlined /></a>
                                                    <Space className="social-bar-container" align="end" size="small">
                                                        Chia sẻ:
                                                        <img src={`${baseURL}/images/facebook.png`} width={20} />
                                                        <img src={`${baseURL}/images/icon_instagram.png`} width={20} />
                                                        <img src={`${baseURL}/images/twitter.png`} width={20} />
                                                        <CopyOutlined className={copyTextClipBrd == true ? 'copyClicked' : ''} style={{ fontSize: 16, }} onClick={copyToClipBoard} />
                                                    </Space>
                                                </>}
                                            >
                                                <Button icon={<ShareAltOutlined />} type="primary" />
                                            </Popover>
                                        </Space>
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
                                    <Button type="primary"
                                        style={{ width: '100%', borderRadius: 4 }}
                                        size={`large`} onClick={() => loadMoreProducts()}
                                        loading={loading_table}
                                    >
                                        Xem thêm
                                    </Button>
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
};
export default HomePage;
