import React, { useContext, useEffect, useState } from 'react';
import {
    Breadcrumb, Col, Row, Menu, Divider, Typography, Affix, Space, Card, Rate, Pagination, Button, Form, Checkbox, InputNumber, List,
    Alert, Carousel, Image
} from 'antd';
import { HomeOutlined, LeftOutlined, RightOutlined ,CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { ProductsContext } from '../Contexts/ProductsContext';

const { Title, Text } = Typography;

const ProductsPage = ({keyID, ...props}) => {

    const { setRouter, data, get_products, get_product_categories, get_areas, filter_products } = useContext(ProductsContext);
    const { products, mouted, areas, filters } = data;
    const { countries } = areas;
    const { provinces } = countries;

    const [form] = Form.useForm();
    const [isShowAllFilter1, showAllFilter1] = useState(false);
    const [isShowAllFilter2, showAllFilter2] = useState(false);
    const [isShowAllFilter3, showAllFilter3] = useState(false);
    const [minShowProductsValue, setMinValue] = useState(0);
    const [maxShowProductsValue, setMaxValue] = useState(50);
    const [filterData, setFilterData] = useState({
        min_price: 0,
        max_price: 0,
        locations: [],
        brands: [],
        stores: [],
    });

    const menuRightItems = [
        { key: 1, label: 'Phổ Biến' },
        { key: 2, label: 'Bán Chạy' },
        { key: 3, label: 'Hàng Mới' },
        { key: 4, label: 'Giá Thấp Đến Cao' },
        { key: 5, label: 'Giá Cao Đến Thấp' },
    ];

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo
     * @param {Object} Event e
     * @return
     */
    const onCheckLocationsChange = (e, item) => {
        if(e.target.checked) {
            let values = filterData.locations;
            values.push(item.id);
            setFilterData({
                ...filterData,
                locations: values,
            });
        } else {
            let values = filterData.locations.filter((_location, index) => {
                return _location !== item.id;
            });
            setFilterData({
                ...filterData,
                locations: values,
            });
        }
    };

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo
     * @param {Object} Event e
     * @return
     */
     const onCheckBrandsChange = (e, item) => {
        if(e.target.checked) {
            let values = filterData.brands;
            values.push(item.id);
            setFilterData({
                ...filterData,
                brands: values,
            });
        } else {
            let values = filterData.brands.filter((_brands, index) => {
                return _brands !== item.id;
            });
            setFilterData({
                ...filterData,
                brands: values,
            });
        }
    };


    /**
     * @author: <hauvo1709@gmail.com>
     * @todo
     * @param {Object} Event e
     * @return
     */
     const onCheckStoresChange = (e, item) => {
        if(e.target.checked) {
            let values = filterData.stores;
            values.push(item.id);
            setFilterData({
                ...filterData,
                stores: values,
            });
        } else {
            let values = filterData.stores.filter((_stores, index) => {
                return _stores !== item.id;
            });
            setFilterData({
                ...filterData,
                stores: values,
            });
        }
    };

    /**
     * @author
     * @todo
     * @param
     * @return
     */
    const itemToRenderFilter = (item, showAll, maxItem = 5) => {
        item.sort((a, b) => b.primary - a.primary);
        if(showAll) return item;
        return item.slice(0, maxItem);
    };

    /**
     *
     */
    const handleFilterProducts = () => {
        form.validateFields()
        .then(values => {
            filter_products({
                ...filterData,
                ...values,
            });
        });
    }

    useEffect(() => {
        if(mouted) {
            get_products();
            get_product_categories(1, {});
            get_areas(1, {});
        }
    }, []);

    return (<>
        <Breadcrumb style={{ padding: '12px' }}>
            <Breadcrumb.Item style={{ cursor: 'pointer' }} >
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ cursor: 'pointer' }}>
                <span>Sản phẩm</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Sản phẩm gợi ý</Breadcrumb.Item>
        </Breadcrumb>
        <Row className='products_by_category_container' gutter={24}>
            <Col className='leftSide' span={4}>
                <Form
                    name="filter"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        min_price: 0,
                        max_price: 0,
                    }}
                    autoComplete="off"
                    onFinish={() => handleFilterProducts()}
                    form={form}
                >
                    <div>
                        <div style={{
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 10,
                        }}>
                            <Text strong>Nơi bán</Text>
                            <Form.Item>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={itemToRenderFilter(provinces, isShowAllFilter1)}
                                    loadMore={
                                        <Button type="link" icon={isShowAllFilter1 ? <CaretUpOutlined /> :<CaretDownOutlined />} onClick={() => showAllFilter1(!isShowAllFilter1)} style={{paddingLeft: 0}}>
                                            {isShowAllFilter1 ? `Thu gọn` : `Xem thêm `}
                                        </Button>
                                    }
                                    renderItem={(item, index) => (
                                        <List.Item key={index} style={{ paddingBottom: 5, paddingTop: 5 }}>
                                            <Checkbox onChange={(e) => onCheckLocationsChange(e, item)}>{item.name}</Checkbox>
                                        </List.Item>
                                    )}
                                />
                            </Form.Item>
                        </div>
                        <Divider style={{margin: 0}}/>
                        <div style={{
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 10,
                        }}>
                            <Text strong>Thương hiệu</Text>
                            <List
                                itemLayout="horizontal"
                                dataSource={itemToRenderFilter(filters.brands, isShowAllFilter2)}
                                loadMore={
                                    <Button type="link" icon={isShowAllFilter2?<CaretUpOutlined /> :<CaretDownOutlined />} onClick={() => showAllFilter2(!isShowAllFilter2)} style={{paddingLeft: 0}}>
                                        {isShowAllFilter2 ? `Thu gọn` : `Xem thêm `}
                                    </Button>}
                                renderItem={(item, index) => (
                                    <List.Item key={index} style={{ paddingBottom: 5, paddingTop: 5 }}>
                                        <Checkbox onChange={(e) => onCheckBrandsChange(e, item)}>{item.name}</Checkbox>
                                    </List.Item>
                                )}
                            />
                        </div>
                        <Divider style={{margin: 0}}/>
                        <div style={{
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 10,
                        }}>
                            <Text strong>Nhà cung cấp</Text>
                            <List
                                itemLayout="horizontal"
                                dataSource={itemToRenderFilter(filters.stores, isShowAllFilter3)}
                                loadMore={
                                    <Button type="link" icon={isShowAllFilter3?<CaretUpOutlined /> :<CaretDownOutlined />}onClick={() => showAllFilter3(!isShowAllFilter3)} style={{paddingLeft: 0}}>
                                        {isShowAllFilter3 ? `Thu gọn` : `Xem thêm `}
                                    </Button>}
                                renderItem={(item,index) => (
                                    <List.Item key={index} style={{ paddingBottom: 5, paddingTop: 5 }}>
                                        <Checkbox onChange={(e) => onCheckStoresChange(e, item)}>{item.name}</Checkbox>
                                    </List.Item>
                                )}
                            />
                        </div>
                        <Divider style={{margin: 0}}/>
                        {/* <div style={{
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 10,
                        }}>
                            <Text strong>Đánh giá</Text>
                             <List
                                itemLayout="horizontal"
                                dataSource={itemToRenderFilter(rate)}
                                renderItem={(item, index) => (
                                    <List.Item key={index} style={{ paddingBottom: 5, paddingTop: 5 }}>
                                        <Checkbox >{item} <StarFilled /></Checkbox>
                                    </List.Item>
                                )}
                            />
                        </div>
                        <Divider style={{margin: 0}}/> */}
                        <div style={{
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 10,
                        }}>
                            <Text strong>Giá</Text><br/>
                            {/* <Space
                                direction="vertical"
                                size={8}
                                style={{
                                    display: 'flex',
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                }}
                            >
                                <Tag color="default" style={{}}>Dưới 1.000.000đ</Tag>
                                <Tag color="default">Từ 1.000.000đ - 3.000.000</Tag>
                                <Tag color="default">Từ 3.000.000đ - 10.000.000</Tag>
                                <Tag color="default">Trên 10.000.000đ</Tag>
                            </Space> */}
                            <Space direction={`vertical`} size={`small`} style={{marginTop: 10, marginBottom: 10}}>
                                <Form.Item label="Từ" name="min_price" style={{marginBottom: 0}}>
                                    <InputNumber min={0} max={1000000000}/>
                                </Form.Item>
                                <Form.Item label="Đến" name="max_price" style={{marginBottom: 0}}>
                                    <InputNumber min={0} max={1000000000}/>
                                </Form.Item>
                            </Space>
                        </div>
                        <div>
                            <Button type="primary" htmlType="submit" style={{width: '100%',}}>Áp dụng</Button>
                        </div>
                        <Divider style={{}}/>
                    </div>
                </Form>
            </Col>
            <Col className='rightSide' span={20}>
                <Title level={5}>Tất cả các sản phẩm</Title>
                {/* <Row className='home_top_banner_container' justify="space-between">
                    <Col >
                        <Carousel
                            autoplay arrows swipeToSlide draggable
                            prevArrow={<LeftOutlined />}
                            nextArrow={<RightOutlined />}
                        >
                            {imgSrc.map((item, index) => {
                                return <Image
                                    key={index}
                                    preview={false}
                                    style={contentStyle}
                                    src={item.url} />
                            })}
                        </Carousel>
                    </Col>
                </Row> */}
                <Menu items={menuRightItems} mode="horizontal" />
                <Row className="productContainer">
                    <Space size={[10, 16]} style={{ width: '100%' }}>
                        <Row gutter={[8, 8]}>
                            {products.length > 0 ? products.slice(minShowProductsValue, maxShowProductsValue).map((item, index) => (
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
                                        <Text style={{ fontWeight: 400 }} ellipsis={true}>{item.name ? item.name : ``}</Text>
                                        <div className="rating">
                                            {/* <Rate style={{ fontSize: 12 }} disabled /> */}
                                            <small style={{ color: 'rgb(128, 128, 137)' }}> | Sold: 100++ </small>
                                        </div>
                                        <Text className="price" type="danger" strong>{item.price_format} đ</Text>
                                    </Card>
                                </Col>
                            ))
                            : <>
                                <Alert
                                    message="Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn"
                                    type="warning"
                                    showIcon
                                    closable={false}
                                />
                            </>}
                        </Row>
                    </Space>
                    {/* <Pagination
                        defaultCurrent={1}
                        // defaultPageSize={5} //default size of page
                        // onChange={handleChange}
                        total={products.length}//total number of card data available/>
                    /> */}
                </Row>
            </Col>
        </Row>
    </>)
}

export default ProductsPage;
