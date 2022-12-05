import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Form, Input, Button, Row, Spin,Col, Select, Typography, Image,Avatar  } from 'antd';
import { UserOutlined, LockOutlined,InfoCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

const Register = ({ history, ...props }) => {

    const { login } = useContext(AuthContext);
    const { change_page } = props;
    const [error, setError] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [form] = Form.useForm();

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: authentication
     * @param {Object} values
     * @return {void}
     */
    const onFinish = async (values) => {
        setError(null);
        setLoadingStatus(true);
        let data = await login(values);
        setLoadingStatus(false);
        if (data.error !== null) {
            setError(data.error);
        }
        if (data.redirect_to) {
            window.location.replace(data.redirect_to);
        }
    };

    const onFinishFailed = errors => { };

    /** MỚI ADD */
    const languageSelect = [
        { id: 1, lang: 'vi', value: 'Tiếng Việt', iconImg: 'https://icons.iconarchive.com/icons/wikipedia/flags/512/VN-Vietnam-Flag-icon.png' },
        { id: 2, lang: 'en', value: 'Tiếng Anh', iconImg: 'https://icons.iconarchive.com/icons/wikipedia/flags/1024/GB-United-Kingdom-Flag-icon.png' },
    ]
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const RegisterForm = () => {
        const [form] = Form.useForm();

        const languageSelect = [
            { id: 1, lang: 'vi', value: 'VietNam', phonePrefix: '+84', phonePreVal: 84, iconImg: 'https://icons.iconarchive.com/icons/wikipedia/flags/512/VN-Vietnam-Flag-icon.png' },
            { id: 2, lang: 'en', value: 'English', phonePrefix: '+65', phonePreVal: 65, iconImg: 'https://icons.iconarchive.com/icons/wikipedia/flags/1024/GB-United-Kingdom-Flag-icon.png' },
        ]
        const sellingCategories = [
            { id: 0, name: 'Select selling category' },
            { id: 1, name: 'Thịt, Rau Củ' },
            { id: 2, name: 'Bách Hóa' },
            { id: 3, name: 'Nhà Cửa' },
            { id: 4, name: 'Điện Tử' },
            { id: 5, name: 'Thiết Bị Số' },
        ]

        const handleChange = (value) => {
            console.log(`selected ${value}`);
        };

        const onFinish = (e) => {
            console.log(e);
            console.log('Submited')
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };


        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select>
                    {
                        languageSelect && languageSelect.map((langOption) => (
                            <Option key={langOption.id} value={langOption.phonePreVal}> <img alt='icon' src={langOption.iconImg} height={24} /> {langOption.phonePrefix}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
        );

        return (
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    country: 'vi',
                    prefix: 84,
                    sellCategory: 0,
                }}
            >
                <Form.Item
                    label="Email Address"
                    tooltip={{
                        title: 'Please enter your most frequently used email address to make sure you don’t miss any important notices from us.',
                        icon: <InfoCircleOutlined />,
                    }}
                    name="email"
                    rules={[{ required: true }]}
                    required
                >
                    <Input placeholder="Enter email address" />
                </Form.Item>
                <Form.Item
                    label="Fullname"
                    name="fullname"
                    required
                    tooltip={{
                        title: `Make sure you follow our rigid rules about full name to get your profile approved:
                                - Do not input a company name, store name or nickname.
                                - Enter full name as written on your Identity document.
                                - Capitalize the first letter of each word.`,
                        icon: <InfoCircleOutlined />,
                    }}
                    rules={[{ required: true, }]}
                >
                    <Input placeholder="Enter fullname" />
                </Form.Item>
                <Form.Item
                    name="phonenumber"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Enter your phone number!' }]}
                >
                    <Input addonBefore={prefixSelector} placeholder="Enter your phone number" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Country"
                    name='country'
                    required
                    tooltip={{
                        title: `The country where your business registration and your main warehouse are located.`,
                        icon: <InfoCircleOutlined />,
                    }}
                >
                    <Select
                        name="country"
                        onChange={handleChange}
                    >   {
                            languageSelect && languageSelect.map((langOption, index) => (
                                <Option key={langOption.id} value={langOption.lang}> <img alt='icon' src={langOption.iconImg} height={24} /> {langOption.value}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Main selling category"
                    name='sellCategory'
                    required
                    tooltip={{
                        title: `Based on the main product category selected, We will assign a specialized support agent to assist you better in the future.`,
                        icon: <InfoCircleOutlined />,
                    }}
                >
                    <Select
                        onChange={handleChange}
                    >   {
                            sellingCategories && sellingCategories.map((sellItem) => (
                                <Option key={sellItem.id} value={sellItem.id}> {sellItem.name}</Option>
                            ))
                        }
                    </Select>

                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    tooltip={{
                        title: 'Password must contain at least 6 characters, not contains any spaces and must have either numbers or symbols.',
                        icon: <InfoCircleOutlined />,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    required
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmpassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit' block >Register</Button>
                </Form.Item>
            </Form>
        );
    }
    const InformationFooter = () => {
        return (<>
            <Col span={8}>
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<img src='https://salt.tikicdn.com/ts/user/fa/31/98/4274d22438e2359f0ff7de1afe2fcf5a.png' alt='section-img' />}
                />
                <Title level={4}>The most trusted E-commerce platform in Vietnam</Title>
                <p>Tiki’s mission is to improve the experience of both customers and sellers. We are well-known for our 100% authentic, original products and excellent customer satisfaction rate of 95%, making us the most trusted E-commerce platform in Vietnam.</p>
            </Col>
            <Col span={8}>
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<img src='https://salt.tikicdn.com/ts/user/77/10/04/4c528effdbb6f98b15a1536f43a3cf27.png' alt='section-img' />}
                />
                <Title level={4}>The most trusted E-commerce platform in Vietnam</Title>
                <p>Tiki’s mission is to improve the experience of both customers and sellers. We are well-known for our 100% authentic, original products and excellent customer satisfaction rate of 95%, making us the most trusted E-commerce platform in Vietnam.</p>
            </Col>
            <Col span={8}>
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<img src='https://salt.tikicdn.com/ts/user/b1/06/31/058c5bd5233f3c5558424ba3e371f558.png' alt='section-img' />}
                />
                <Title level={4}>The most trusted E-commerce platform in Vietnam</Title>
                <p>Tiki’s mission is to improve the experience of both customers and sellers. We are well-known for our 100% authentic, original products and excellent customer satisfaction rate of 95%, making us the most trusted E-commerce platform in Vietnam.</p>
            </Col>

        </>)
    }




    useEffect(function () {
        form.setFieldsValue({
            remember: false
        });
    }, []);

    return (
        <>
            <Form name='basic'
                initialValues={{
                    remember: false
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Form.Item name='email' rules={[{ required: true }]}>
                    <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
                </Form.Item>
                <Form.Item name='password' rules={[{ required: true }]}>
                    <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} placeholder='Password' />
                </Form.Item>
                <Row justify='center'>
                    <Form.Item>
                        {
                            loadingStatus == true ? (
                                <div style={{ textAlign: 'center' }}>
                                    <Spin size='large' />
                                </div>
                            ) : (
                                <Button className='btn-login-custom' type='primary' htmlType='submit' style={{ width: '100%' }}>
                                    Login
                                </Button>
                            )}
                    </Form.Item>
                </Row>
            </Form>

            <Row className='register_seller_container'>
                <Col className='leftRegister' span={12}>
                    <Select
                        defaultValue="vi"
                        onChange={handleChange}
                    >   {
                            languageSelect && languageSelect.map((langOption, index) => (
                                <Option key={langOption.id} value={langOption.lang}> <img alt='icon' src={langOption.iconImg} height={24} /> {langOption.value}</Option>
                            ))
                        }
                    </Select>

                    <Title level={2}>Đăng ký gian hàng cùng <img src='https://www.freeiconspng.com/uploads/no-image-icon-13.png' height={43} alt='logo' /></Title>
                    <Title level={5}> Tiếp cận hơn 22 triệu lượt truy cập mỗi tháng! </Title>
                    <Image preview={false}
                        style={{ objectFit: 'contain', borderRadius: '3px' }}
                        src={'https://m2tech.buyit.vn/wp-content/uploads/2021/09/Customer-Service.jpg'}
                        width={'100%'}
                    />

                </Col>

                <Col className='rightRegister' span={12}>
                    <Title level={2}>Đăng ký ngay</Title>
                    <RegisterForm />
                </Col>
            </Row>

            <Row className='information_footer' gutter={[24]}>
                <InformationFooter />
            </Row>

        </>
    );
};

export default Register;
