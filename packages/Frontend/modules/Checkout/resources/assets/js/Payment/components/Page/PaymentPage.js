import { Fragment, useState, useContext, useEffect } from 'react';
import { PaymentContext } from '../Contexts/PaymentContext';
import {
    Avatar, Button, Card, Col, Collapse, Divider, List, Radio, Row, Space, Typography,
    Image
} from 'antd';
import {
    CalendarFilled, WalletOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography;
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
            <Col className="title" span={24}>
                <Title level={4} style={{fontWeight: 400}}><WalletOutlined /> Thanh toán đơn hàng</Title>
            </Col>
            <Col span={18} className='leftSide' style={{paddingRight: 8,}}>
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
                                        avatar={ <Image width={78} height={78} src={item.product.image_link} /> }
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
                                            <img src={item.icon_link} width={32} alt='payment-ico' />
                                            <Text style={{marginLeft: 8}}>{ item.name }</Text>
                                        </Radio>
                                    </Fragment>
                                )
                            })}
                        </Space>
                    </Radio.Group>
                </section>
            </Col>
            <Col span={6} className='rightSide' style={{paddingLeft: 8,}}>
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
                <Card
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
                        <Panel header="Chi tiết đơn hàng" style={{ color: '#000000', padding: 0 }} key="1">
                            {cart_detail.map((item, index) => {
                                const { product } = item;
                                return <Fragment key={ product.id }>
                                    <div className='product_info'>
                                        <Row className='product_info'>
                                            <Col span={4}><span className='product_amount'> x {item.product_quantity} | </span> </Col>
                                            <Col span={16}><Text>{product.name || ''}</Text></Col>
                                            <Col span={3} offset={1}><Text strong>{product.price_format}đ</Text></Col>
                                        </Row>
                                    </div>
                                </Fragment>
                            })}
                        </Panel>
                    </Collapse>
                    <Divider style={{marginBottom: 12, marginTop: 12}}/>
                    <>
                        <Checkout cart={cart}/>
                    </>
                </Card>
                <Button type='primary' size='large' danger onClick={() => get_order()}>ĐẶT HÀNG</Button>
            </Col>
        </Row>
    </>)
}

/**
 * @author: <hauvo1709@gmail.com>
 * @todo
 * @param {Object} props
 * @return
 */
const Checkout = (props) => {

    const { cart } = props;
    const { cart_detail, total_amount_format } = cart;
    let discount = 0;

    return (<>
        <Row>
            <Col span={12}>
                <Text style={{float: 'left',}}>Tạm tính</Text>
            </Col>
            <Col span={12}>
                <Text strong style={{float: 'right',}}>{ total_amount_format || '' }đ</Text>
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <Text style={{float: 'left',}}>Giảm giá</Text>
            </Col>
            <Col span={12}>
                <Text strong style={{float: 'right',}}>{ discount}đ</Text>
            </Col>
        </Row>
        <Divider style={{marginBottom: 12, marginTop: 12}}/>
        <div>
            <Row>
                <Col span={12}>
                    <Text style={{float: 'left', fontSize: 16}}>Tổng tiền</Text>
                </Col>
                <Col span={12}>
                    <Text strong type="danger" style={{float: 'right', fontSize: 18, fontWeight: 500}}>{ total_amount_format || '' }đ</Text>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Text style={{float: 'right', fontSize: 12}}>(Đã bao gồm VAT nếu có)</Text>
                </Col>
            </Row>
        </div>
    </>)
}



export default PaymentPage;
