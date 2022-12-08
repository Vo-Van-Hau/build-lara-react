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
    const { customer_address } = customer;

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

    const [value, setValue] = useState(1);
    const defaultDeliveryTo = getDefaultDeliveryTo(customer_address);

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
                                    <div className='product_price'>{ item.product.price_format } đ</div>
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
                <Card className='client_info' title="Giao tới" extra={<a href="#" onClick={() => setRouter({module: 'customer', controller: 'address', action: '#', id: '#',})}>Thay đổi</a>}>
                    <Title level={5}>{ defaultDeliveryTo && defaultDeliveryTo.customer_name ? defaultDeliveryTo.customer_name : 'Undefined'}</Title>
                    <span className='phone_number'>{ defaultDeliveryTo && defaultDeliveryTo.phone ? defaultDeliveryTo.phone : 'Undefined'}</span>
                    <span> <Divider type="vertical" /></span>
                    <span className='address'>
                        {
                            (defaultDeliveryTo && defaultDeliveryTo.address && defaultDeliveryTo.ward && defaultDeliveryTo.district && defaultDeliveryTo.province)
                            ? `${defaultDeliveryTo.address || ''}, ${defaultDeliveryTo.ward.name || ''},
                            ${defaultDeliveryTo.district.type || ''} ${defaultDeliveryTo.district.name || ''},
                            ${defaultDeliveryTo.province.type || ''} ${defaultDeliveryTo.province.name || ''}` : ''
                        }
                    </span>
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
                                            <Col span={16}><p className='product_title'>{product.name || ''}</p></Col>
                                            <Col span={3} offset={1}><b className='product_price'>{product.price_format}đ</b></Col>
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
    const { cart_detail, total_amount_format } = cart;
    let discount = 0;

    return (<>
        <div className='prices_item'>
            <p className='prices_text'>Tạm tính</p>
            <p className='prices_value'>{ total_amount_format || 0 }đ</p>
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
            <p className='prices_value total_price'>{ total_amount_format || 0}đ</p>
        </div>
    </>)
}



export default PaymentPage;
