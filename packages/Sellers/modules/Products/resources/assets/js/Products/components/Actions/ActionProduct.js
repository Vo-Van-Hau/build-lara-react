import React, { createRef, useState, useContext, useEffect, useRef } from 'react';
import {
    RightOutlined, UploadOutlined, LeftOutlined, EditOutlined,
 } from '@ant-design/icons';
import {
  Form, Input, Button, Select, Cascader, Upload, InputNumber,
  Col, Row, Tabs, message, Affix, Popconfirm
} from 'antd';
import { ProductsContext } from '../Contexts/ProductsContext';
import Helper from '../Helper/Helper';

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const ActionProduct = (props) => {

    const { config } = props.data;
    const { app } = config;
    const { baseURL } = app;

    const [activeTab2, setTab2Active] = useState(true);
    const [activeTab3, setTab3Active] = useState(true);
    const [activeTab4, setTab4Active] = useState(true);
    const productRef = useRef({});
    const { data, store, get_product_categories, get_product_item, get_axios, update } = useContext(ProductsContext);
    const { categories, mouted, item } = data;
    const { keyID } = props;

    const [activeKey, setActiveKey] = useState('1');
    const onKeyChange = (key) => setActiveKey(key);

    /**
     * @todo
     * @param
     * @return {void}
     */
    const Tab1 = (props) => {

        const formRef = createRef();
        const displayRender = (labels) => labels[labels.length - 1];

        const propsDragger = {
            name: 'image_link',
            multiple: true,
            action: 'http://dev.build-laravel-react.com/mocky/upload/v2/image',
            onChange(info) {
                const { status } = info.file;
                if(status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if(status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
                productRef.current = {
                    ...productRef.current,
                    image_link: info.file
                }
            },
            onDrop(e) {
                console.log('Dropped files', e.dataTransfer.files);
            },
        };

        /**
         * @author: <hauvo1709@gmail.com>
         * @todo:
         * @param {Object} event
         * @return
         */
        const onFileImageProductChange = async (event) => {
            const formData = new FormData();
            const selectedFile = event.target.files[0];
            const axios = get_axios();
            await formData.append('image_link', selectedFile);
            await axios
            .get_secured()
            .post(`${baseURL}/payloadv2/upload/v2/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                const { status, file_url } = res.data;
                if(status) {
                    productRef.current = {
                        ...productRef.current,
                        image_link: file_url || ''
                    }
                    Helper.Notification('success', '[Tải hình ảnh]', 'Hình ảnh đăng tải thành công');
                } else {
                    Helper.Notification('error', '[Tải hình ảnh]', 'Hình ảnh đăng tải thất bại');
                }
            })
            .catch((errors) => {
                console.log(errors);
            });
        };

        /**
         * @author: <hauvo1709@gmail.com>
         * @todo
         * @param {*} values
         * @return {void}
         */
        const onFinish = (values) => {
            formRef.current.validateFields()
            .then((values) => {
                productRef.current = {
                    ...productRef.current,
                    ...values,
                    category_id: values.category_id[0] ? values.category_id[0] : 0
                }
                setTab2Active(false);
                onKeyChange('2');
            });
        };

        /**
         * @author: <hauvo1709@gmail.com>
         * @todo:
         * @param
         * @return
         */
        const onReset = () => {
            formRef.current.resetFields();
        };

        useEffect(function() {

        }, []);

        return (<>
            <Form
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 24 }}
                size={'large'}
                labelAlign={'left'}
                ref={formRef}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    name: keyID && item.name ? item.name : '',
                    brand: keyID && item.product_identifiers ? item.product_identifiers.brand : '',
                    cogs: keyID && item.cogs ? item.cogs : 0,
                    price: keyID && item.price ? item.price : 0,
                    description: keyID && item.description ? item.description : '',
                    category_id: keyID && item.category_ids ? item.category_ids : [],
                }}
            >
                <Row gutter={[50, 5]}>
                    <Col span={12}>
                        <Form.Item name="name" label="Tên sản phẩm" >
                            <Input placeholder="Nhập tên sản phẩm"/>
                        </Form.Item>
                        <Form.Item name="brand" label="Thương hiệu sản phẩm" >
                            <Input placeholder="Nhập tên thương hiệu sản phẩm"/>
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh sản phẩm"
                        >
                            {/* <Dragger
                                span={12}
                                {...propsDragger}
                            >
                                <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                                <p className="ant-upload-text">Chọn hoặc kéo thả hình ảnh</p>
                            </Dragger> */}
                            <Input type='file' onChange={(e) => onFileImageProductChange(e)}/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name="category_id" label="Danh mục sản phẩm">
                            <Cascader
                                placeholder="Chọn danh mục sản phẩm"
                                options={categories}
                                expandTrigger="hover"
                                displayRender={displayRender}
                                // defaultValue={20}
                            />
                        </Form.Item>
                        <Form.Item name="cogs" label="Giá vốn hàng bán">
                            <InputNumber 
                                addonAfter="VNĐ" 
                                style={{ width: '100%' }} 
                                min={0} 
                                placeholder="Nhập giá vốn hàng bán"
                                decimalSeparator={`,`}
                            />
                        </Form.Item>
                        <Form.Item name="price" label="Giá bán thực tế" >
                            <InputNumber 
                                addonAfter="VNĐ" 
                                style={{ width: '100%' }} 
                                min={0} 
                                placeholder="Nhập giá bán thực tế"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="description" label="Mô tả sản phẩm">
                    <TextArea rows={8} />
                </Form.Item>
                <Affix style={{ position: 'fixed', bottom: 0, right: 0, width: '100%', background: '#fff', boxShadow: '0px -1px 6px -2px rgba(171,171,171,0.75)' }} justify='between' align='middle' >
                    <Form.Item style={{ padding: '1.5rem 2rem', marginBottom: '0', textAlign: 'right', }}  >
                        <Popconfirm
                        placement="top"
                        title={'Bạn có muốn reset?'}
                        onConfirm={onReset}
                        okText="Yes"
                        cancelText="No"
                        >
                        <Button htmlType="button" style={{ marginRight: '1rem' }}>
                            Hủy
                        </Button>
                        </Popconfirm>
                        <Button type="primary" htmlType="submit" icon={<RightOutlined />}>
                            Tiếp tục
                        </Button>
                    </Form.Item>
                </Affix>
            </Form>
        </>)
    }

    /**
     * @todo
     * @return
     */
    const Tab2 = (props) => {
        const formRef = createRef();
        const onFinish = (values) => {
            formRef.current.validateFields()
            .then((values) => {
                productRef.current = {
                    ...productRef.current,
                    ...values,
                }
                setTab3Active(false);
                onKeyChange('3');
            });
        };
        const onReset = () => {
            formRef.current.resetFields();
        };

        return (<>
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 24 }}
            size={'large'}
            labelAlign={'left'}
            ref={formRef}
            layout="horizone"
            onFinish={onFinish}
            initialValues={{
                sku: keyID && item.product_identifiers ? item.product_identifiers.sku : '',
                gtin: keyID && item.product_identifiers ? item.product_identifiers.gtin : '',
                supplier_id: keyID && item.product_identifiers ? item.product_identifiers.supplier_id : '',
            }}
        >
            {/* <Form.Item name="supplier_id" label="Nhà cung cấp" >
                <Select
                        showSearch
                        placeholder="Chọn nhãn hiệu"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().includes(input)}
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                >
                    <Option value="1">Adidas</Option>
                    <Option value="2">Nike</Option>
                    <Option value="3">H&M</Option>
                    <Option value="4">Shein</Option>
                </Select>
            </Form.Item> */}
            <Form.Item
                name="sku" label="SKU" span={12}
                tooltip="SKU(đơn vị phân loại hàng hóa tồn kho) là một dạng quy ước nhằm phân loại mặt hàng để bán, đó có thể là một sản phẩm hoặc dịch vụ, và kèm tất cả các thông số, thuộc tính liên quan với các loại item mà phân biệt nó với các loại mặt hàng khác. vd:4225-776-3234">
                <Input placeholder="Nhập mã SKU"/>
            </Form.Item>
            <Form.Item name="gtin" label="GTIN" span={12} tooltip="GTIN ( mã số sản phẩm thương mại toàn cầu ) còn được biết đến là mã vạch" >
                <Input placeholder="Nhập mã GTIN"/>
            </Form.Item>

            <Affix style={{ position: 'fixed', bottom: 0, right: 0, width: '100%', background: '#fff', boxShadow: '0px -1px 6px -2px rgba(171,171,171,0.75)' }} justify='between' align='middle' >
                <Form.Item style={{ padding: '1.5rem 2rem', marginBottom: '0', textAlign: 'right', }}  >
                    <Popconfirm
                        placement="top"
                        title={'Bạn có muốn reset?'}
                        onConfirm={onReset}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button htmlType="button" style={{ marginRight: '1rem' }}>Hủy</Button>
                    </Popconfirm>
                    <Button onClick={() => onKeyChange('1')} style={{ marginRight: '1rem' }} icon={<LeftOutlined />}>
                        Trở lại
                    </Button>
                    <Button type="primary" htmlType="submit" icon={<RightOutlined />}>
                        Tiếp tục
                    </Button>
                </Form.Item>
            </Affix>
        </Form></>)
    }

    /**
     * @todo
     * @returns
     */
    const Tab3 = (props) => {
        const formRef = createRef();
        const onFinish = (values) => {
            setTab4Active(false);
            onKeyChange('4');
            formRef.current.validateFields()
            .then((values) => {
                productRef.current = {
                    ...productRef.current,
                    ...values,
                }
            });
        };
        const onReset = () => {
            formRef.current.resetFields();
        };

        return (<>
        <Form
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            size={'large'}
            labelAlign={'left'}
            ref={formRef}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                condition: keyID && item.product_description_detail ? item.product_description_detail.condition : 'new',
                weight: keyID && item.product_description_detail ? item.product_description_detail.weight : '',
                gender: keyID && item.product_description_detail ? item.product_description_detail.gender : '',
                material: keyID && item.product_description_detail ? item.product_description_detail.material : '0',
                length: keyID && item.product_description_detail ? item.product_description_detail.length : '',
                width: keyID && item.product_description_detail ? item.product_description_detail.width : '',
                height: keyID && item.product_description_detail ? item.product_description_detail.height : '',
                age_group: keyID && item.product_description_detail ? item.product_description_detail.age_group : '',
                size: keyID && item.product_description_detail ? item.product_description_detail.size : '',
                size_type: keyID && item.product_description_detail ? item.product_description_detail.size_type : '',
                color: keyID && item.product_description_detail ? item.product_description_detail.color : '0',
                countries: keyID && item.countries ? item.product_description_detail.countries : 0,
            }}
        >
            <Row gutter={[50, 5]}>
            <Col span={12}>
                <Form.Item name="condition" label="Tình trạng sản phẩm">
                    <Select
                        showSearch
                        placeholder="Nhập để tìm kiếm"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        <Option value="refurbished">Sản phẩm đã tân trang</Option>
                        <Option value="used">Sản phẩm đã qua sử dụng</Option>
                        <Option value="new">Sản phẩm mới</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="color" label="Chọn màu sắc sản phẩm">
                    <Select
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Chọn màu sắc sản phẩm"
                        options={[
                            {
                                id: 0,
                                label: 'Chọn màu sắc sản phẩm',
                                value:'0',
                            },{
                                id: 1,
                                label: 'Đỏ',
                                value: '1',
                            },{
                                id: 2,
                                label: 'Xanh da trời',
                                value: '2',
                            },{
                                id: 3,
                                label: 'Xanh lá',
                                value: '3',
                            },{
                                id: 4,
                                label: 'Vàng',
                                value: '4',
                            },{
                                id: 5,
                                label: 'Tím',
                                value: '5',
                            },{
                                id: 6,
                                label: 'Hồng',
                                value: '6',
                            },{
                                id: 7,
                                label: 'Cam',
                                value: '7',
                            },{
                                id: 8,
                                label: 'Nâu',
                                value: '8',
                            },{
                                id: 9,
                                label: 'Đen',
                                value: '9',
                            },{
                                id: 10,
                                label: 'Trắng',
                                value: '10',
                            },{
                                id: 11,
                                label: 'Xám',
                                value: '11',
                            },{
                                id: 12,
                                label: 'Bạc',
                                value: '12',
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item name="weight" label="Trọng lượng sau đóng gói (KG) " >
                    <InputNumber placeholder='Nhập trọng lượng' addonAfter="KG" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="gender" label="Nhóm giới tính">
                    <Select 
                        placeholder="Chọn nhóm giới tính"
                        options={[
                            {
                                id: 0,
                                label: 'Chọn nhóm giới tính',
                                value: '',
                            },{
                                id: 1,
                                label: 'Sản phẩm dành cho nam',
                                value: 'male',
                            },{
                                id: 2,
                                label: 'Sản phẩm dành cho nữ',
                                value: 'female',
                            },{
                                id: 3,
                                label: 'Tất cả',
                                value: 'all',
                            },
                        ]}
                    >
                    </Select>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="material" label="Vật liệu sản phẩm">
                    <Select
                        showSearch
                        placeholder="Nhập để tìm kiếm"
                        optionFilterProp="children"
                        // filterOption={(input, option) => option.children.includes(input)}
                        // filterSort={(optionA, optionB) =>
                        //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        // }
                        options={[
                            {
                                id: 0,
                                label: 'Chọn vật liệu',
                                value: '0',
                            },{
                                id: 1,
                                label: 'Kim loại',
                                value: '1',
                            },{
                                id: 2,
                                label: 'Nhựa',
                                value: '2',
                            },{
                                id: 3,
                                label: 'Thủy tinh',
                                value: '3',
                            },{
                                id: 4,
                                label: 'Chất lỏng',
                                value: '4',
                            },{
                                id: 5,
                                label: 'Hữu cơ',
                                value: '5',
                            },{
                                id: 6,
                                label: 'Giấy',
                                value: '6',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="countries" label="Xuất xứ">
                    <Select 
                        placeholder="Xuất xứ sản phẩm"
                        options={[
                            {
                                id: 0,
                                label: 'Chọn xuất xứ sản phẩm',
                                value: 0,
                            },{
                                id: 1,
                                label: 'Việt Nam',
                                value: 1,
                            },{
                                id: 2,
                                label: 'Nhật Bản',
                                value: 2,
                            },{
                                id: 3,
                                label: 'Trung Quốc',
                                value: 3,
                            },{
                                id: 4,
                                label: 'Singapore',
                                value: 4,
                            },
                        ]}
                    />
                </Form.Item>
                <Row gutter={[5, 16]} justify='between'>
                    <Col span={8}>
                        <Form.Item name="length" label="Chiều dài sản phẩm" labelCol={{span: 24}}>
                            <InputNumber
                                addonAfter="Cm"
                                placeholder='Nhập chiều dài'
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="width" label="Chiều rộng sản phẩm" labelCol={{span: 24}}>
                            <InputNumber
                                addonAfter="Cm"
                                placeholder='Nhập chiều rộng'
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="height"  label="Chiều cao sản phẩm" labelCol={{span: 24}}>
                            <InputNumber
                                addonAfter="Cm"
                                placeholder='Nhập chiều cao'
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="size_type" label="Nhóm độ tuổi">
                    <Select 
                        placeholder="Chọn nhóm độ tuổi"
                        options={[
                            {
                                id: 0,
                                label: 'Chọn nhóm độ tuổi',
                                value: '',
                            },{
                                id: 1,
                                label: 'Trẻ sơ sinh',
                                value: 'newborn',
                            },{
                                id: 2,
                                label: 'Trẻ mới biết đi',
                                value: 'toddler',
                            },{
                                id: 3,
                                label: 'Trẻ em',
                                value: 'kids',
                            },{
                                id: 4,
                                label: 'Người lớn',
                                value: 'adult',
                            },{
                                id: 5,
                                label: 'Tất cả',
                                value: 'all',
                            },
                        ]}
                    />
                </Form.Item>
                {/* <Form.Item name="size" label="Size sản phẩm">
                    <Select placeholder="Chọn size sản phẩm">
                        <Select.Option value="S">Size S</Select.Option>
                        <Select.Option value="M">Size M</Select.Option>
                        <Select.Option value="L">Size L</Select.Option>
                        <Select.Option value="XL">Size XL</Select.Option>
                        <Select.Option value="2XL">Size 2XL</Select.Option>
                        <Select.Option value="3XL">Size 3XL</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="size_type" label="Thể loại size">
                    <Select placeholder="Chọn thể loại size">
                        <Select.Option value="regular">Bình thường</Select.Option>
                        <Select.Option value="petite">Nhỏ nhắn</Select.Option>
                        <Select.Option value="maternity">Thai sản</Select.Option>
                        <Select.Option value="big">Lớn</Select.Option>
                        <Select.Option value="tall">Cao</Select.Option>
                        <Select.Option value="plus">To</Select.Option>
                    </Select>
                </Form.Item> */}
            </Col>
            </Row>
            <Affix style={{ position: 'fixed', bottom: 0, right: 0, width: '100%', background: '#fff', boxShadow: '0px -1px 6px -2px rgba(171,171,171,0.75)' }} justify='between' align='middle'>
            <Form.Item style={{ padding: '1.5rem 2rem', marginBottom: '0', textAlign: 'right', }}  >
                <Popconfirm
                    placement="top"
                    title={'Bạn có muốn reset?'}
                    onConfirm={onReset}
                    okText="Yes"
                    cancelText="No"
                >
                <Button htmlType="button" style={{ marginRight: '1rem' }}>
                    Hủy
                </Button>
                </Popconfirm>
                <Button onClick={() => onKeyChange('2')} style={{ marginRight: '1rem' }} icon={<LeftOutlined />}>
                    Trở lại
                </Button>
                <Button type="primary" htmlType="submit" icon={<RightOutlined />}>
                    Tiếp tục
                </Button>
            </Form.Item>
            </Affix>
        </Form></>)
    }


    /**
     *
     * @param {*} props
     * @returns
     */
    const Tab4 = (props) => {
        const formRef = createRef();
        const onFinish = (values) => {
            setTab4Active(false);
            onKeyChange('4');
            formRef.current.validateFields()
            .then((values) => {
                productRef.current = {
                    ...productRef.current,
                    ...values,
                }
                if(keyID && keyID !== '') {
                    update({
                        id: keyID,
                        ...productRef.current,
                    });
                } else {
                    store(productRef.current);
                }
            });
        };
        const onReset = () => {
            formRef.current.resetFields();
        };

        return (<>
        <Form
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            size={'large'}
            labelAlign={'left'}
            ref={formRef}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                quantity: keyID && item.product_description_detail ? item.product_stock.product_quantity : 0
            }}
        >
            <Row gutter={[50, 5]}>
            <Col span={12}>
                <Form.Item name="quantity" label="Số lượng hàng hóa" >
                    <InputNumber style={{ width: '100%' }} min={0}/>
                </Form.Item>
            </Col>
            </Row>
            <Affix style={{ position: 'fixed', bottom: 0, right: 0, width: '100%', background: '#fff', boxShadow: '0px -1px 6px -2px rgba(171,171,171,0.75)' }} justify='between' align='middle' >
                <Form.Item style={{ padding: '1.5rem 2rem', marginBottom: '0', textAlign: 'right', }}  >
                    <Popconfirm
                        placement="top"
                        title={'Bạn có muốn reset?'}
                        onConfirm={onReset}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button htmlType="button" style={{ marginRight: '1rem' }}>
                        Hủy
                    </Button>
                    </Popconfirm>
                    <Button onClick={() => onKeyChange('3')} style={{ marginRight: '1rem' }} icon={<LeftOutlined />}>
                        Trở lại
                    </Button>
                    {((keyID !== '' || keyID !== '#') && keyID) ? 
                        <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
                            Cập nhật
                        </Button> : 
                        <Button type="primary" htmlType="submit" icon={<UploadOutlined />}>
                            Tạo mới
                        </Button>
                    }
                </Form.Item>
            </Affix>
        </Form>
        </>)
    }

  useEffect(function() {
    if(mouted) {
        get_product_categories(1, {});
        if((keyID !== '' || keyID !== '#') && keyID) {
            get_product_item(keyID);
        }
    }
  }, []);

  return (<>
        <Tabs
            defaultActiveKey="1"
            activeKey={activeKey}
            items={[
                {
                    label: `Thông tin sản phẩm`,
                    key: '1',
                    children: <Tab1 />,
                },{
                    label: `Nhà cung cấp sản phẩm`,
                    key: '2',
                    children: <Tab2 />,
                    disabled: activeTab2,
                },{
                    label: `Thông tin chi tiết`,
                    key: '3',
                    children: <Tab3 />,
                    disabled: activeTab3,
                },{
                    label: `Tình trạng tồn kho`,
                    key: '4',
                    children: <Tab4 />,
                    disabled: activeTab4,
                },
            ]}
        />
  </>)
}

export default ActionProduct;
