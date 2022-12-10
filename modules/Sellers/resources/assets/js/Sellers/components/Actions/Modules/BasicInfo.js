import React, { useState, useContext, useEffect } from 'react';
import { SellersContext } from '../../Contexts/SellersContext';
import { Button, Card, Col, Form, Input, Row, Switch, Upload, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Helper from '../../Helper/Helper';
const { Dragger } = Upload;
const { Option } = Select;

const BasicInfo = ({fileList, setFileList, generatePassword, disabled}) => {
    const { data } = useContext(SellersContext);
    const { config } = data;
    const { users_type, roles, account_type, user } = config;
    const [disabledField, setDisabledField] = useState([]);

    /**
     * @author : <vanhau.vo@urekamedia.vn>
     * @todo:
     * @link https://github.com/react-component/upload#customrequest
     * @return {string}
     */
    const normFile = (info) => {
        let { file } = info;
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            Helper.Notification('error', '[Upload]', 'File size must smaller than 5MB!');
        } else {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            setFileList(fileList);
            return info && fileList;
        }
    };

    /**
     * @author : <vanhau.vo@urekamedia.vn>
     * @todo: Override for the default xhr behavior allowing for additional customization and ability to implement your own XMLHttpRequest
     * @link https://github.com/react-component/upload#customrequest
     * @return {string}
     */
    const dummyRequest = ({ file, filename, data, onProgress, onSuccess, onError, withCredentials, action, headers }) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    /**
     * @author : <vanhau.vo@urekamedia.vn>
     * @todo: call function to generate new password
     * @return {string}
     */
    const generate_password = () => {
        generatePassword();
    }

    useEffect(() => {
        setDisabledField(false);
        if(user.is_admin === 0 && user.type !== 2 && user.role_id !== 6){
            setDisabledField(true); // Controller Permission
        }
    }, [user]);

    return(
        <>
            <Row gutter={[16, 16]}>
                <Col sm={12}>
                    <Card size='small' title='Basic Info' bordered={false} headStyle={{ color: '#1890ff' }}>
                        <Form.Item
                            label='Name'
                            name='name'
                            style={{ marginBottom: 8 }}
                            rules={[
                                { required: true, message: 'Please input name!' }
                            ]}
                        >
                            <Input placeholder='Please input name!' />
                        </Form.Item>
                        <Form.Item
                            label='User Name'
                            name='username'
                            style={{ marginBottom: 8 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input user name!'
                                }
                            ]}
                        >
                            <Input placeholder='Please input user name!' disabled={disabledField}/>
                        </Form.Item>
                        <Form.Item
                            label='Email'
                            name='email'
                            style={{ marginBottom: 8 }}
                            rules={[
                                {type: 'email', message: 'The input is not valid E-mail!'},
                                { required: true, message: 'Please input email!' }
                            ]}
                        >
                            <Input placeholder='Please input email!' disabled={disabled}/>
                        </Form.Item>
                        <Form.Item
                            label='Password'
                            style={{ marginBottom: 8}}
                        >
                            <Input.Group compact>
                                <Form.Item
                                    name='password'
                                    style={{ marginBottom: 0, width: 'calc(100% - 100px)' }}
                                    rules={[{required: !disabled, message: 'Please input password!'}]}
                                >
                                    <Input.Password placeholder='Please input password!'/>
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: 0, width: '100px' }}
                                >
                                    <Button
                                        style={{display: 'block', width:'100%'}}
                                        type='primary'
                                        onClick={() => generate_password()}
                                    >
                                        Generate
                                    </Button>
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                        <Form.Item
                            label='Status'
                            name='status'
                            valuePropName='checked'
                            style={{ marginBottom: 0 }}
                        >
                            <Switch disabled={disabledField}/>
                        </Form.Item>
                    </Card>
                </Col>
                <Col sm={12}>
                    <Card size='small' title='User settings' bordered={false} headStyle={{ color: '#1890ff' }}>
                        <Form.Item
                            label='Role'
                            name='role_id'
                            style={{ marginBottom: 8 }}
                            rules={[{ required: true, message: 'Required!' }]}
                        >
                            <Select
                                showSearch
                                optionFilterProp='children'
                                placeholder='Please choose Role!'
                                disabled={disabledField}
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
                            label='Type Users'
                            name='is_publisher'
                            style={{ marginBottom: 8 }}
                            rules={[{ required: true, message: 'Required!' }]}
                        >
                            <Select
                                optionFilterProp='children'
                                placeholder='Please choose Type Users!'
                                disabled={disabledField}
                            >
                                {account_type && account_type.map(item => (
                                    <Option key={item.value} value={item.value}>
                                        {item.text}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="User's type"
                            name='type'
                            style={{ marginBottom: 8 }}
                            rules={[
                                { required: true, message: 'Required!' }
                            ]}
                        >
                            <Select
                                showSearch
                                optionFilterProp='children'
                                placeholder="Please choose User's type!"
                                disabled={disabledField}
                            >
                                {users_type && users_type.map(item => (
                                    <Option key={item.value} value={item.value}>
                                        {item.text}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        {/* <Form.Item
                            label='CC Mails'
                            name='cc_mails'
                            style={{ marginBottom: 8 }}
                            extra='use ',' between mails.'
                        >
                            <Input
                                placeholder='Please input email!'
                                disabled={disabledfield}
                            />
                        </Form.Item> */}
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col sm={12}>
                    <Card size='small' title='Avatar' bordered={false} headStyle={{ color: '#1890ff' }}>
                        <Form.Item
                            name='avatar'
                            valuePropName='file'
                            getValueFromEvent={normFile} // Specify how to get value from event or other onChange arguments
                        >
                            <Dragger
                                accept='image/*'
                                fileList={fileList}
                                customRequest={dummyRequest}
                                listType='picture'
                            >
                                <p className='ant-upload-drag-icon'>
                                    <InboxOutlined />
                                </p>
                                <p className='ant-upload-text'>
                                    Click or drag file to this area
                                </p>
                                <p className='ant-upload-hint'>
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
