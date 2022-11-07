import { useContext, useEffect, useState } from 'react';
import {
    Avatar, Button, Col, Image, Rate, Row, Space, Card,
    Descriptions, Badge, Input, notification, Breadcrumb, Typography, Slider
} from 'antd';
import { HomeOutlined, StarOutlined, ShopOutlined, PlusOutlined, MinusOutlined, StarFilled } from '@ant-design/icons';
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
                id: seller.id  ? seller.id : '#'
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

    useEffect(() => {
        get_product_item({ id: props.id });
    }, [props.id]);

    return (<>
        <><Breadcrumb style={{ padding: '12px' }}>
                <Breadcrumb.Item style={{ cursor: 'pointer' }} >
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item style={{ cursor: 'pointer' }}>
                    <span>Sản phẩm</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{ product_item.name }</Breadcrumb.Item>
        </Breadcrumb></>
        <Row className='product_item_container' justify='space-between'>
            <Col span={8} className='product_image_container'>
                <Image preview={false}
                    style={{ objectFit: 'contain', borderRadius: '3px' }}
                    src={product_item.image_link}
                />
            </Col>
            <Col className='separate'></Col>
            <Col span={15} className='product_info_container'>
                <Row className='head' >
                    <Col span={24}><h4>Loại sản phẩm: {product_item.category ? product_item.category.title : ``} </h4></Col>
                    <Col span={24}><h1 className='product_title'>{product_item.name}</h1></Col>
                    <Col className='rating' span={24}>
                        <Rate disabled defaultValue={4} style={{ fontSize: 20, marginRight: 10 }} />
                        <span style={{ color: 'rgb(128, 128, 137)', borderLeft: '1px solid grey' }}>{ product_item.name }</span>
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
                                <Avatar size={48} src={ store.brand_logo ? store.brand_logo : '' } />
                            </Col>
                            <Col span={12}>
                                <><Button type='link' onClick={() => setRouter({
                                    module: 'shop',
                                    controller: 'shop',
                                    action: 'view',
                                    id: seller.id  ? seller.id : '#'
                                })}>{ store.name ? store.name : 'Undefined'}</Button></>
                            </Col>
                            <Col span={12} className='shop_rating'>
                                <div>4.5 / 5  <StarFilled /></div>
                                <div></div>
                            </Col>
                            <Col span={12} className='shop_follow'>
                                <div>250k+ Theo dõi</div>
                            </Col>

                            <Space wrap className='btn-group' style={{justifyContent: 'center'}}>
                                <Button icon={<ShopOutlined />} size='middle' onClick={() => setRouter({
                                    module: 'shop',
                                    controller: 'shop',
                                    action: 'view',
                                    id: seller.id  ? seller.id : '#'
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
        <Row dangerouslySetInnerHTML={{ __html: product_item.description }} />
        <RelatedProduct />
    </>)
}

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
                <h3 className='section_title'> Related Product </h3>
                <Slider className='related_product_slider' slidesToShow={5}  >
                    {productArr.map((item, index) => {
                        return (
                            <Card className="productItem"
                                key={index}
                                hoverable
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"  />}
                            >
                                <Meta title={item.title} />
                                <div className="rating">
                                    <Rate disabled defaultValue={item.rating} style={{ fontSize: 12 }} />
                                    <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 100++</small>
                                </div>

                                <Text strong className="price" type="danger">120.000 đ</Text>

                            </Card>
                        )
                    })}
                </Slider>

            </Col>
        </Row>
    </>
}

export default ProductDetailPage;
