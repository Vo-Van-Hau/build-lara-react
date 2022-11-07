import { useState, useEffect, useContext } from 'react';
import { Pagination, Space, Card, Rate, Affix, Menu, List, Avatar, Col, Divider, Row, Typography, Button, Tabs, Input, Image } from 'antd';
import {
    AntDesignOutlined, UserAddOutlined, StarOutlined, PlusOutlined, SearchOutlined,
    CalendarOutlined, InboxOutlined, ShopOutlined, StarFilled
} from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { ShopContext } from '../Contexts/ShopContext';

const { Title, Text } = Typography;

const ShopPage = (props) => {

    const { keyID } = props;
    const { data, get_products, setRouter, get_shop } = useContext(ShopContext);
    const { products, mouted, shop } = data;
    const { store } = shop;

    const items = [
        { label: 'Cửa Hàng', key: '1', children: <ShopTab data={data} /> }, // remember to pass the key prop
        { label: 'Tất Cả Sản Phẩm', key: '2', children: <AllProductsTab data={data} /> },
        { label: 'Bộ Sưu Tập', key: '3', children: <CollectionTab data={data} /> },
        { label: 'Hồ Sơ Cửa Hàng', key: '4', children: <StoreProfile data={data} /> },
    ];

    useEffect(function() {
        if(mouted) {
            if(keyID) {
                get_products(1, '', keyID);
                get_shop(keyID);
            }
        }
    }, [props]);

    return (<>
        <Row className='shop_page_header' align="middle" gutter={[16, 5]}>
            <Col span={2}>
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    src={store.brand_logo}
                />
            </Col>
            <Col span={10} >
                <Title level={4} style={{ color: '#fff' }}>{ store.name }</Title>
                <img src='https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png' alt='official-ico' width={70} />
                <div style={{ color: '#fff' }}>
                    <StarOutlined /> 4.5/5
                    <Divider type='vertical' />
                    <UserAddOutlined /> Followers : 10.000
                </div>
            </Col>
            <Col span={3} >
                <Button type='primary' icon={<PlusOutlined />} size='default' >
                    Follow
                </Button>
            </Col>
            <Col span={10} offset={12} >
                <Input
                    placeholder="Searching product..."
                    size='default'
                    prefix={<SearchOutlined className="site-form-item-icon" />}
                    style={{ width: '80%' }} />

            </Col>
            <div className='shop_header_background_overlay'></div>
        </Row>
        <Row className='shop_page_main' gutter={[16, 5]}>
            <Col span={24}>
                <Tabs
                    items={items}
                    defaultActiveKey='1'
                />
            </Col>
        </Row>
    </>)
}

/**
 * @author
 * @todo
 * @param {Object} props
 * @return {void}
 */
const ShopTab = (props) => {
    const { data } = props;
    const { products} = data;
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(5);
    const numEachPage = 5  // Use a constant here to keep track of number of cards per page

    const handleChange = value => {
        setMinValue((value - 1) * numEachPage);
        setMaxValue(value * numEachPage);
    };

    return <div className='shop_tab_container'>
        <Row className="productContainer">
            <Space size={[20, 16]} wrap style={{ width: '100%' }} >
                {products.slice(minValue, maxValue).map((item, index) => (
                    <Card className='productItem'
                        key={index}
                        hoverable
                        style={{ width: 200, }}
                        cover={<img alt='Product-Sellers' src={item.image_link} />}
                    >
                        <Meta title={item.name} />
                        <div className='rating'>
                            <Rate defaultValue={item.rating} style={{ fontSize: 12 }} disabled />
                            <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 100++ </small>
                        </div>
                        <Text className="price" type="danger" strong>{ item.price } đ</Text>
                    </Card>
                ))}
            </Space>
            <Pagination
                defaultCurrent={1}
                defaultPageSize={5} // Default size of page
                onChange={handleChange}
                total={products.length} // Total number of card data available/>
            />
        </Row>
    </div>
}

/**
 * @author
 * @todo
 * @param {Object} props
 * @return {void}
 */
