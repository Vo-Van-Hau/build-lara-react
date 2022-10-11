import React, { createRef, useState } from 'react';
import { Tabs, message } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';

import {
  Form,
  Input,
  Button,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  Upload
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const ActionProduct = () => {
  const [activeTab2, setTab2Active] = useState(true)
  const [activeTab3, setTab3Active] = useState(true)
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

    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
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
      console.log(values);
      setTab2Active(false);
      onKeyChange('2');
    };

    const onReset = () => {
      formRef.current.resetFields();
    };
    return (<>
      <Form
        labelCol={{ span: 3 }}
        labelAlign={'left'}
        ref={formRef}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
      >

        <Form.Item name="name" label="Tên sản phẩm" >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item name="price" label="Giá sản phẩm" >
          <InputNumber addonAfter="VNĐ" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Hình ảnh sản phẩm" name="imgfile">
          <Dragger
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

        <Form.Item name="category" label="Danh mục sản phẩm">
          <Cascader
            placeholder="Chọn danh mục"
            options={categoryOptions}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item name="label" label="Nhãn hiệu">
          <Select
            showSearch
            style={{ width: 200, }}
            placeholder="Chọn nhãn hiệu"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
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

        <Form.Item name="origin" label="Xuất xứ">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="description" label="Mô tả sản phẩm">
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>)
  }

  const Tab2 = () => {
    const onChange = (key) => {
      console.log(key);
      setTab3Active(false)
    };

    const options = [
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

    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values) => {
      console.log(values);
    };
    const onReset = () => {
      formRef.current.resetFields();
    };

    const displayRender = (labels) => labels[labels.length - 1];

    return (<>
      <Form
        labelCol={{ span: 3 }}
        labelAlign={'left'}
        ref={formRef}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
      >

        <Form.Item name="name" label="Tên sản phẩm" >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item name="category" label="Danh mục sản phẩm">
          <Cascader
            placeholder="Chọn danh mục"
            options={options}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item name="label" label="Nhãn hiệu">
          <Select
            showSearch
            style={{ width: 200, }}
            placeholder="Chọn nhãn hiệu"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
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

        <Form.Item name="from" label="Xuất xứ">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="description" label="Mô tả sản phẩm">
          <TextArea rows={5} />
        </Form.Item>


        <Form.Item {...tailLayout}>
          <Button type="primary" danger onClick={() => onKeyChange('1')}>
            Trở về Tab 1
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>


      </Form>
    </>)
  }

  const Tab3 = () => {
    const formRef = createRef();
    const onChange = (key) => {
      console.log(key);
    };

    const options = [
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

    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values) => {
      console.log(values);
    };
    const onReset = () => {
      formRef.current.resetFields();
    };

    const displayRender = (labels) => labels[labels.length - 1];



    return (<>

      <Form
        labelCol={{ span: 4 }}
        ref={formRef}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
      >

        <Form.Item name="name" label="Tên sản phẩm" >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item name="section" label="Danh mục sản phẩm">
          <Cascader
            placeholder="Chọn danh mục"
            options={options}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item label="Nhãn hiệu">
          <Select
            showSearch
            style={{ width: 200, }}
            placeholder="Chọn nhãn hiệu"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
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

        <Form.Item label="Xuất xứ">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mô tả sản phẩm">
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item label="Hình ảnh sản phẩm" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>


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
          label: `Tab 1`,
          key: '1',
          children: <Tab1 />,
        },
        {
          label: `Tab 2`,
          key: '2',
          children: <Tab2 />,
          disabled: activeTab2,
        },
        {
          label: `Tab 3`,
          key: '3',
          children: <Tab3 />,
          disabled: activeTab3,
        },
      ]}
    />

  </>)
}

export default ActionProduct;