import { useContext, useEffect } from 'react';
import { CartContext } from '../Contexts/CartContextProvider';
import Helper from '../Helper/Helper';
import { Button, Card, Col, Divider, Popconfirm, Row, Typography, Image, Table } from 'antd';
import { DeleteOutlined, ShopOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CartPage = (props) => {

    const { data, get_cart, setRouter, remove_item, set_table_loading }  = useContext(CartContext);
    const { cart, loading_table } = data;

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: remove product in cart
     * @param {number} id
     * @return {void}
     */
    const remove_product = (cart_id, product_id) => {
        return remove_item(cart_id, product_id)
        .then((res) => {
            let { status, message } = res.data;
            if(status) {
                get_cart();
                Helper.Notification('success', '[Remove Item]', message);
            } else {
                Helper.Notification('error', '[Remove Item]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    useEffect(() => {
        get_cart();
    }, []);

    return (
        <Row className="cart_page_container" gutter={[16, 16]}>
            <Col className="title" span={24}>
                <Title level={2} style={{marginTop:'10px'}}>GIỎ HÀNG</Title>
            </Col>
            <Col className="left_Container" span={18}>
                <CartTable
                    cart={cart}
                    setRouter={setRouter}
                    loading_table={loading_table}
                    remove_product={remove_product}
                />
            </Col>
            <Col className="right_Container" span={6}>
                <Checkout
                     cart={cart}
                     setRouter={setRouter}
                />
            </Col>
        </Row>
    )
}

const CartTable = (props) => {

    const { cart, setRouter, loading_table, remove_product } = props;
    const { cart_detail } = cart;
    const columns = [
        {
            title: '',
            dataIndex: 'img',
            render: (_, record) => {
                return (
                    <><Image width={78} height={78} src={record.product.image_link} alt={'product-image'} onClick={() => setRouter({
                        module: 'products',
                        controller: 'productdetail',
                        action: 'view',
                        id: record.product.id
                    })}/></>
                )
            },
        },{
            title: 'Tên sản phẩm',
            width: 300,
            render: (_, record) => {
                return (
                    <><a onClick={() => setRouter({
                        module: 'products',
                        controller: 'productdetail',
                        action: 'view',
                        id: record.product.id
                    })}>{ record.product.name ? record.product.name : 'Undefined' }</a></>
                )
            },
        },{
            title: 'Đơn giá',
            align: 'center',
            render: (_, record) => {
                return (
                    <>{ record.product.price ? record.product.price : 'Undefined' }</>
                )
            }
        },{
            title: 'Số lượng',
            align: 'center',
            render: (_, record) => {
                return (
                    <>{ record.product_quantity ? record.product_quantity : 'Undefined' }</>
                )
            }
        },{
            title: 'Thành tiền',
            align: 'center',
            render: (_, record) => {
                return (
                    <>{ record.product_quantity ? (parseInt(record.product_quantity) * record.product.price)  : 'Undefined' }</>
                )
            }
        },{
            title: '',
            dataIndex: 'key',
            render: (_, record) => (
                <Popconfirm title='Bạn có muốn xóa?'  placement='leftTop' onConfirm={() => remove_product(cart.id, record.product.id)}>
                    <DeleteOutlined />
                </Popconfirm>
            ),
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (<>
        <Title level={5} className='shop_name'>
            <ShopOutlined /> Shop Name
        </Title>
        <Table
            rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }}
            rowKey='id'
            columns={columns}
            dataSource={cart_detail}
            loading={loading_table}
        />
    </>)
}

const Checkout = (props) => {

    const { cart, setRouter } = props;
    const { user, cart_detail } = cart;
    const { customer } = user;

    let total_amount = 0;
    let discount = 0;
    cart_detail && cart_detail.forEach(function(item) {
        total_amount += (parseInt(item.product_quantity) * item.product.price)
    });

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: redirect page to payment
     * @param:
     * @return {void}
     */
    const redirect_to_payment = () => {
        return setRouter({
            module: 'checkout',
            controller: 'payment',
            action: 'view',
            id: cart.id
        });
    }

    return (<>
        <Card className='client_info' title="Giao tới" extra={<a href="#">Thay đổi</a>}>
            <Title level={5}>{ customer && customer.fullname ? customer.fullname : 'Undefined'}</Title>
            <span className='phone_number'>{ customer && customer.phone ? customer.phone : 'Undefined'}</span>
            <span> <Divider type="vertical"/></span>
            <span className='phone_number'>Thu Duc, HCM City</span>
        </Card>
        <Card className='checkout_container'>
            <div className='prices_item'>
                <p className='prices_text'>Tạm tính</p>
                <p className='prices_value'>{ total_amount }đ</p>
            </div>
            <div className='prices_item'>
                <p className='prices_text'>Giảm giá</p>
                <p className='prices_value'>{ discount }đ</p>
            </div>
            <Divider />
            <div className='prices_item'>
                <p className='prices_text'>Tổng tiền</p>
                <p className='prices_value'>{ total_amount }đ <br/><span>(Đã bao gồm VAT nếu có)</span></p>
            </div>
        </Card>
        <><Button type='primary' size='large' danger onClick={() => redirect_to_payment()}>Mua Hàng</Button></>
    </>)
}

export default CartPage;