const AllProductsTab = (props) => {
    const { data } = props;
    const { products, mouted, shop } = data;
    const { store } = shop;
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(5);
    const productArr = [
        { img: '', title: 'Desk, Study Table With Handy Drawer Nordic Style IGA - GP185', price: 120000, rating: 4, soldquantity: 11, popular: true, new: true },
        { img: '', title: 'Europe Street beat 2', price: 120000, rating: 3, soldquantity: 11, popular: true, new: true },
        { img: '', title: 'Europe Street beat 3', price: 120000, rating: 5, soldquantity: 11, popular: true, new: true },
        { img: '', title: 'Europe Street beat 4', price: 120000, rating: 4, soldquantity: 11, popular: false, new: false },
        { img: '', title: 'Europe Street beat 5', price: 120000, rating: 2, soldquantity: 11, popular: true, new: true },
        { img: '', title: 'Europe Street beat 6', price: 120000, rating: 4, soldquantity: 11, popular: false, new: false },
        { img: '', title: 'Europe Street beat 7', price: 120000, rating: 3, soldquantity: 11, popular: false, new: false },
    ];
    const [filterData, setFilterData] = useState(products);
    const numEachPage = 5;  // Use a constant here to keep track of number of cards per page
    const handlePaginationChange = value => {
        setMinValue((value - 1) * numEachPage);
        setMaxValue(value * numEachPage);
    };
    const productCategory = [
        { key: 1, label: 'Beauty & Health' },
        { key: 2, label: 'Home & Life' },
    ];
    const items = [
        { label: 'Phổ biến', key: '1', children: <>
            <Row className="productContainer popular">
                <Col span={24}>
                    <Space size={'middle'} wrap  >
                        {filterData.slice(minValue, maxValue).map((item, index) => (
                            <Card className="productItem"
                                key={index}
                                hoverable
                                style={{ width: 190 }}
                                cover={<img alt='Product-Sellers' src={ item.image_link } />}>
                                <Meta title={item.name} />
                                <div className="rating">
                                    <Rate defaultValue={item.rating} style={{ fontSize: 8 }} disabled />
                                    <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 10++ </small>
                                </div>
                                <Text className="price" type="danger" strong>{ item.price } đ</Text>
                            </Card>
                        ))}
                    </Space>
                </Col>

                <Pagination defaultCurrent={1}
                    defaultPageSize={5} //default size of page
                    onChange={handlePaginationChange}
                    total={filterData.length}//total number of card data available/>
                />
            </Row>
        </> }, // remember to pass the key prop
        { label: 'Bán chạy', key: '2', children: <>
            <Row className="productContainer popular">
                <Col span={24}>
                    <Space size={'middle'} wrap  >
                        {filterData.slice(minValue, maxValue).map((item, index) => (
                            <Card className="productItem"
                                key={index}
                                hoverable
                                style={{ width: 190 }}
                                cover={<img alt="example" src="https://salt.tikicdn.com/cache/280x280/ts/product/70/f5/d7/2ac2ab4cee62f28282807cae8a85d635.png" />}>
                                <Meta title={item.title} />

                                <div className="rating">
                                    <Rate defaultValue={item.rating} style={{ fontSize: 8 }} disabled />
                                    <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 10++ </small>
                                </div>
                                <Text className="price" type="danger" strong>120.000 đ</Text>
                            </Card>
                        ))}
                    </Space>
                </Col>

                <Pagination defaultCurrent={1}
                    defaultPageSize={5} //default size of page
                    onChange={handlePaginationChange}
                    total={filterData.length}//total number of card data available/>
                />
            </Row>
        </> },
        { label: 'Hàng mới', key: '3', children: <>
            <Row className="productContainer new">
                <Col span={24}>
                    <Space size={'middle'} wrap  >
                        {filterData.slice(minValue, maxValue).map((item, index) => (
                            <Card className="productItem"
                                key={index}
                                hoverable
                                style={{ width: 190 }}
                                cover={<img alt="example" src="https://salt.tikicdn.com/cache/280x280/ts/product/70/f5/d7/2ac2ab4cee62f28282807cae8a85d635.png" />}>
                                <Meta title={item.title} />

                                <div className="rating">
                                    <Rate defaultValue={item.rating} style={{ fontSize: 8 }} disabled />
                                    <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 10++ </small>
                                </div>
                                <Text className="price" type="danger" strong>120.000 đ</Text>
                            </Card>
                        ))}
                    </Space>
                </Col>

                <Pagination defaultCurrent={1}
                    defaultPageSize={5} //default size of page
                    onChange={handlePaginationChange}
                    total={filterData.length}//total number of card data available/>
                />
            </Row>
        </> },
        { label: 'Giá thấp đến cao', key: '4', children: <>
            <Row className="productContainer priceAsc">
                <Col span={24}>
                    <Space size={'middle'} wrap  >
                        {filterData.slice(minValue, maxValue).map((item, index) => (
                            <Card className="productItem"
                                key={index}
                                hoverable
                                style={{ width: 190 }}
                                cover={<img alt="example" src="https://salt.tikicdn.com/cache/280x280/ts/product/70/f5/d7/2ac2ab4cee62f28282807cae8a85d635.png" />}>
                                <Meta title={item.title} />

                                <div className="rating">
                                    <Rate defaultValue={item.rating} style={{ fontSize: 8 }} disabled />
                                    <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 10++ </small>
                                </div>
                                <Text className="price" type="danger" strong>120.000 đ</Text>
                            </Card>
                        ))}
                    </Space>
                </Col>

                <Pagination defaultCurrent={1}
                    defaultPageSize={5} //default size of page
                    onChange={handlePaginationChange}
                    total={filterData.length}//total number of card data available/>
                />
            </Row>
        </> },
        { label: 'Giá cao đến thấp', key: '5', children: <>
            <Row className="productContainer priceDesc">
                <Col span={24}>
                    <Space size={'middle'} wrap  >
                        {filterData.slice(minValue, maxValue).map((item, index) => (
                            <Card className="productItem"
                                key={index}
                                hoverable
                                style={{ width: 190 }}
                                cover={<img alt="example" src="https://salt.tikicdn.com/cache/280x280/ts/product/70/f5/d7/2ac2ab4cee62f28282807cae8a85d635.png" />}>
                                <Meta title={item.title} />

                                <div className="rating">
                                    <Rate defaultValue={item.rating} style={{ fontSize: 8 }} disabled />
                                    <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 10++ </small>
                                </div>
                                <Text className="price" type="danger" strong>120.000 đ</Text>
                            </Card>
                        ))}
                    </Space>
                </Col>

                <Pagination defaultCurrent={1}
                    defaultPageSize={5} //default size of page
                    onChange={handlePaginationChange}
                    total={filterData.length}//total number of card data available/>
                />
            </Row>
        </> },
    ];

    // const filterBar = [
    //     {
    //         label: `Popular`,
    //         key: '1',
    //     },
    //     {
    //         label: `Selling`,
    //         key: '2',
    //         children:
    //             <Row className="productContainer">
    //                 <Col span={24}>
    //                     <Space size={'middle'} wrap  >
    //                         {filterData.slice(minValue, maxValue).map((item, index) => (
    //                             <Card className="productItem"
    //                                 key={index}
    //                                 hoverable
    //                                 style={{ width: 190 }}
    //                                 cover={<img alt="example" src="https://salt.tikicdn.com/cache/280x280/ts/product/70/f5/d7/2ac2ab4cee62f28282807cae8a85d635.png" />}>
    //                                 <Meta title={item.title} />

    //                                 <div className="rating">
    //                                     <Rate defaultValue={item.rating} style={{ fontSize: 8 }} disabled />
    //                                     <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 10++ </small>
    //                                 </div>
    //                                 <Text className="price" type="danger" strong>120.000 đ</Text>
    //                             </Card>
    //                         ))}
    //                     </Space>
    //                 </Col>

    //                 <Pagination defaultCurrent={1}
    //                     defaultPageSize={5} //default size of page
    //                     onChange={handlePaginationChange}
    //                     total={filterData.length}//total number of card data available/>
    //                 />
    //             </Row>,
    //     },
    //     {
    //         label: `New Products`,
    //         key: '3',
    //         children:
    //             <Row className="productContainer">
    //                 <Col span={24}>
    //                     <Space size={'middle'} wrap  >
    //                         {filterData.slice(minValue, maxValue).map((item, index) => (
    //                             <Card className="productItem"
    //                                 key={index}
    //                                 hoverable
    //                                 style={{ width: 190 }}
    //                                 cover={<img alt="example" src="https://salt.tikicdn.com/cache/280x280/ts/product/70/f5/d7/2ac2ab4cee62f28282807cae8a85d635.png" />}>
    //                                 <Meta title={item.title} />

    //                                 <div className="rating">
    //                                     <Rate defaultValue={item.rating} style={{ fontSize: 8 }} disabled />
    //                                     <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 10++ </small>
    //                                 </div>
    //                                 <Text className="price" type="danger" strong>120.000 đ</Text>
    //                             </Card>
    //                         ))}
    //                     </Space>
    //                 </Col>

    //                 <Pagination defaultCurrent={1}
    //                     defaultPageSize={5} //default size of page
    //                     onChange={handlePaginationChange}
    //                     total={filterData.length}//total number of card data available/>
    //                 />
    //             </Row>,
    //     },
    //     {
    //         label: `Low to high price`,
    //         key: '4',
    //         children:
    //             <Row className="productContainer">
    //                 <Col span={24}>
    //                     <Space size={'middle'} wrap  >
    //                         {filterData.slice(minValue, maxValue).map((item, index) => (
    //                             <Card className="productItem"
    //                                 key={index}
    //                                 hoverable
    //                                 style={{ width: 190 }}
    //                                 cover={<img alt="example" src="https://salt.tikicdn.com/cache/280x280/ts/product/70/f5/d7/2ac2ab4cee62f28282807cae8a85d635.png" />}>
    //                                 <Meta title={item.title} />

    //                                 <div className="rating">
    //                                     <Rate defaultValue={item.rating} style={{ fontSize: 8 }} disabled />
    //                                     <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 10++ </small>
    //                                 </div>
    //                                 <Text className="price" type="danger" strong>120.000 đ</Text>
    //                             </Card>
    //                         ))}
    //                     </Space>
    //                 </Col>

    //                 <Pagination defaultCurrent={1}
    //                     defaultPageSize={5} //default size of page
    //                     onChange={handlePaginationChange}
    //                     total={filterData.length}//total number of card data available/>
    //                 />
    //             </Row>,
    //     },
    //     {
    //         label: `Price high to low`,
    //         key: '5',
    //         children:
    //             <Row className="productContainer">
    //                 <Col span={24}>
    //                     <Space size={'middle'} wrap  >
    //                         {filterData.slice(minValue, maxValue).map((item, index) => (
    //                             <Card className="productItem"
    //                                 key={index}
    //                                 hoverable
    //                                 style={{ width: 190 }}
    //                                 cover={<img alt="example" src="https://salt.tikicdn.com/cache/280x280/ts/product/70/f5/d7/2ac2ab4cee62f28282807cae8a85d635.png" />}>
    //                                 <Meta title={item.title} />

    //                                 <div className="rating">
    //                                     <Rate defaultValue={item.rating} style={{ fontSize: 8 }} disabled />
    //                                     <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 10++ </small>
    //                                 </div>
    //                                 <Text className="price" type="danger" strong>120.000 đ</Text>
    //                             </Card>
    //                         ))}
    //                     </Space>
    //                 </Col>

    //                 <Pagination defaultCurrent={1}
    //                     defaultPageSize={5} //default size of page
    //                     onChange={handlePaginationChange}
    //                     total={filterData.length}//total number of card data available/>
    //                 />
    //             </Row>,
    //     },
    // ]
    const onFilterChange = (key) => {
        // console.log('filter e:', key);
        // //key: 1 == popular, 2 == selling sort luotmua, 3 == new, 4 == sort price asc , 5 == sort price dessc
        // productArr.map((filterItem) => {
        //     switch (key) {
        //         case '1':
        //             return setFilterData(productArr.filter((item) => item.popular === true));
        //         case '2':
        //             return setFilterData(productArr.filter((item) => item.popular === false));
        //         case '3':
        //             return setFilterData(productArr.filter((item) => item.new === true));
        //         default: return setFilterData(productArr);
        //     }
        // })
    };

    return (<>
        <Row className='products_by_category_container'>
            <Col className='leftSide' span={4}>
                <Affix className='fixBar' offsetTop={0}>
                    <div>
                        <Title level={5}>Danh mục sản phẩm</Title>
                        <Menu items={productCategory} />
                        <Divider />
                    </div>
                </Affix>
            </Col>
            <Col className='rightSide' span={19} offset={1}>
                <Title level={5}>Tất cả sản phẩm <small>: {filterData.length} kết quả</small></Title>
                {/* <Tabs
                    defaultActiveKey="1"
                    onChange={onFilterChange}
                    items={filterBar}
                /> */}
                <Tabs
                    defaultActiveKey='1'
                    onChange={onFilterChange}
                    items={items}
                />
            </Col>
        </Row>
    </>)
}

