import React, { createRef, useState } from 'react';
import { Col, Row, Tabs, message, Affix, } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import {
  Form,
  Input,
  Button,
  Select,
  Cascader,
  Radio,
  InputNumber,
  Upload
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const ActionProduct = () => {
  const [activeTab2, setTab2Active] = useState(true)
  const [activeTab3, setTab3Active] = useState(true)
  const [activeTab4, setTab4Active] = useState(true)
  const formRef = createRef();

  const [activeKey, setActiveKey] = useState('1')
  const onKeyChange = (key) => setActiveKey(key)

  const onChange = (key) => {
    console.log(key);
  };

  const Tab1 = () => {

    const onChange = (key) => {
      console.log(key);
    };
    const categoryOptions = [
      {
        value: 'female',
        label: 'Thời trang nữ',
        children: [
          {
            value: 'shirt',
            label: 'Áo nữ',
            children: [
              {
                value: '1',
                label: 'Áo thun ',
              },
              {
                value: '2',
                label: 'Áo sơ mi',
              },
            ],
          },
        ],
      },
      {
        value: 'male',
        label: 'Thời trang nam',
        children: [
          {
            value: 'shirt',
            label: 'Áo nam',
            children: [
              {
                value: '1',
                label: 'Áo thun ',
              },
              {
                value: '2',
                label: 'Áo sơ mi',
              },
            ],
          },
        ],
      },
    ];
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
      console.log(values);
      setTab2Active(false);
      onKeyChange('2');
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
      >
        <Row gutter={[50, 5]}>
          <Col span={12}>
            <Form.Item name="name" label="Tên sản phẩm" >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>

            <Form.Item name="label" label="Thương hiệu">
              <Select
                showSearch
                placeholder="Chọn thương hiệu (chỗ này bỏ database vô nha)"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().includes(input)}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">Adidas</Option>
                <Option value="2">Nike</Option>
                <Option value="3">Puma</Option>
                <Option value="4">Jordan</Option>
                <Option value="5">New Balance</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Hình ảnh sản phẩm" name="imgfile">
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
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="category" label="Danh mục sản phẩm ">
              <Cascader
                placeholder="Chọn danh mục (chỗ này bỏ database vô nha)"
                options={categoryOptions}
                expandTrigger="hover"
                displayRender={displayRender}
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item name="origin" label="Xuất xứ">
              <Select
                showSearch
                placeholder='Chọn nơi xuất xứ... (chỗ này bỏ database vô nha)'
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().includes(input)}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }>
                <Select.Option value="1">Việt Nam</Select.Option>
                <Select.Option value="2">Hàn Quốc</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="price" label="Giá sản phẩm" >
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
            <Button type="primary" htmlType="submit" >
              Kế tiếp
            </Button>
          </Form.Item>
        </Affix>

      </Form>
    </>)
  }

  const Tab2 = () => {

    const onFinish = (values) => {
      console.log(values);
      setTab3Active(false);
      onKeyChange('3');
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

        <Form.Item name="sku" label="SKU" span={12} tooltip="SKU(đơn vị phân loại hàng hóa tồn kho) là một dạng quy ước nhằm phân loại mặt hàng để bán, đó có thể là một sản phẩm hoặc dịch vụ, và kèm tất cả các thông số, thuộc tính liên quan với các loại item mà phân biệt nó với các loại mặt hàng khác. vd:4225-776-3234">
          <Input placeholder="WW023xx..." />
        </Form.Item>

        <Form.Item name="gtin" label="GTIN" span={12} tooltip="GTIN ( mã số sản phẩm thương mại toàn cầu ) còn được biết đến là mã vạch" >
          <Input placeholder="087..." />
        </Form.Item>

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
            <Button type="primary" onClick={() => onKeyChange('1')} style={{ marginRight: '1rem' }} danger>
              Trở về
            </Button>
            <Button type="primary" htmlType="submit" >
              Kế tiếp
            </Button>
          </Form.Item>
        </Affix>

      </Form>

    </>)
  }

  const Tab3 = () => {
    const formRef = createRef();

    const onFinish = (values) => {
      console.log(values);
      setTab4Active(false);
      onKeyChange('4');
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
      >
        <Row gutter={[50, 5]}>
          <Col span={12}>
            <Form.Item name="material" label="Chất liệu">
              <Select
                showSearch
                placeholder="Nhập để tìm kiếm"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="cotton">Cotton</Option>
                <Option value="jeans">Jeans</Option>
                <Option value="kaki">Kaki</Option>
                <Option value="ren">Ren</Option>
                <Option value="draft">Thô</Option>
              </Select>
            </Form.Item>

            <Form.Item name="model" label="Model" tooltip="Mã gồm 1 loạt các kí tự gồm chữ và số, vd: Vostro 430 là model của máy tính Dell Vostro 430">
              <Input placeholder="Nhập model ... " />
            </Form.Item>

            <Form.Item name="weight" label="Trọng lượng sau đóng gói (kg) " >
              <InputNumber placeholder='Nhập trọng lượng' addonAfter="kg" style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="pattern" label="Họa tiết">
              <Select
                showSearch
                placeholder="Nhập để tìm kiếm"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">Ca-rô</Option>
                <Option value="2">Chấm bi</Option>
                <Option value="3">Kẻ sọc</Option>
                <Option value="4">Hoa lá</Option>
                <Option value="5">Trơn</Option>
              </Select>
            </Form.Item>

            <Form.Item name="origin" label="Xuất xứ">
              <Select placeholder='chỗ này bỏ database Xuất xứ nha'>
                <Select.Option value="1">Việt Nam</Select.Option>
                <Select.Option value="2">Mỹ</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="size" label="Kích thước sau đóng gói (dài x rộng x cao) "  >
              <Row gutter={[5, 16]} justify='between'>
                <Col span={8}>
                  <Form.Item name="length" >
                    <InputNumber addonAfter="cm" placeholder='Nhập chiều dài' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item name="width" >
                    <InputNumber addonAfter="cm" placeholder='Nhập chiều rộng' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item name="height" >
                    <InputNumber addonAfter="cm" placeholder='Nhập chiều cao' />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Mô tả">
          <TextArea rows={5} />
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
            <Button type="primary" onClick={() => onKeyChange('2')} style={{ marginRight: '1rem' }} danger>
              Trở về
            </Button>
            <Button type="primary" htmlType="submit" >
              Kế tiếp
            </Button>
          </Form.Item>
        </Affix>
      </Form>
    </>)
  }

  const Tab4 = () => {
    const formRef = createRef();

    const onFinish = (values) => {
      console.log(values);
      setTab4Active(false);
      onKeyChange('4');
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
      >
        <Row gutter={[50, 5]}>
          <Col span={12}>
            <Form.Item name="quantity" label="Số lượng hàng hóa" >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: '' }]}
            >
              <Radio.Group>
                <Radio value="1">Trạng thái 1: Hết hàng</Radio>
                <Radio value="2">Trạng thái 2: Còn hàng</Radio>
                <Radio value="3">Trạng thái 3: ...</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Mô tả">
          <TextArea rows={5} />
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
            <Button type="primary" onClick={() => onKeyChange('3')} style={{ marginRight: '1rem' }} danger>
              Trở về
            </Button>
            <Button type="primary" htmlType="submit" >
              Xuất sản phẩm mới
            </Button>
          </Form.Item>
        </Affix>
      </Form>
    </>)
  }

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
        },
        {
          label: `Nhà cung cấp sản phẩm`,
          key: '2',
          children: <Tab2 />,
          disabled: activeTab2,
        },
        {
          label: `Thông tin chi tiết`,
          key: '3',
          children: <Tab3 />,
          disabled: activeTab3,
        },
        {
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