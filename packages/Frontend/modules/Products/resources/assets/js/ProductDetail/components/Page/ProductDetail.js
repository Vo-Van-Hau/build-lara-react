import { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Col, Image, Rate, Row, Space, Descriptions, Badge, Input, notification } from 'antd';
import { HomeOutlined, StarOutlined, ShopOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Breadcrumb, Typography } from 'antd';
import Meta from "antd/lib/card/Meta";
import { ProductDetailContext } from '../Contexts/ProductsDetailContext';

const { Text } = Typography;

const ProductDetailPage = (props) => {
    return <>
        <BreadCrumb />
        <ProductItem id={props.id} />
    </>
}

const BreadCrumb = () => {
    return <>
        <Breadcrumb style={{ padding: '12px' }}>
            <Breadcrumb.Item style={{ cursor: 'pointer' }} >
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ cursor: 'pointer' }}>
                <span>Product</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Product Name</Breadcrumb.Item>
        </Breadcrumb>
    </>
}

const ProductItem = (props) => {
    const {data, get_product_item } = useContext(ProductDetailContext);
    
    useEffect(() => {
        get_product_item({id: props.id});
    }, [props.id]);

    return <>
        <Row className='product_item_container' justify='space-between'>
            <Col span={8} className='product_image_container'>
                <Image preview={false}
                    style={{ objectFit: 'contain', borderRadius: '3px' }}
                    src={'https://salt.tikicdn.com/cache/w750/ts/banner/1f/48/85/1e0d26bf9e0f148402ef6e56ad374941.png.webp'}
                />
            </Col>
            <Col className='separate'></Col>
            <Col span={15} className='product_info_container'>
                <Row className='head'>
                    <h4>Category:  </h4>
                    <Badge.Ribbon text="New">
                        <h1 className='product_title'>{data.product_item.name}</h1>
                    </Badge.Ribbon>

                    <div className="rating">
                        <Rate disabled defaultValue={4} style={{ fontSize: 20, marginRight: 10 }} />
                        <span style={{ color: 'rgb(128, 128, 137)', borderLeft: '1px solid grey' }}>  {data.product_item.name} </span>
                    </div>

                </Row>

                <Row className='body' >
                    <Col className='product_add' span={16}>
                        <ProductInfo />
                    </Col>
                    <Col className='shop_info' span={8}>
                        <ShopInfo />
                    </Col>
                </Row>
            </Col>
        </Row>

        <ProductDescription />
    </>
}
const ProductInfo = () => {
    let [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }
    const handleDecrease = () => {
        ((quantity === 0 || quantity < 0) ? quantity = 0 : setQuantity(quantity - 1))
    }

    const handleAddToCart = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
        const key = `open${Date.now()}`;
        const btn = (
            <Button className='viewCartBtn' type="primary" onClick={() => notification.close(key)} block>
                View cart and checkout
            </Button>
        );
        notification.success({
            message: 'Add to cart successfully!',
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
    }

    return <>
        <span className='product_price__current-price'>65.000 đ</span>
        <span className='product_price__list-price'>65.000 đ</span>
        <span className='product_price__discount-rate'>-32%</span>
        <div className='product_quantity'>
            <Button.Group>
                <Button icon={<MinusOutlined />} type="ghost" onClick={() => handleDecrease()} />
                <Input value={quantity} style={{ width: '60px', textAlign: 'center' }} />
                <Button icon={<PlusOutlined />} type="ghost" onClick={() => handleIncrease()} />
            </Button.Group>
        </div>
        <div className='add_to_cart'>
            <Button type='danger' onClick={handleAddToCart} size='large' className='add_to_cart_btn' block >Add To Cart</Button>
        </div>
    </>
}
const ProductDescription = () => {
    return <Descriptions
        className='product_description_container'
        bordered
        title="Product Description"
        size={'middle'}
    >
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Company">VNG</Descriptions.Item>
        <Descriptions.Item label="Price">18.000 VND</Descriptions.Item>
        <Descriptions.Item label="Out of Date">22/10/2022</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1<br />
        </Descriptions.Item>
    </Descriptions>
}
const ShopInfo = () => {
    return <>
        <Row gutter={[16, 16]}>
            <Col >
                <Avatar size={48} src='https://vcdn.tikicdn.com/cache/w100/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png.webp' />
            </Col>
            <Col span={12}>
                <a>Shop Name</a>
            </Col>
            <Col span={12} className='shop_rating' >
                <div>4.5 / 5  <StarOutlined /></div>
                <div></div>
            </Col>
            <Col span={12} className='shop_follow'>
                <div>250k+</div>
                <div>Follow</div>

            </Col>

            <Space size={[10]} wrap className='btn-group'>
                <Button icon={<ShopOutlined />} size='large'>
                    Visit Shop
                </Button>
                <Button icon={<PlusOutlined />} size='large' >
                    Follow
                </Button>
            </Space>

        </Row>
    </>
}

// const RelatedProduct = () => {
//     const productArr = [
//         { img: '', title: 'Europe Street beat', price: 120000, rating: 4, soldquantity: 11 },
//         { img: '', title: 'Europe Street beat 2', price: 120000, rating: 3, soldquantity: 11 },
//         { img: '', title: 'Europe Street beat 3', price: 120000, rating: 5, soldquantity: 11 },
//         { img: '', title: 'Europe Street beat 4', price: 120000, rating: 4, soldquantity: 11 },
//         { img: '', title: 'Europe Street beat 5', price: 120000, rating: 2, soldquantity: 11 },
//         { img: '', title: 'Europe Street beat 6', price: 120000, rating: 4, soldquantity: 11 },
//         { img: '', title: 'Europe Street beat 7', price: 120000, rating: 3, soldquantity: 11 },

//     ]
//     return <>
//         <Row className='related_product_container'>
//             <Col span={24} >
//                 <h3 className='section_title'> Related Product </h3>
//                 <Slider className='related_product_slider' slidesToShow={5}  >
//                     {productArr.map((item, index) => (
//                         <Card className="productItem"
//                             key={index}
//                             hoverable
//                             cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"  />}
//                         >
//                             <Meta title={item.title} />
//                             <div className="rating">
//                                 <Rate disabled defaultValue={item.rating} style={{ fontSize: 12 }} />
//                                 <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 100++</small>
//                             </div>

//                             <Text strong className="price" type="danger">120.000 đ</Text>

//                         </Card>
//                     ),
//                     )}
//                 </Slider>

//             </Col>
//         </Row>
//     </>
// }

export default ProductDetailPage;
