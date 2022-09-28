import { Avatar, Button, Card, Col, Collapse, Divider, Input, List, Radio, Row, Space, Typography } from "antd"
import { CalendarFilled } from '@ant-design/icons'
import { Fragment, useState } from 'react';
const { Title } = Typography;
const { Panel } = Collapse;

const PaymentPage = () => {
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
    return (<>
        <Row className='checkout_container'>
            <Col span={17} className='leftSide'>
                <section className='section_container'>
                    <Title level={4}>Choose a delivery method</Title>
                    <fieldset>
                        <legend className='store_name'><CalendarFilled /> Package 1:Delivered on Wednesday, September 28</legend>
                        <List
                            itemLayout="horizontal"
                            dataSource={list}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.img} />}
                                        title={item.title}
                                        description={<>Quantity: x{item.quantity}  </>}
                                    />
                                    <div className='product_price'>{item.price} đ</div>
                                </List.Item>
                            )} />
                    </fieldset>
                </section>
                <section className='section_container'>
                    <Title level={4}>Choose payment method</Title>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical" size="large">
                            <Radio value={1}><img src='https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg' width={32} alt='payment-ico' /> Cash payment on delivery</Radio>
                            <Radio value={2}><img src='https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-viettelmoney.png' width={32} alt='payment-ico' /> Pay with MoMo wallet</Radio>
                            <Radio value={3}><img src='https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg' width={32} alt='payment-ico' /> Pay with ZaloPay wallet</Radio>
                        </Space>
                    </Radio.Group>
                </section>

            </Col>

            <Col span={6} offset={1} className='rightSide'>
                <Card className='client_info' title="Delivered to" extra={<a href="#">Change</a>}>
                    <Title level={5}>Mai Nguyen</Title>
                    <span className='phone_number'>0123456789</span>
                    <span> <Divider type="vertical" /></span>
                    <span className='phone_number'>Thu Duc, HCM City</span>
                </Card>

                <Card className='checkout_container'
                    title={<>Order</>}
                    extra={<><a href="#">Change</a></>}
                >
                    <Collapse
                        className='products_collapse_header'
                        showArrow={false}
                        defaultActiveKey={['1']}
                        ghost>
                        <Panel header="Watch products" style={{ color: 'red' }} key="1">
                            {list.map((productItem, index) => {
                                return <Fragment key={index} className='product_info'>
                                    <Row className='product_info'>
                                        <Col span={4}><span className='product_amount'> x {productItem.quantity} | </span> </Col>
                                        <Col span={16}><p className='product_title'>{productItem.title}</p></Col>
                                        <Col span={3} offset={1}><b className='product_price'>{productItem.price}đ</b></Col>
                                    </Row>
                                </Fragment>
                            })}
                        </Panel>
                    </Collapse>
                    <Divider />

                    <div className='prices_item'>
                        <p className='prices_text'>Provisional</p>
                        <p className='prices_value'>0d</p>
                    </div>
                    <div className='prices_item'>
                        <p className='prices_text'>Transport fee</p>
                        <p className='prices_value'>0d</p>
                    </div>
                    <div className='prices_item'>
                        <p className='prices_text'>Discount</p>
                        <p className='prices_value'>0d</p>
                    </div>
                    <Divider />
                    <div className='prices_item'>
                        <p className='prices_text'>Total amount</p>
                        <p className='prices_value total_price'>0d</p>
                    </div>
                </Card>
                <Button type='danger' size='large' block>Order</Button>
            </Col>
        </Row>
    </>)
}

export default PaymentPage;
