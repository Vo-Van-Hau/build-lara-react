import React, { useState, useContext, useEffect } from 'react';
import { UsersContext } from '../../Contexts/UsersContext';
import { Button, Card, Col, Form, Input, Row, Switch, Upload, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Helper from '../../Helper/helper';
const { Dragger } = Upload;
const { Option } = Select;

const BasicInfo = ({fileList, setFileList, genPassword, disabled }) => {
    const { data, setRouter } = useContext(UsersContext);
    const { config } = data;
    const { users_type, currencies, pub_field, exclude_fields, roles, account_type, user } = config;
    const [disabledfield, setDisabledfield] = useState([]);

    useEffect(() => {
        setDisabledfield(false);
        if(user.is_admin === 0 && user.type !== 2 && user.role_id !== 6){
            setDisabledfield(true);
        }
    }, [user]);
    const normFile = info => {
        let { file } = info;
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            Helper.Noti(
                "error",
                "[Upload]",
                "File size must smaller than 5MB!"
            );
        } else {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            setFileList(fileList);
            return info && fileList;
        }
    };
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const generate = () => {
        genPassword();
    }

    return(
        <>
            <Row gutter={[16, 16]}>
                <Col sm={12}>
                    <Card size="small" title="Basic Info" bordered={false} headStyle={{ color: "#1890ff" }}>
                        <Form.Item
                            label="Name"
                            name="name"
                            style={{ marginBottom: 8 }}
                            rules={[
                                { required: true, message: "Please input name!" }
                            ]}
                        >
                            <Input placeholder="Please input name!" />
                        </Form.Item>
                        <Form.Item
                            label="User Name"
                            name="username"
                            style={{ marginBottom: 8 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input user name!"
                                }
                            ]}
                        >
                            <Input placeholder="Please input user name!" disabled={disabledfield}/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            style={{ marginBottom: 8 }}
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!"
                                },
                                { required: true, message: "Please input email!" }
                            ]}
                        >
                            <Input placeholder="Please input email!" disabled={disabled} />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="passwordPC"
                            style={{ marginBottom: 8}}
                        >
                            <Input.Group compact>
                                <Form.Item
                                    name="password"
                                    style={{ marginBottom: 0, width: 'calc(100% - 100px)' }}
                                    rules={[
                                        {
                                            required: !disabled,
                                            message: "Please input password!"
                                        }
                                    ]}
                                >
                                    <Input.Password placeholder="Please input password!"/>
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: 0, width: '100px' }}
                                >
                                    <Button 
                                        style={{display: "block", width:"100%"}} 
                                        type="primary"
                                        onClick={() => generate()}
                                    >
                                        Generate
                                    </Button>
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="status"
                            valuePropName="checked"
                            style={{ marginBottom: 0 }}
                        >
                            <Switch disabled={disabledfield}/>
                        </Form.Item>
                    </Card>
                </Col>
                <Col sm={12}>
                    <Card size="small" title="User settings" bordered={false} headStyle={{ color: "#1890ff" }}>
                        <Form.Item
                            label="Role"
                            name="role_id"
                            style={{ marginBottom: 8 }}
                            rules={[
                                { required: true, message: "Required!" }
                            ]}
                        >
                            <Select
                                showSearch
                                optionFilterProp="children"
                                placeholder="Please choose Role!"
                                disabled={disabledfield}
                            >
                                <Option key={0} value={0}>Default</Option>
                                {roles && roles.map(item => (
                                    <Option key={item.value} value={item.value}>
                                        {item.text}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Type Users"
                            name="is_publisher"
                            style={{ marginBottom: 8 }}
                            rules={[
                                { required: true, message: "Required!" }
                            ]}
                        >
                            <Select
                                optionFilterProp="children"
                                placeholder="Please choose Type Users!"
                                disabled={disabledfield}
                            >
                                {/* {account_type && account_type.map(item => (
                                    <Option key={item.value} value={item.value}>
                                        {item.text}
                                    </Option>
                                ))} */}
                                <Select.Option value={0}>Internal</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="User's type"
                            name="type"
                            style={{ marginBottom: 8 }}
                            rules={[
                                { required: true, message: "Required!" }
                            ]}
                        >
                            <Select
                                showSearch
                                optionFilterProp="children"
                                placeholder="Please choose User's type!"
                                disabled={disabledfield}
                            >
                                {users_type && users_type.map(item => (
                                    <Option key={item.value} value={item.value}>
                                        {item.text}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        {/* <Form.Item
                            label="CC Mails"
                            name="cc_mails"
                            style={{ marginBottom: 8 }}
                            extra="use ',' between mails."
                        >
                            <Input
                                placeholder="Please input email!"
                                disabled={disabledfield}
                            />
                        </Form.Item> */}
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col sm={12}>
                    <Card size="small" title="Avatar" bordered={false} headStyle={{ color: "#1890ff" }}>
                        <Form.Item
                            name="avatar"
                            valuePropName="file"
                            getValueFromEvent={normFile}
                        >
                            <Dragger
                                accept="image/*"
                                fileList={fileList}
                                customRequest={dummyRequest}
                                listType="picture"
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area
                                </p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload.<br />Strictly
                                    prohibit from uploading company data or other
                                    band files
                                </p>
                            </Dragger>
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default BasicInfo;
