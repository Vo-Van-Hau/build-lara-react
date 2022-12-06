import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import {
    Form, Input, Button, Row, Space, Col, Select, Typography, Image, Avatar
} from 'antd';
import {
    UserOutlined, LockOutlined, InfoCircleOutlined, LeftOutlined
} from '@ant-design/icons';
import Helper from '../../helpers/helper';
const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const Register = ({ history, ...props }) => {

    const { change_page } = props;
    const { register, data, get_product_categories } = useContext(AuthContext);
    const navigate = useNavigate();
    const { mouted, product_categories } = data;
    const [form] = Form.useForm();
    const [error, setError] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [hiddenStepInput, setHiddenStepInput] = useState({
        step1: false,
        step2: true,
    });

    const languageSelect = [
        { id: 1, lang: 'vi', value: 'Tiếng Việt', iconImg: 'https://icons.iconarchive.com/icons/wikipedia/flags/512/VN-Vietnam-Flag-icon.png' },
        { id: 2, lang: 'en', value: 'Tiếng Anh', iconImg: 'https://icons.iconarchive.com/icons/wikipedia/flags/1024/GB-United-Kingdom-Flag-icon.png' },
    ];

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo: register sellers account
     * @param {Object} values
     * @return {void}
     */
    const onFinish =  async (values) => {
        setError(null);
        setLoadingStatus(true);
        let data = await register(values);
        setLoadingStatus(false);
        if(data.error !== null) {
            setError(data.error);
        }
        if(data.redirect_to) {
            Helper.Notification('success', '[Đăng ký nhà bán hàng]', 'Đăng ký tài khoản thành công, đăng nhập ngay để bán hàng !');
            return navigate('/sellers/auth/login');
        }
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo
     * @param
     * @return
     */
    const changeStepInput = (type = 'step2') => {
        if(type === 'step2') {
            setHiddenStepInput({
                ...hiddenStepInput,
                step1: true,
                step2: false,
            });
        } else if(type === 'step1') {
            setHiddenStepInput({
                ...hiddenStepInput,
                step1: false,
                step2: true,
            });
        }
    }

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo
     * @param
     * @returns {void}
     */
    const RegisterForm = () => {

        const languageSelect = [
            { id: 1, lang: 'vi', value: 'VietNam', phonePrefix: '+84', phonePreVal: 84, iconImg: 'https://icons.iconarchive.com/icons/wikipedia/flags/512/VN-Vietnam-Flag-icon.png' },
            { id: 2, lang: 'en', value: 'English', phonePrefix: '+65', phonePreVal: 65, iconImg: 'https://icons.iconarchive.com/icons/wikipedia/flags/1024/GB-United-Kingdom-Flag-icon.png' },
        ]

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

        const validateMessages = {
            required: "'${name}' is required!",
        };

        return (
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    country: 'vi',
                    prefix: 84,
                    category_id: 0,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    label="Họ tên của bạn"
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
                    hidden={hiddenStepInput.step1}
                >
                    <Input placeholder="Nhập tên của bạn..." />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Enter your phone number!' }]}
                    hidden={hiddenStepInput.step1}
                >
                    <Input addonBefore={prefixSelector} placeholder="Nhập số điện thoại..." style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ Email"
                    tooltip={{
                        title: 'Hãy điền Email của bạn',
                        icon: <InfoCircleOutlined />,
                    }}
                    name="email"
                    rules={[{ required: true }]}
                    required
                    hidden={hiddenStepInput.step1}
                >
                    <Input placeholder="Nhập Email..." />
                </Form.Item>
                <Form.Item
                    label="Quốc gia"
                    name='country'
                    required
                    tooltip={{
                        title: `The country where your business registration and your main warehouse are located.`,
                        icon: <InfoCircleOutlined />,
                    }}
                    hidden={hiddenStepInput.step1}
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
                    label="Loại hàng đăng ký"
                    name='category_id'
                    required
                    tooltip={{
                        title: `Based on the main product category selected, We will assign a specialized support agent to assist you better in the future.`,
                        icon: <InfoCircleOutlined />,
                    }}
                    hidden={hiddenStepInput.step1}
                >
                    <Select
                        onChange={handleChange}
                    >
                        <Option key={0} value={0}>Chọn loại hàng đăng ký</Option>
                        {product_categories && product_categories.map((item) => (
                                <Option key={item.value} value={item.value}>{item.label}</Option>
                         ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Tên tài khoản"
                    name="username"
                    required
                    tooltip={{
                        title: `Make sure you follow our rigid rules about full name to get your profile approved:
                                - Do not input a company name, store name or nickname.
                                - Enter full name as written on your Identity document.
                                - Capitalize the first letter of each word.`,
                        icon: <InfoCircleOutlined />,
                    }}
                    rules={[{ required: true, }]}
                    hidden={hiddenStepInput.step1}
                >
                    <Input placeholder="Nhập tên tài khoản" />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    tooltip={{
                        title: 'Password must contain at least 6 characters, not contains any spaces and must have either numbers or symbols.',
                        icon: <InfoCircleOutlined />,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Không để trống mật khẩu!',
                        },
                    ]}
                    required
                    hidden={hiddenStepInput.step1}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmpassword"
                    label="Nhập lại mật khẩu"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Không để trống mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                            },
                        }),
                    ]}
                    hidden={hiddenStepInput.step1}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                     hidden={hiddenStepInput.step1}
                >
                    {/* <Button type="primary" htmlType='submit' block size="large">Đăng ký ngay!</Button> */}
                    <Button type="primary" block size="large" onClick={() => changeStepInput('step2')}>TIẾP TỤC</Button>
                </Form.Item>

                {/* --------------------------------------Step 2-------------------------------------- */}
                <Form.Item
                    label="Tên cửa hàng"
                    name="store_name"
                    required
                    tooltip={{
                        title: `Make sure you follow our rigid rules about full name to get your profile approved:
                                - Do not input a company name, store name or nickname.
                                - Enter full name as written on your Identity document.
                                - Capitalize the first letter of each word.`,
                        icon: <InfoCircleOutlined />,
                    }}
                    rules={[{ required: true, }]}
                    hidden={hiddenStepInput.step2}
                >
                    <Input placeholder="Nhập tên cửa hàng" />
                </Form.Item>
                <Form.Item
                    name="store_description"
                    label="Mô tả về cửa hàng"
                    rules={[{ required: true, message: 'Enter your store description' }]}
                    hidden={hiddenStepInput.step2}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Space style={{width: '100%' }}>
                    <Form.Item
                        hidden={hiddenStepInput.step2}
                    >
                        <Button onClick={() => changeStepInput('step1')} size="large" icon={<LeftOutlined />}>Trở lại</Button>
                    </Form.Item>
                    <Form.Item
                        hidden={hiddenStepInput.step2}
                        style={{width: '100%' }}
                    >
                        <Button type="primary" htmlType='submit' block size="large">ĐĂNG KÝ NGAY</Button>
                    </Form.Item>
                </Space>
            </Form>
        );
    }

    /**
     * @return {void}
     */
    const InformationFooter = () => {
        return (<>
            <Row className='information_footer'>
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
            </Row>
        </>)
    }

    useEffect(function () {
        form.setFieldsValue({
            remember: false
        });
        if(mouted) {
            get_product_categories(1, {});
        }
    }, []);

    return (
        <>
            <Row style={{paddingTop: 48, paddingBottom: 48}}>
                <Col span={2}></Col>
                <Col span={20}>
                    <div>
                        <Row className='register_seller_container'>
                            <Col className='leftRegister' span={12}>
                                {/* <Select
                                    defaultValue="vi"
                                    onChange={handleChange}
                                >   {
                                        languageSelect && languageSelect.map((langOption, index) => (
                                            <Option key={langOption.id} value={langOption.lang}> <img alt='icon' src={langOption.iconImg} height={24} /> {langOption.value}</Option>
                                        ))
                                    }
                                </Select> */}
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
                        <InformationFooter />
                    </div>
                </Col>
                <Col span={2}></Col>
            </Row>
        </>
    );
};

export default Register;
