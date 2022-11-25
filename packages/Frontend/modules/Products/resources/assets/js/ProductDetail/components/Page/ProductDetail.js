import React, { useContext, useEffect, useState } from 'react';
import {
    Avatar, Button, Col, Image, Rate, Row, Space, Card, Carousel,List,
    Descriptions, Badge, Input, notification, Breadcrumb, Typography, Slider, Tooltip
} from 'antd';
import {
    HomeOutlined, StarOutlined, ShopOutlined, PlusOutlined,MoreOutlined,LikeOutlined,
    MinusOutlined, StarFilled, LeftOutlined, RightOutlined, HeartOutlined, ShoppingCartOutlined, ShareAltOutlined
} from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { ProductDetailContext } from '../Contexts/ProductsDetailContext';
import Helper from '../Helper/Helper';

const { Text } = Typography;

const ProductDetailPage = (props) => {

    const { data, get_product_item, add_to_cart, setRouter } = useContext(ProductDetailContext);
    const { product_item } = data;
    const { seller } = product_item;
    const { store } = seller;
    const [quantity, setQuantity] = useState(1);
    const [selectedImg, setSelectedImg] = useState(false);
    const [ratingReview, setRatingReview] = useState(5)
    const [listRating, setListRating] = useState([]);

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
        window.scrollTo({ top: 0, behavior: "smooth" });
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
    }

    /** */
    const RelatedProduct = () => {
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
            <Row className='related_product_container'>
                <Col span={24} >
                    <h3 className='section_title'> Sản phẩm liên quan </h3>
                    <Carousel
                        autoplay
                        arrows={true}
                        prevArrow={<LeftOutlined />}
                        nextArrow={<RightOutlined />}
                        slidesToShow={5}
                        swipeToSlide draggable
                    >
                        {productArr.map((item, index) => {
                            return (
                                <Card className="productItem"
                                    key={index}
                                    hoverable
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >
                                    <Meta title={item.title} />
                                    <div className="rating">
                                        <Rate disabled defaultValue={item.rating} style={{ fontSize: 12 }} />
                                        <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 100++</small>
                                    </div>

                                    <Text strong className="price" type="danger">120.000 đ</Text>
                                    <Space size={[0]} direction="vertical" className="productItem-btn-group">
                                        <Tooltip placement="rightTop" title={'Thêm vào Yêu thích'}>
                                            <Button icon={<HeartOutlined />} href="#" />
                                        </Tooltip>
                                        <Tooltip placement="right" title={'Thêm vào giỏ hàng'}>
                                            <Button icon={<ShoppingCartOutlined />} href="#" />
                                        </Tooltip>
                                        <Tooltip placement="right" title={'Chia sẻ'}>
                                            <Button icon={<ShareAltOutlined />} href="#" />
                                        </Tooltip>
                                    </Space>
                                </Card>
                            )
                        })}
                    </Carousel>
                </Col>
            </Row>
        </>
    }
    const product_image_gallery = [
        { url: 'https://salt.tikicdn.com/cache/100x100/ts/product/54/ff/25/bfdf0febe11a28eaa7cd3fa735a82c49.png.webp' },
        { url: 'https://salt.tikicdn.com/cache/750x750/ts/product/dd/e6/fc/68b7246e01393350da3506e6ccb2c3e9.jpg.webp' },
        { url: 'https://salt.tikicdn.com/cache/750x750/ts/product/03/0a/50/6af71ef33fca65a90e4b04dc04ef3ad3.jpg.webp' },
        { url: 'https://salt.tikicdn.com/cache/w1200/ts/product/a4/56/3a/3a04f82e48ffa3bc1ae3d6e77039b104.jpg' },
        { url: 'https://salt.tikicdn.com/cache/100x100/ts/product/54/ff/25/bfdf0febe11a28eaa7cd3fa735a82c49.png.webp' }
    ]

   

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

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    useEffect(() => {
        get_product_item({ id: props.id });
        setListRating(listDummy);
    }, [props.id]);

    return (<>
        <><Breadcrumb style={{ padding: '12px' }}>
            <Breadcrumb.Item style={{ cursor: 'pointer' }} >
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ cursor: 'pointer' }}>
                <span>Sản phẩm</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{product_item.name}</Breadcrumb.Item>
        </Breadcrumb></>
        <Row className='product_item_container' justify='space-between'>
            <Col span={8} className='product_image_container'>
                <Image preview={false}
                    style={{ objectFit: 'contain', borderRadius: '3px' }}
                    src={selectedImg ? selectedImg : product_item.image_link}
                />
                <Space>
                    {
                        product_image_gallery.map((data, index) => {
                            return (
                                <img style={{ width: 50 }} className="galery-img-item" key={index} src={data.url} alt="images" onClick={() => setSelectedImg(data.url)} />
                            )
                        })
                    }
                </Space>
            </Col>
            <Col className='separate'></Col>
            <Col span={15} className='product_info_container'>
                <Row className='head' >
                    <Col span={24}><h4>Loại sản phẩm: {product_item.category ? product_item.category.title : ``} </h4></Col>
                    <Col span={24}><h1 className='product_title'>{product_item.name}</h1></Col>
                    <Col className='rating' span={24}>
                        <Rate disabled defaultValue={4} style={{ fontSize: 20, marginRight: 10 }} />
                        <span style={{ color: 'rgb(128, 128, 137)', borderLeft: '1px solid grey' }}>{product_item.name}</span>
                    </Col>
                </Row>
                <Row className='body' >
                    <Col className='product_add' span={15}>
                        <span className='product_price__current-price'>{product_item.price}</span>
                        <span className='product_price__list-price'>{product_item.price}</span>
                        <span className='product_price__discount-rate'>-32%</span>
                        <div className='product_quantity'>
                            <>
                                <div>
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
                                })}>{store.name ? store.name : 'Undefined'}</Button></>
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
                    <Descriptions.Item span={24} labelStyle={{ width: '25%', fontWeight: 'bold' }} label="Thương hiệu">Glucosamin</Descriptions.Item>
                    <Descriptions.Item span={24} labelStyle={{ width: '25%', fontWeight: 'bold' }} label="Xuất xứ">Việt Nam</Descriptions.Item>
                    <Descriptions.Item span={24} labelStyle={{ width: '25%', fontWeight: 'bold' }} label="Hạn sử dụng">-</Descriptions.Item>
                    <Descriptions.Item span={24} labelStyle={{ width: '25%', fontWeight: 'bold' }} label="Mô tả ngắn">Trong chiết xuất cây Móng Quỷ, có chứa Harpagoside - hoạt chất có tính ứng dụng cao trong y học, giúp giảm đau, giúp giảm viêm nhờ ức chế hoạt động của enzyms phá huỷ sụn khớp hiệu quả. Ngoài ra, Harpagoside còn giúp bảo vệ, tái tạo sụn khớp nhờ đảm bảo quá trình tổng hợp Collagen của sụn...</Descriptions.Item>
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
        <RelatedProduct />

        <Row className='product_review'>
           <Col span={24}>
           <Card >
                <Row align='middle'>
                    <Col span={4}>
                        <Row justify='center' align='middle' className='rating-num'> {ratingReview} <Rate style={{}} value={1} count={1} />/<span>5.0</span> </Row>
                        <Row justify='center'> <Rate className='rating-review' disabled value={ratingReview} /> </Row>

                    </Col>
                    <Col span={20} >
                        <Space justify='center'>
                            <Button onClick={() => handleChangebtnRating('all')}>Tất cả</Button>
                            <Button onClick={() => handleChangebtnRating(5)}>5 Sao</Button>
                            <Button onClick={() => handleChangebtnRating(4)}>4 Sao</Button>
                            <Button onClick={() => handleChangebtnRating(3)}>3 Sao</Button>
                            <Button onClick={() => handleChangebtnRating(2)}>2 Sao</Button>
                            <Button onClick={() => handleChangebtnRating(1)}>1 Sao</Button>
                        </Space>
                    </Col>
                </Row>
            </Card>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={listRating}
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                renderItem={(item) => (
                    <div className='review-block-item'>
                        <List.Item
                            actions={[
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <a key="list-loadmore-more"><MoreOutlined /></a>,
                            ]} >
                            <List.Item.Meta
                                avatar={<Avatar src={item.picture} size={45} />}
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={<>
                                    <small>{item.date} | Phân loại hàng: {item.type}</small> <br />
                                    <Rate className='rating-review' style={{ fontSize: 10 }} disabled value={item.rating} />
                                </>}
                            />
                        </List.Item>
                        <List.Item className='content-review'>
                            <Row>
                                <Col span={24}>
                                    {item.comment ? item.comment : ''}
                                </Col>
                                <Col span={24}>
                                    <Space className='img-review-wrapper'>
                                        <Image className='img-review' width={100} src="https://salt.tikicdn.com/cache/w280/ts/review/2e/0a/41/d213b6b126c6a8637e412ee2cedbb5ce.jpg" />
                                        <Image className='img-review' width={100} src="https://salt.tikicdn.com/cache/w280/ts/review/24/58/5d/4783e16696305909fb66ac0f9a65048a.jpg" />
                                    </Space>
                                </Col>
                            </Row>
                        </List.Item>
                    </div>
                )}
            />
           </Col>
        </Row>
    </>)
}



export default ProductDetailPage;
