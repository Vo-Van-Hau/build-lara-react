import { useContext, useEffect } from 'react';
import { CartContext } from '../Contexts/CartContextProvider';
import Helper from '../Helper/Helper';
import { GET_CART } from '../Dispatch/type';
import {
    Button, Card, Col, Divider, Popconfirm, Row, Typography, Image, Table, Space, Input
} from 'antd';
import {
    DeleteOutlined, ShopOutlined, TagsOutlined, GlobalOutlined, BarcodeOutlined, ShoppingCartOutlined,
    PlusOutlined, MinusOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const CartPage = (props) => {

    const {
        data, get_cart, setRouter, remove_item, set_table_loading, update_quantity_item,
        dispatch,
    } = useContext(CartContext);
    const { cart, loading_table } = data;

    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param {number} type
     * @param {number} quantity
     * @param {number} cart_id
     * @param {number} product_id
     * @return {void}
     */
    const updateProductQuantity = (type, quantity, cart_id, product_id) => {
        if(quantity <= 1 && type === 0) return false;
        return update_quantity_item({type, quantity, cart_id, product_id})
        .then((res) => {
            let { status, message } = res.data;
            if(status) {
                let { cart } = res.data.data;
                let newCart = cart;
                return dispatch({type: GET_CART, payload: newCart});
            } else {
                Helper.Notification('error', '[Update Item]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

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
        <Row className="cart_page_container" gutter={[8, 8]} style={{paddingTop: 16}}>
            <Col className="title" span={24}>
                <Title level={4} style={{fontWeight: 400}}><ShoppingCartOutlined /> Giỏ hàng của bạn</Title>
            </Col>
            <Col className="left_Container" span={18}>
                <CartTable
                    cart={cart}
                    setRouter={setRouter}
                    loading_table={loading_table}
                    remove_product={remove_product}
                    updateProductQuantity={updateProductQuantity}
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

/**
 * @author: <hauvo1709@gmail.com>
 * @todo
 * @param {Object} props
 * @return
 */
const CartTable = (props) => {

    const { cart, setRouter, loading_table, remove_product, updateProductQuantity } = props;
    const { cart_detail } = cart;
    const columns = [
        {
            title: '',
            dataIndex: 'img',
            render: (_, record) => {
                const { seller, product_identifiers, product_description_detail } = record.product;
                const { store } = seller;
                const { brand, sku, gtin, mpn } = product_identifiers;
                const {
                    color, condition, for_adult, material, age_group, multipack, is_bundle, size_type,
                    size, size_system, gender, highlight, width, height, length, weight
                } = product_description_detail;
                return (
                    <><Space align="start">
                        <Image width={78} height={78} src={record.product.image_link} alt={'product-image'} onClick={() => setRouter({
                            module: 'products',
                            controller: 'productdetail',
                            action: 'view',
                            id: record.product.id
                        })}/>
                            <div>
                                <div style={{marginBottom: 4,}}><ShopOutlined /> <span style={{fontWeight: 500}}>Nhà bán:</span> { store && store.name ? store.name : `` }</div>
                                <div style={{marginBottom: 4,}}><TagsOutlined /> <span style={{fontWeight: 500}}>Thương hiệu:</span> { brand || `` }</div>
                                <div style={{marginBottom: 4,}}><GlobalOutlined/> <span style={{fontWeight: 500}}>Xuất xứ:</span> Việt Nam</div>
                                <div style={{marginBottom: 4,}}><BarcodeOutlined /> <span style={{fontWeight: 500}}>Mã SKU:</span> { sku || `` }</div>
                            </div>
                    </Space></>
                )
            },
        },{
            title: 'Tên sản phẩm',
            render: (_, record) => {
                return (
                    <><a onClick={() => setRouter({
                        module: 'products',
                        controller: 'productdetail',
                        action: 'view',
                        id: record.product.id
                    })}><Text>{ record.product.name ? record.product.name : '' }</Text></a></>
                )
            },
        },{
            title: 'Đơn giá',
            align: 'center',
            render: (_, record) => {
                return (
                    <>{ record.product.price_format ? record.product.price_format : '' } đ</>
                )
            }
        },{
            title: 'Số lượng',
            align: 'center',
            render: (_, record) => {
                return (
                    <Button.Group>
                        <Button
                            icon={<MinusOutlined />}
                            type="ghost"
                            onClick={() => updateProductQuantity(0, record.product_quantity, cart.id, record.product.id)}
                        />
                        <Input value={ record.product_quantity ? record.product_quantity : '' } style={{ width: '60px', textAlign: 'center' }} />
                        <Button
                            icon={<PlusOutlined />}
                            type="ghost"
                            onClick={() => updateProductQuantity(1, record.product_quantity, cart.id, record.product.id)}
                        />
                    </Button.Group>
                )
            }
        },{
            title: 'Thành tiền',
            align: 'center',
            render: (_, record) => {
                return (
                    <>
                        <Text strong type="danger">{ record.total_amount_item ? record.total_amount_item  : '' } đ</Text>
                    </>
                )
            }
        },{
            title: '',
            dataIndex: 'key',
            render: (_, record) => (
                <Popconfirm
                    title='Bạn có muốn xóa sản phẩm đang chọn?'
                    placement='leftTop'
                    okText={`Xác Nhận`}
                    cancelText={`Huỷ`}
                    onConfirm={() => remove_product(cart.id, record.product.id)}
                >
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

/**
 * @author: <hauvo1709@gmail.com>
 * @todo
 * @param {Object} props
 * @return
 */
const Checkout = (props) => {

    const { cart, setRouter } = props;
    const { user, cart_detail, total_amount_format } = cart;
    const { customer } = user;
    const { customer_address } = customer;
    let discount = 0;

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

    const defaultDeliveryTo = getDefaultDeliveryTo(customer_address);

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
        <Card>
            <Row>
                <Col span={12}>
                    <Text style={{float: 'left',}}>Tạm tính</Text>
                </Col>
                <Col span={12}>
                    <Text strong style={{float: 'right',}}>{ total_amount_format || '' } đ</Text>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Text style={{float: 'left',}}>Giảm giá</Text>
                </Col>
                <Col span={12}>
                    <Text strong style={{float: 'right',}}>{ discount} đ</Text>
                </Col>
            </Row>
            <Divider style={{marginBottom: 12, marginTop: 12}}/>
            <div>
                <Row>
                    <Col span={12}>
                        <Text style={{float: 'left', fontSize: 16}}>Tổng tiền</Text>
                    </Col>
                    <Col span={12}>
                        <Text strong type="danger" style={{float: 'right', fontSize: 18, fontWeight: 500}}>{ total_amount_format || '' } đ</Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Text style={{float: 'right', fontSize: 12}}>(Đã bao gồm VAT nếu có)</Text>
                    </Col>
                </Row>
            </div>
        </Card>
        <><Button type='primary' size='large' danger onClick={() => redirect_to_payment()}>Mua Hàng</Button></>
    </>)
}

export default CartPage;
