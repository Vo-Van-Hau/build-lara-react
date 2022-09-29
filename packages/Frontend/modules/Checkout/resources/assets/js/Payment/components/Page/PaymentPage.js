import { Fragment, useState, useContext, useEffect } from 'react';
import { PaymentContext } from '../Contexts/PaymentContext';
import { Avatar, Button, Card, Col, Collapse, Divider, List, Radio, Row, Space, Typography } from 'antd';
import { CalendarFilled } from '@ant-design/icons'
const { Title } = Typography;
const { Panel } = Collapse;

const PaymentPage = (props) => {

    const { data, get_cart, setRouter, get_payment_methods, storage_order }  = useContext(PaymentContext);
    const { cart, loading_table, payment_methods } = data;
    const { cart_detail, user } = cart;
    const { customer } = user;

    const list = [
        {
            title: 'We Will Be Happy, In Different Ways',
            img: 'https://salt.tikicdn.com/cache/96x96/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
            quantity: '3',
            price: 20000,
        },
        {
            title: 'We Will Be Happy, In Different Ways',
            img: 'https://salt.tikicdn.com/cache/96x96/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
            quantity: '3',
            price: 20000,
        },
        {
            title: 'We Will Be Happy, In Different Ways',
            img: 'https://salt.tikicdn.com/cache/96x96/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
            quantity: '3',
            price: 20000,
        },
        {
            title: 'We Will Be Happy, In Different Ways',
            img: 'https://salt.tikicdn.com/cache/96x96/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
            quantity: '3',
            price: 20000,
        },
    ];
    const [value, setValue] = useState(1);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo: get order from cart
     * @param
     * @return {void}
     */
    const get_order = () => {
        return storage_order();
    }

    useEffect(function() {
        get_cart();
        get_payment_methods();
    }, []);

    return (<>
        <Row className='checkout_container'>
            <Col span={17} className='leftSide'>
                <section className='section_container'>
                    <Title level={4}>Chọn hình thức giao hàng</Title>
                    <fieldset>
                        <legend className='store_name'><CalendarFilled /> Package 1:Delivered on Wednesday, September 28</legend>
                        <List
                            itemLayout="horizontal"
                            dataSource={cart_detail}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={ <Avatar src={item.product.image_link} /> }
                                        title={ item.product.name }
                                        description={ <>{'Số lượng: x'}{item.product_quantity}</>}
                                    />
                                    <div className='product_price'>{ item.product.price } đ</div>
                                </List.Item>
                            )} />
                    </fieldset>
                </section>
                <section className='section_container'>
                    <Title level={4}>Chọn hình thức thanh toán</Title>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical" size="large">
                            {payment_methods.map((item) => {
                                return (
                                    <Fragment key={item.id}>
                                        <Radio value={item.id}>
                                            <img src='https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg' width={32} alt='payment-ico' />
                                            { item.name }
                                        </Radio>
                                    </Fragment>
                                )
                            })}
                        </Space>
                    </Radio.Group>
                </section>
            </Col>
            <Col span={6} offset={1} className='rightSide'>
                <Card className='client_info' title="Delivered to" extra={<a href="#">Change</a>}>
                    <Title level={5}>{ customer && customer.fullname ? customer.fullname : 'Undefined'}</Title>
                    <span className='phone_number'>{ customer && customer.phone ? customer.phone : 'Undefined'}</span>
                    <span> <Divider type="vertical" /></span>
                    <span className='phone_number'>Thu Duc, HCM City</span>
                </Card>

                <Card className='checkout_container'
                    title={<>Đơn hàng</>}
                    extra={<><Button type='link' onClick={() => setRouter({
                        module: 'checkout',
                        controller: 'cart'
                    })}>Thay đổi</Button></>}
                >
                    <Collapse
                        className='products_collapse_header'
                        showArrow={false}
                        defaultActiveKey={['1']}
                        ghost
                    >
                        <Panel header="Chi tiết đơn hàng" style={{ color: 'red' }} key="1">
                            {cart_detail.map((item, index) => {
                                const { product } = item;
                                return <Fragment key={ product.id }>
                                    <div className='product_info'>
                                        <Row className='product_info'>
                                            <Col span={4}><span className='product_amount'> x {item.product_quantity} | </span> </Col>
                                            <Col span={16}><p className='product_title'>{product.name}</p></Col>
                                            <Col span={3} offset={1}><b className='product_price'>{product.price}đ</b></Col>
                                        </Row>
                                    </div>
                                </Fragment>
                            })}
                        </Panel>
                    </Collapse>
                    <Divider />
                    <>
                        <Checkout
                            cart={cart}
                        />
                    </>
                </Card>
                <Button type='primary' size='large' danger onClick={() => get_order()}>ĐẶT HÀNG</Button>
            </Col>
        </Row>
    </>)
}

const Checkout = (props) => {

    const { cart } = props;
    const { cart_detail } = cart;

    let total_amount = 0;
    let discount = 0;
    cart_detail && cart_detail.forEach(function(item) {
        total_amount += (parseInt(item.product_quantity) * item.product.price)
    });

    return (<>
        <div className='prices_item'>
            <p className='prices_text'>Tạm tính</p>
            <p className='prices_value'>{ total_amount }đ</p>
        </div>
        <div className='prices_item'>
            <p className='prices_text'>Phí vận chuyển</p>
            <p className='prices_value'>0 đ</p>
        </div>
        <div className='prices_item'>
            <p className='prices_text'>Giảm giá</p>
            <p className='prices_value'>{ discount }đ</p>
        </div>
        <Divider />
        <div className='prices_item'>
            <p className='prices_text'>Tổng tiền <br/><span>(Đã bao gồm VAT nếu có)</span></p>
            <p className='prices_value total_price'>{ total_amount }đ</p>
        </div>
    </>)
}


export default PaymentPage;
