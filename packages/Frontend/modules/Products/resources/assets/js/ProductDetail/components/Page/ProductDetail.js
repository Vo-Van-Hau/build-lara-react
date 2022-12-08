import React, { useContext, useEffect, useState } from 'react';
import {
    Avatar, Button, Col, Image, Rate, Row, Space, Card, Carousel, List, message, Descriptions,
    Divider, Input, notification, Breadcrumb, Typography, Tooltip, Popover, Modal
} from 'antd';
import {
    HomeOutlined, ShopOutlined, PlusOutlined, MoreOutlined, LikeOutlined, AppstoreOutlined,
    MinusOutlined, StarFilled, TagsOutlined, GlobalOutlined, HeartOutlined, ShoppingCartOutlined, ShareAltOutlined, CloseOutlined, CopyOutlined
} from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { ProductDetailContext } from '../Contexts/ProductsDetailContext';
import Helper from '../Helper/Helper';
import Slider from "react-slick";

const { Text, Title } = Typography;

const ProductDetailPage = (props) => {

    console.log(props);

    const { id } = props;
    const { user, config } = props.data;
    const { is_login, customer } = user;
    const { customer_address } = customer;
    const { app } = config;
    const { baseURL, adminPrefix } = app;

    const {
        data, get_product_item, add_to_cart, setRouter, get_similar_products
    } = useContext(ProductDetailContext);
    const { product_item, mouted } = data;
    const { seller, similar_products, products_additional_image_link, product_identifiers } = product_item;
    const { store } = seller;

    const [quantity, setQuantity] = useState(1);
    const [selectedImg, setSelectedImg] = useState(false);
    const [ratingReview, setRatingReview] = useState(5)
    const [listRating, setListRating] = useState([]);
    const [isModalConfirmLogin, setIsModalConfirmLogin] = useState(false);

    const slickSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    const SliderSlick = Slider;

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo
     * @param {array} customer_address
     * @return {Object}
     */
    const getDefaultDeliveryTo = (customer_address = []) => {
        if(customer_address && Array.isArray(customer_address) && customer_address.length > 0) {
            let result = customer_address.find((item, _i) => {
                return item.is_default === 1;
            });
            return result ? result : false;
        }
        return false;
    }

    const defaultDeliveryTo = getDefaultDeliveryTo(customer_address ? customer_address : []);

    /**
     * @todo:
     * @return {void}
     */
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    }

    /**
     * @todo
     * @return {void}
     */
    const handleDecrease = () => {
        ((quantity === 0 || quantity < 0 || quantity === 1) ? quantity = 1 : setQuantity(quantity - 1));
    }

    /**
     * @todo: add product to cart
     * @param:
     * @return {void}
     */
    const handleAddToCart = () => {
        if(is_login) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const key = `open${Date.now()}`;
            const btn = (<Button className='viewCartBtn' type="primary" onClick={() => {
                notification.close(key);
                setRouter({
                    module: 'checkout',
                    controller: 'cart',
                    action: 'view',
                    id: seller.id ? seller.id : '#'
                });
            }} block>
                {`Xem giỏ hàng và thanh toán`}
            </Button>);
            notification.success({
                message: `Thêm vào giỏ hàng thành công!`,
                placement: 'topRight',
                top: 80,
                duration: 5,
                btn, key,
                style: {
                    fontSize: '14px',
                    padding: '10px',
                    width: 300,
                }
            });
            add_to_cart({
                product_id: product_item.id,
                quantity,
            });
            setQuantity(1);
        } else {
            setIsModalConfirmLogin(true);
        }
    }

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    /**btn group in productI */
    const [urlCoppied, seUrlCoppied] = useState('https://www.facebook.com/msmall.vn');
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [openBar, setOpenBar] = useState(false);
    const [copyTextClipBrd, setCopyTextClipBrd] = useState(false);
    const hide = () => {
        setOpen(false);
        setOpenBar(false);
        setCopyTextClipBrd(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
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
     *
     */
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

        </button>
    );

    /**
     *
     */
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

        </button>
    );

    const listDummy = [
        {
            name: "Krämer",
            picture: "https://randomuser.me/api/portraits/men/46.jpg",
            date: "2022-11-25 13:38",
            type: "màu trắng",
            rating: 1,
            comment: 'Giao hàng bthg, đóng gói tạm ổn nhe, có điều sách bị xước với bụi :(( sẽ dùng và review thêm nha'
        },
        {
            name: "Krämer02",
            picture: "https://randomuser.me/api/portraits/men/25.jpg",
            date: "2022-11-25 13:38",
            type: "màu đen",
            rating: 1,
            comment: 'Giao hàng bthg, đóng gói tạm ổn nhe, có điều sách bị xước với bụi :(( sẽ dùng và review thêm nha'
        },
        {
            name: "Chavare",
            picture: "https://randomuser.me/api/portraits/women/42.jpg",
            date: "2022-11-25 13:38",
            type: "500gr",
            rating: 2
        },
        {
            name: "Chavare02",
            picture: "https://randomuser.me/api/portraits/men/42.jpg",
            date: "2022-11-25 13:38",
            type: "500gr",
            rating: 2
        },
        {
            name: "Chavare03",
            picture: "https://randomuser.me/api/portraits/women/15.jpg",
            date: "2022-11-25 13:38",
            type: "500gr",
            rating: 2
        },
        {
            name: "کریمی",
            picture: "https://randomuser.me/api/portraits/women/20.jpg",
            date: "2022-11-25 13:38",
            type: "màu trắng",
            rating: 3
        },
        {
            name: "Jason",
            picture: "https://randomuser.me/api/portraits/men/21.jpg",
            date: "2022-11-25 13:38",
            type: "màu trắng",
            rating: 4,
            comment: "Chê. Nhìn giống như là đã cũ , không đóng gói kĩ càng, hộp như đã từng bóc qua và cũ rồi."
        },
        {
            name: "Webb",
            picture: "https://randomuser.me/api/portraits/men/87.jpg",
            date: "2022-11-25 13:38",
            type: "màu trắng",
            rating: 5,
            comment: `Cực kì hài lòng <br/>
            Đã mua hàng
            Giao hàng nhanh <br/>
            chất lượng sách Tuyệt vời ông mặt trời <br/>
            Về nội dung sách: toàn những tác phẩm bán chạy toàn cầu thì chất lượng không phải bàn. <br/>`
        }
    ]

    const handleChangebtnRating = (param) => {
        console.log(param);
        let data = [];
        switch (param) {
            case 'all':
                data = listDummy;
                setRatingReview(5);
                break;
            case 1:
                data = listDummy.filter((item) => item.rating === 1);
                setRatingReview(1);
                break;
            case 2:
                data = listDummy.filter((item) => item.rating === 2);
                setRatingReview(2);
                break;
            case 3:
                data = listDummy.filter((item) => item.rating === 3);
                setRatingReview(3);
                break;
            case 4:
                data = listDummy.filter((item) => item.rating === 4);
                setRatingReview(4);
                break;
            case 5:
                data = listDummy.filter((item) => item.rating === 5);
                setRatingReview(5);
                break;
            default: return listDummy;
        }
        setListRating(data);

    }

    useEffect(() => {
        if(mouted) {
            get_product_item({ id: props.id });
            get_similar_products();
        }
    }, [id]);

    useEffect(() => {
        setListRating(listDummy);
    }, []);

    return (<>
        <>
            <Breadcrumb style={{ padding: '12px' }}>
                <Breadcrumb.Item style={{ cursor: 'pointer' }} >
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item style={{ cursor: 'pointer' }}>
                    <span>Sản phẩm</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{product_item.name}</Breadcrumb.Item>
            </Breadcrumb>
        </>
        <Row className='product_item_container' justify='space-between'>
            <Col span={8} className='product_image_container'>
                <Image preview={false}
                    style={{ objectFit: 'contain', borderRadius: '3px' }}
                    src={selectedImg ? selectedImg : product_item.image_link}
                />
                <div style={{
                    marginTop: 24, paddingLeft: 36, paddingRight: 36, paddingTop: 12, paddingBottom: 12,
                    background: 'yellowgreen', border: '1px solid #000000', borderRadius: 4
                }}>
                    <SliderSlick {...slickSettings}>
                        {products_additional_image_link.map((item, index) => {
                            return (
                                <img style={{ width: 64, height: 64 }} className="galery-img-item" key={index} src={item.url} alt="images" onClick={() => setSelectedImg(item.url)} />
                            )
                        })}
                    </SliderSlick>
                </div>
            </Col>
            <Col className='separate'></Col>
            <Col span={15} className='product_info_container'>
                <Row className='head'>
                    <Col span={24} style={{}}>
                        <Text style={{fontWeight: 480, fontSize: 16,}}>
                            <TagsOutlined /> <span>Thương hiệu:</span> <span style={{color: '#0B74E5'}}>{product_identifiers ? product_identifiers.brand : ``}</span>
                        </Text>
                    </Col>
                    <Col span={24} style={{}}>
                        <Text style={{fontWeight: 480, fontSize: 16,}}>
                            <AppstoreOutlined /> <span>Loại sản phẩm:</span> <span style={{color: '#0B74E5'}}>{product_item.category ? product_item.category.title : ``}</span>
                        </Text>
                    </Col>
                    <Col span={24} style={{marginBottom: 8, marginTop: 8}}>
                        <Text style={{fontWeight: 300,fontSize: 24, color: 'rgb(36, 36, 36)'}}>{product_item.name || ''}</Text>
                    </Col>
                    <Col className='rating' span={24}>
                        <Space split={<Divider type="vertical" />}>
                            <Rate disabled defaultValue={4} style={{ fontSize: 20, marginRight: 10 }} />
                            <span style={{ color: 'rgb(128, 128, 137)' }}>
                                Đã bán: {product_item.quantity_sold || 0 }
                            </span>
                        </Space>
                    </Col>
                </Row>
                <Row className='body'>
                    <Col className='product_add' span={15}>
                        <span className='product_price__current-price'>{product_item.price_format} ₫</span>
                        <span className='product_price__list-price'>{product_item.price_format} ₫</span>
                        <span className='product_price__discount-rate'>-32%</span>
                        <Divider/>
                        <Card className='client_info' title="Giao tới" extra={<a href="#" onClick={() => setRouter({module: 'customer', controller: 'address', action: '#', id: '#',})}>Thay đổi</a>}>
                            <Title level={5}>{ defaultDeliveryTo && defaultDeliveryTo.customer_name ? defaultDeliveryTo.customer_name : ''}</Title>
                            <span className='phone_number'>{ defaultDeliveryTo && defaultDeliveryTo.phone ? defaultDeliveryTo.phone : ''}</span>
                            <span> <Divider type="vertical"/></span>
                            <span className='address'>
                                {
                                    (defaultDeliveryTo && defaultDeliveryTo.address && defaultDeliveryTo.ward && defaultDeliveryTo.district && defaultDeliveryTo.province)
                                    ? `${defaultDeliveryTo.address || ''}, ${defaultDeliveryTo.ward.name || ''},
                                    ${defaultDeliveryTo.district.type || ''} ${defaultDeliveryTo.district.name || ''},
                                    ${defaultDeliveryTo.province.type || ''} ${defaultDeliveryTo.province.name || ''}` : ''
                                }
                            </span>
                        </Card>
                        <Divider/>
                        <div className='product_quantity'>
                            <>
                                <div style={{marginBottom: 4}}>
                                    <Text strong>Số Lượng</Text>
                                </div>
                                <Button.Group>
                                    <Button icon={<MinusOutlined />} type="ghost" onClick={() => handleDecrease()} />
                                    <Input value={quantity} style={{ width: '60px', textAlign: 'center' }} />
                                    <Button icon={<PlusOutlined />} type="ghost" onClick={() => handleIncrease()} />
                                </Button.Group>
                            </>
                        </div>
                        <div className='add_to_cart'>
                            <Button type='danger' onClick={handleAddToCart} size='large' className='add_to_cart_btn' block>Chọn Mua</Button>
                        </div>
                    </Col>
                    <Col className='shop_info' span={8} offset={1}>
                        <Row gutter={[16, 16]}>
                            <Col >
                                <Avatar size={48} src={store.brand_logo ? store.brand_logo : ''} />
                            </Col>
                            <Col span={12}>
                                <><Button type='link' onClick={() => setRouter({
                                    module: 'shop',
                                    controller: 'shop',
                                    action: 'view',
                                    id: seller.id ? seller.id : '#'
                                })}>{store.name ? store.name : ''}</Button></>
                            </Col>
                            <Col span={12} className='shop_rating'>
                                <div>4.5 / 5  <StarFilled /></div>
                                <div></div>
                            </Col>
                            <Col span={12} className='shop_follow'>
                                <div>250k+ Theo dõi</div>
                            </Col>

                            <Space wrap className='btn-group' style={{ justifyContent: 'center' }}>
                                <Button icon={<ShopOutlined />} size='middle' onClick={() => setRouter({
                                    module: 'shop',
                                    controller: 'shop',
                                    action: 'view',
                                    id: seller.id ? seller.id : '#'
                                })}>
                                    Xem Shop
                                </Button>
                                <Button icon={<PlusOutlined />} size='middle' >
                                    Theo Dõi
                                </Button>
                            </Space>

                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row className='product_detail_container'>
            <Col span={24}>
                <h3>Thông tin chi tiết</h3>
            </Col>
            <Col span={24} className='table_detail_container'>
                <Descriptions column={24} bordered>
                    <Descriptions.Item span={24} labelStyle={{ width: '25%', fontWeight: 'bold' }} label='Thương hiệu'>{product_identifiers ? product_identifiers.brand : `-`}</Descriptions.Item>
                    <Descriptions.Item span={24} labelStyle={{ width: '25%', fontWeight: 'bold' }} label="Xuất xứ">Việt Nam</Descriptions.Item>
                    <Descriptions.Item span={24} labelStyle={{ width: '25%', fontWeight: 'bold' }} label="Mã SKU">{product_identifiers ? product_identifiers.sku : '-'}</Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
        <Row className='product_description_container'>
            <Col span={24}>
                <h3>Mô tả sản phẩm</h3>
            </Col>
            <Col span={24}>
                <p className='description_txt' dangerouslySetInnerHTML={{ __html: product_item.description }}></p>
            </Col>
        </Row>
        <Row className='product_related_container'>
            <Col span={24} className="productSlider">
                <Carousel
                    slide
                    slidesToShow={5}
                    arrows={true}
                    prevArrow=<SlickArrowLeft />
                    nextArrow=<SlickArrowRight />
                    swipeToSlide draggable
                >
                    {similar_products.map((item, index) => (
                        <Card key={item.id}
                            className="productItem"
                            hoverable
                            cover={<img
                                alt={item.name ? item.name : `product-img`}
                                style={{ padding: 10, height: '200px', width: '100%', objectFit: 'contain' }}
                                src={item.image_link ? item.image_link : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX09PTMzMzJycnPz8/d3d3V1dXi4uLo6Ojw8PDx8fH39/ft7e3Y2NjQ0NDp6enb29uHE20LAAACaklEQVR4nO3b6W6CQBhGYUTWD9T7v9uylLIN6jCk8Cbn+deEGo6DMOAYRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJyFiuzshLesStJAdVZdufEV38LFydkZm6w+IrBJrK86itkxgU1ifnaKmz363QvUvsbjmoNYdjuXPPMQz6R7lfLsGKeq3bd76LvfHwnFIXt0tOKYwjuF51kVtjMUbzqFVmR1/cpK30idwv7qH98yz0SVwvI+XP19JygqhY9xehMnXokihfl0/hZ77a5I4WM2zXz5DKJI4XwKvjHLNGeGRmE1L7w7N7fKeRLSKCy+KGwCnedZjcJofruXuo7SbpwdiRqFlk4D42y9rf0eyOtEjcL5BzFeb2rV5oRApNAmj6QcjyRs8g4sE0UKJ4nxemJq8yGeJ6oURpY/uic26frppy0uJvNEmcI2JM/yovlz8cxlGbhIFCrcsA6cX0/kC52Bt3hMlC90Bk5HUbzQPYL9KA6b6BXmk8/YZuCYqFdYj/f47wL/EtUKrR6/LXsfOCSKFbaBQ+KnwGa79sqpVWjp7x1Ec6B+DhQsHAK7xM+BeoVjYLPzr499eoXTwO+IFfoHihXuWbWgVVh792kV7lt3IlRoe0ZQqvCLax+FZ8c4UUghheebFu6jU1gk++gU7l3t3f2rRmGAyxcGr329cuEh60stunBh2Z3y6yxM/wX52S1u/bf3Ryzzdq9tuIDnYWv1q7NTNlhy0O8t/Nb6/SfLbnHoYbpjSep/sjLfOZ0ZXfTXJKPgH69deAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDyA0uAKIxQw0bjAAAAAElFTkSuQmCC'}
                            />}
                            onClick={() => setRouter({
                                module: 'products',
                                controller: 'productdetail',
                                action: 'view',
                                id: item.id,
                            })}
                            style={{ padding: 12, marginLeft: 5 }}
                        >
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
                                    onOpenChange={handleOpenChange}
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



        <Modal title="Đăng nhập tài khoản của bạn"
            open={isModalConfirmLogin} onOk={() => {
                setRouter({
                    module: 'auth',
                    controller: 'login',
                })
            }}
            onCancel={() => {setIsModalConfirmLogin(false)}}
            cancelText={`Đóng`}
            okText={`Đăng nhập ngay`}
        >
            <Space
                direction="vertical"
                size="middle"
                style={{
                display: 'flex',
                }}
            >
                <Text>Đăng nhập để bắt đầu mua sắm những món hàng yêu thích</Text>
                <Text>
                    Nếu chưa có tài khoản? Đăng ký tài khoản
                    <Button
                        type="link"
                        onClick={() => ( window.location.replace(`${baseURL}/${adminPrefix}/auth/register`))}
                        style={{padding: 2}}
                    >
                    tại đây
                </Button>
            </Text>
            </Space>
        </Modal>
    </>)
}

export default ProductDetailPage;