/**
 * @author
 * @todo
 * @param {Object} props
 * @return {void}
 */
const CollectionTab = () => {
    return (<>
        CollectionTab
    </>)
}

/**
 * @author
 * @todo
 * @param {Object} props
 * @return {void}
 */
const StoreProfile = (props) => {
    const { data } = props;
    const { products, mouted, shop } = data;
    const { store } = shop;
    const list = [
        {
            title: 'Ngày tham gia',
            icon: <CalendarOutlined />,
            content: `${store.joined_date}`,
        },{
            title: 'Sản phẩm',
            icon: <InboxOutlined />,
            content: `${products.length}+`,
        },{
            title: 'Mô tả cửa hàng',
            icon: <ShopOutlined />,
            content: `${store.description}`,
        },{
            title: 'Đánh giá',
            icon: <StarOutlined />,
            content: <>4/5 <StarFilled style={{ color: 'rgb(255, 196, 0)' }} /> </>,
        },{
            title: 'Người theo dõi',
            icon: <UserAddOutlined />,
            content: '10.000'
        },{
            title: 'Xếp hạng',
            icon: <StarOutlined />,
            content: `VIP Gold`,
        }
    ];
    return (
        <Row align='middle'>
            <Col span={10}>
                <Image preview={false}
                    style={{ objectFit: 'contain', borderRadius: '3px' }}
                    src={'https://salt.tikicdn.com/ts/tmp/d3/bd/74/2f7379bea9e883cfb9cfdf85cbaf0951.jpg'}
                />
            </Col>
            <Col span={1} offset={1}>
                <Divider type='vertical' style={{ height: "100%" }} />
            </Col>
            <Col span={12} >
                <List
                    itemLayout="horizontal"
                    dataSource={list}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={item.icon}
                                title={item.title}
                                description={item.content}
                            />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}

export default ShopPage;
