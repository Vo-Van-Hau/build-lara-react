
import { Button, Card, Col, Divider, Popconfirm, Row, Typography } from "antd"
import { Table } from 'antd';
import { DeleteOutlined,ShopOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CartPage = () => {
    return (
        <Row className="cart_page_container" gutter={[16, 16]}>
            <Col className="title" span={24}>
                <Title level={2}  style={{marginTop:'10px'}}>Cart</Title>
            </Col>
            <Col className="left_Container" span={18}>
                <CartTable />
            </Col>
            <Col className="right_Container" span={6}>
                <Checkout />
            </Col>
        </Row>
    )
}

const CartTable = () => {
    const columns = [
        {
            title: '',
            dataIndex: 'img',
            render: (item) => <img src={item} alt='cart-item-img' />,
        },
        {
            title: 'Product',
            dataIndex: 'title',
            width: 300,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Unit Price',
            align: 'center',
            dataIndex: 'unitPrice',
        },
        {
            title: 'Quantity',
            align: 'center',
            dataIndex: 'quantity',
        },
        {
            title: 'Into Money',
            align: 'center',
            dataIndex: 'quantity',
        },
        {
            title: '',
            dataIndex: 'key',
            render: (key) => (
                <Popconfirm title="Sure to delete?" >
                    <DeleteOutlined />
                </Popconfirm>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            img: 'https://salt.tikicdn.com/cache/w78/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
            title: 'We Will Be Happy, In Different Ways [Bonus: 01 Bookmark]',
            unitPrice: 32000,
            quantity: 1,
        },
        {
            key: '2',
            img: 'https://salt.tikicdn.com/cache/w78/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
            title: 'We Will Be Happy, In Different Ways [Bonus: 01 Bookmark]',
            unitPrice: 32000,
            quantity: 1,
        },
        {
            key: '3',
            img: 'https://salt.tikicdn.com/cache/w78/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
            title: 'We Will Be Happy, In Different Ways [Bonus: 01 Bookmark]',
            unitPrice: 32000,
            quantity: 1,
        },
        {
            key: '4',
            img: 'https://salt.tikicdn.com/cache/w78/ts/product/37/7f/04/0e29466f6e96224b9a9980bb8643bdc4.jpg.webp',
            title: 'We Will Be Happy, In Different Ways [Bonus: 01 Bookmark]',
            unitPrice: 32000,
            quantity: 1,
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
            columns={columns}
            dataSource={data}
        />
    </>
    )
}

const Checkout = () => {
    return (<>
        <Card className='client_info' title="Delivered to" extra={<a href="#">Change</a>}>
            <Title level={5}>Mai Nguyen</Title>
            <span className='phone_number'>0123456789</span>
            <span> <Divider type="vertical" /></span>
            <span className='phone_number'>Thu Duc, HCM City</span>
        </Card>

        <Card className='checkout_container'>
            <div className='prices_item'>
                <p className='prices_text'>Provisional</p>
                <p className='prices_value'>0d</p>
            </div>
            <div className='prices_item'>
                <p className='prices_text'>Discount</p>
                <p className='prices_value'>0d</p>
            </div>
            <Divider />
            <div className='prices_item'>
                <p className='prices_text'>Total amount</p>
                <p className='prices_value'>0d</p>
            </div>
        </Card>
        <Button type='danger' size='large' block>Purchase</Button>
    </>
    )
}



export default CartPage;
