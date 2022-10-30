import React, { createRef, useState, useContext, useEffect, useRef } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import {
  Form, Input, Button, Select, Cascader, Radio, InputNumber, Upload,
  Col, Row, Tabs, message, Affix, Popconfirm
} from 'antd';
import { ProductsContext } from '../Contexts/ProductsContext';

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const ActionProduct = (props) => {

  const [activeTab2, setTab2Active] = useState(true);
  const [activeTab3, setTab3Active] = useState(true);
  const [activeTab4, setTab4Active] = useState(true);
  const productRef = useRef({});
  const { data, store, get_product_categories, get_product_item, set_table_loading, update } = useContext(ProductsContext);
  const { categories, mouted, item } = data;
  const { keyID } = props;

  const [activeKey, setActiveKey] = useState('1');
  const onKeyChange = (key) => setActiveKey(key);

  const onChange = (key) => {
        console.log(key);
  };

  /**
   * @todo
   * @param
   * @return {void}
   */
  const Tab1 = (props) => {
    const formRef = createRef();
    const onChange = (key) => {
        console.log(key);
    };
    const displayRender = (labels) => labels[labels.length - 1];
    const onChangeImage = (info) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    const onDropImage = (e) => {
        console.log('Dropped files', e.dataTransfer.files);
    }
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
    const onReset = () => {
        formRef.current.resetFields();
    };

    useEffect(function() {

    });

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
                    {/* <Form.Item label="Hình ảnh sản phẩm" name="imgfile">
                        <Dragger
                            span={12}
                            // name="file"
                            action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
                            onChange={onChangeImage}
                            onDrop={onDropImage}

                        >
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Chọn hoặc kéo thả hình ảnh</p>
                        </Dragger>
                    </Form.Item> */}
                </Col>

                <Col span={12}>
                    <Form.Item name="category_id" label="Danh mục sản phẩm">
                        <Cascader
                            placeholder="Chọn danh mục sản phẩm"
                            options={categories}
                            expandTrigger="hover"
                            displayRender={displayRender}
                            onChange={onChange}
                        />
                    </Form.Item>
                    <Form.Item name="cogs" label="Giá vốn hàng bán (Cost of goods sold)" >
                        <InputNumber addonAfter="VNĐ" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="price" label="Giá bán thực tế" >
                        <InputNumber addonAfter="VNĐ" style={{ width: '100%' }} />
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
                        Reset
                    </Button>
                    </Popconfirm>
                    <Button type="primary" htmlType="submit">
                        Next
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
        <Form.Item name="supplier_id" label="Nhà cung cấp" >
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
        </Form.Item>

        <Form.Item
            name="sku" label="SKU" span={12}
            tooltip="SKU(đơn vị phân loại hàng hóa tồn kho) là một dạng quy ước nhằm phân loại mặt hàng để bán, đó có thể là một sản phẩm hoặc dịch vụ, và kèm tất cả các thông số, thuộc tính liên quan với các loại item mà phân biệt nó với các loại mặt hàng khác. vd:4225-776-3234">
            <Input placeholder="sdx284x1ef4x1ef4..."/>
        </Form.Item>

        <Form.Item name="gtin" label="GTIN" span={12} tooltip="GTIN ( mã số sản phẩm thương mại toàn cầu ) còn được biết đến là mã vạch" >
            <Input placeholder="087..."/>
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
                    <Button htmlType="button" style={{ marginRight: '1rem' }}>Reset</Button>
                </Popconfirm>
                <Button type="primary" onClick={() => onKeyChange('1')} style={{ marginRight: '1rem' }} danger>
                    Back
                </Button>
                <Button type="primary" htmlType="submit" >
                    Next
                </Button>
            </Form.Item>
        </Affix>

      </Form>

    </>)
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
            material: keyID && item.product_description_detail ? item.product_description_detail.material : '',
            length: keyID && item.product_description_detail ? item.product_description_detail.length : '',
            width: keyID && item.product_description_detail ? item.product_description_detail.width : '',
            height: keyID && item.product_description_detail ? item.product_description_detail.height : '',
            age_group: keyID && item.product_description_detail ? item.product_description_detail.age_group : '',
            size: keyID && item.product_description_detail ? item.product_description_detail.size : '',
            size_type: keyID && item.product_description_detail ? item.product_description_detail.size_type : '',
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
                    mode="multiple"
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    placeholder="Chọn màu sắc sản phẩm"
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                            return (
                                <Option key={item.toString(36) + item}>{item.toString(36) + item}</Option>
                            )
                    })}
                </Select>
            </Form.Item>
            <Form.Item name="weight" label="Trọng lượng sau đóng gói (KG) " >
                <InputNumber placeholder='Nhập trọng lượng' addonAfter="KG" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="gender" label="Nhóm giới tính">
                <Select placeholder="Chọn nhóm giới tính">
                    <Select.Option value="male">Sản phẩm dành cho nam</Select.Option>
                    <Select.Option value="female">Sản phẩm dành cho nữ</Select.Option>
                    <Select.Option value="all">Tất cả</Select.Option>
                </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="material" label="Vật liệu sản phẩm">
              <Select
                showSearch
                placeholder="Nhập để tìm kiếm"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">Hữu cơ</Option>
                <Option value="2">Nhựa</Option>
                <Option value="3">Kim loại</Option>
                <Option value="4">Thủy tinh</Option>
                <Option value="5">Chất lỏng</Option>
              </Select>
            </Form.Item>
            <Form.Item name="origin" label="Xuất xứ">
              <Select placeholder="Xuất xứ sản phẩm">
                <Select.Option value="1">Việt Nam</Select.Option>
                <Select.Option value="2">Mỹ</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Kích thước sau đóng gói (dài x rộng x cao) "  >
              <Row gutter={[5, 16]} justify='between'>
                <Col span={8}>
                  <Form.Item name="length">
                    <InputNumber
                        addonAfter="Cm"
                        placeholder='Nhập chiều dài'
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="width">
                    <InputNumber
                        addonAfter="Cm"
                        placeholder='Nhập chiều rộng'
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="height">
                    <InputNumber
                        addonAfter="Cm"
                        placeholder='Nhập chiều cao'
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item name="size_type" label="Nhóm độ tuổi">
                <Select placeholder="Chọn nhóm độ tuổi">
                    <Select.Option value="newborn">Trẻ sơ sinh</Select.Option>
                    <Select.Option value="toddler">Trẻ mới biết đi</Select.Option>
                    <Select.Option value="kids">Trẻ em</Select.Option>
                    <Select.Option value="adult">Người lớn</Select.Option>
                    <Select.Option value="all">Tất cả</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="size" label="Size sản phẩm">
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
            </Form.Item>
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
                Reset
              </Button>
            </Popconfirm>
            <Button type="primary" onClick={() => onKeyChange('2')} style={{ marginRight: '1rem' }} danger>
                Back
            </Button>
            <Button type="primary" htmlType="submit" >
                Next
            </Button>
          </Form.Item>
        </Affix>
      </Form>
    </>)
  }

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
                <InputNumber style={{ width: '100%' }} />
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
                    Reset
                </Button>
                </Popconfirm>
                <Button type="primary" onClick={() => onKeyChange('3')} style={{ marginRight: '1rem' }} danger>
                    Back
                </Button>
                <Button type="primary" htmlType="submit" >
                    Save
                </Button>
            </Form.Item>
        </Affix>
      </Form>
    </>)
  }

  useEffect(function() {
    get_product_categories();
    if(mouted) {
        if((keyID !== '' || keyID !== '#') && keyID) {
            get_product_item(keyID);
        }
    }
  }, []);

  return (<>
        <Tabs
            defaultActiveKey="1"
            activeKey={activeKey}
            onChange={onChange}
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
