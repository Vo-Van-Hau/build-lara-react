import { useState, useEffect, useContext, useMemo } from 'react';
import { 
    Pagination, Space, Card, Rate, Affix, Menu, List, Avatar, Col, Divider, Row, 
    Typography, Button, Tabs, Input, Image 
} from 'antd';
import {
    AntDesignOutlined, UserAddOutlined, StarOutlined, PlusOutlined, SearchOutlined,
    CalendarOutlined, InboxOutlined, ShopOutlined, StarFilled, CheckOutlined,
} from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { ShopContext } from '../Contexts/ShopContext';

const { Title, Text } = Typography;

const ShopPage = (props) => {

    const { keyID, get_user } = props;
    const { user, config } = props.data;

    const { data, get_products, setRouter, get_shop, followStore } = useContext(ShopContext);
    const { products, mouted, shop } = data;
    const { store } = shop;
    const { user_follow_stores } = store;

    const items = [
        { label: 'Cửa Hàng', key: '1', children: <ShopTab data={data} setRouter={setRouter} /> },
        // { label: 'Tất Cả Sản Phẩm', key: '2', children: <AllProductsTab data={data} /> },
        // { label: 'Bộ Sưu Tập', key: '3', children: <CollectionTab data={data} /> },
        { label: 'Hồ Sơ Cửa Hàng', key: '4', children: <StoreProfile data={data} /> },
    ];

     /**
     * @author: <hauvo1709@gmail.com>
     * @todo: follow store
     * @param:
     * @return {void}
     */
    const handleFollowStore = async (storeItem) => {
        return await Promise.all([
            followStore({
                store_id: storeItem.id || 0,
            }),
            get_user(),
        ])
    }

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
                    {/* <StarOutlined /> 4.5/5 */}
                    <Divider type='vertical' />
                    <UserAddOutlined /> Số lượng theo dõi : {user_follow_stores.length || '-'}
                </div>
            </Col>
            <Col span={3}>
                {user.user_follow_stores.map(item => item.store_id).includes(store.id || 0) ? 
                    <Button icon={<CheckOutlined />} size='small' disabled style={{borderColor: '#52c41a', color: '#52c41a',}}>
                        Đang theo dõi
                    </Button> 

                    :
                    <Button icon={<PlusOutlined />} size='small' 
                        onClick={() => handleFollowStore(store)}
                    >
                        Theo Dõi
                    </Button>}
            </Col>
            <Col span={10} offset={12} >
                <Input
                    placeholder="Tìm kiếm sản phẩm..."
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
    const { data, setRouter } = props;
    const { products, get_products } = data;
    const [minShowProductsValue, setMinValue] = useState(0);
    const [maxShowProductsValue, setMaxValue] = useState(50);
    const numEachPage = 5  // Use a constant here to keep track of number of cards per page

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {mixed} pagination
     * @param {mixed} filters
     * @return {void}
     */
    const handleTableChange = (pagination, filters) => {
        return get_products(pagination.current, {});
    }

    return <div className='shop_tab_container'>
        <Row className="productContainer">
            <Space size={[10, 16]} style={{ width: '100%' }}>
                <Row gutter={[8, 8]}>
                    {products.slice(minShowProductsValue, maxShowProductsValue).map((item, index) => (
                    <Col span={4} key={`${item.id}_${index}`}>
                            <Card className="productItem"
                                key={index}
                                hoverable
                                // style={{ width: 200 }}
                                cover={<img alt={item.slug_name} src={item.image_link} />}
                                onClick={() => setRouter({
                                    module: 'products',
                                    controller: 'productdetail',
                                    action: 'view',
                                    id: item.id,
                                })}
                                style={{ padding: 12 }}
                                bodyStyle={{ padding: 0 }}
                            >
                                <Space
                                    direction="vertical"
                                    size={0}
                                    style={{
                                        display: 'flex',
                                    }}
                                >
                                    <Text style={{ fontWeight: 490, fontSize: 14 }} ellipsis={true}>{item.name ? item.name : ``}</Text>
                                    <div className="rating" style={{marginTop: 5, marginBottom: 5}}>
                                        {/* <Rate defaultValue={item.rating} style={{ fontSize: 12 }} disabled /> */}
                                        <span style={{ color: 'rgb(128, 128, 137)' }}> | Đã bán: {item.quantity_sold ? item.quantity_sold.length : 0} </span>
                                    </div>
                                    <Text className="price" type="danger" style={{fontSize: 16}}>{item.price_format ? item.price_format : ``} đ</Text>
                                </Space>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Space>
            <Pagination
                defaultCurrent={1}
                defaultPageSize={50} // Default size of page
                onChange={handleTableChange}
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
    const { user_follow_stores } = store;
    const list = [
        {
            title: 'Ngày tham gia',
            icon: <CalendarOutlined />,
            content: `${store.joined_date}`,
        },{
            title: 'Sản phẩm',
            icon: <InboxOutlined />,
            content: `${products.length}`,
        },{
            title: 'Mô tả cửa hàng',
            icon: <ShopOutlined />,
            content: `${store.description}`,
        }
        // {
        //     title: 'Đánh giá',
        //     icon: <StarOutlined />,
        //     content: <>4/5 <StarFilled style={{ color: 'rgb(255, 196, 0)' }} /> </>,
        // }
        ,{
            title: 'Người theo dõi',
            icon: <UserAddOutlined />,
            content: user_follow_stores.length || '-'
        }
        // {
        //     title: 'Xếp hạng',
        //     icon: <StarOutlined />,
        //     content: `VIP Gold`,
        // }
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
