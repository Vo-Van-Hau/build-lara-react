import { Layout } from 'antd';
import { Col, Row } from 'antd';
import { Avatar, Image, Space, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterSection = (props) => {

    const { data, navigate, setRouter, searchParams } = props;
    const { user, config } = data;
    const { is_login } = user;
    const { app } = config;
    const { baseURL, adminPrefix } = app;

    return (
        <footer className='footer_wrap_container'>
        <Row className='footer_container' >
            <Col className='footer_section' flex={1}>
                <Title level={5}>Hỗ trợ khách hàng</Title>
                <Space direction="vertical">
                    <Link to="#" target="_blank"> Câu hỏi thường gặp </Link>
                    <Link to="#" target="_blank"> Gửi yêu cầu hỗ trợ </Link>
                    <Link to="#" target="_blank"> Hướng dẫn đặt hàng </Link>
                    <Link to="#" target="_blank"> Phương thức vận chuyển </Link>
                    <Link to="#" target="_blank"> Chính sách đổi trả </Link>
                    <Link to="#" target="_blank"> Hỗ trợ khách hàng </Link>
                </Space>
            </Col>
            <Col className='footer_section' flex={1}>
                <Title level={5}>Về MS Mall</Title>
                <Space direction="vertical">
                    <Link to="#" target="_blank"> Giới thiệu </Link>
                    <Link to="#" target="_blank"> Chính sách bảo mật thanh toán </Link>
                    <Link to="#" target="_blank"> Chính sách bảo mật thông tin </Link>
                    <Link to="#" target="_blank"> Chính sách giải quyết khiếu nại </Link>
                    <Link to="#" target="_blank"> Bán hàng doanh nghiệp </Link>
                    <Link to="#" target="_blank"> Điều kiện vận chuyển </Link>
                </Space>
            </Col>
            <Col className='footer_section' flex={1}>
                <Title level={5}>Hợp tác và liên kết</Title>
                <Space direction="vertical">
                    <Link to="#" target="_blank"> Quy chế hoạt động sàn MS </Link>
                    <Link to="#" target="_blank"> Bán hàng cùng MS </Link>
                    <Title level={5}>Chứng nhận bởi </Title>
                    <Link to="#" target="_blank">
                        <Image preview={false} src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg" />
                    </Link>
                </Space>

            </Col>
            <Col className='footer_section' flex={1}>
                <Title level={5}>Phương thức thanh toán </Title>
                <Row className='payment' gutter={[5, 15]} wrap>
                    <Col className='icon' >
                        <Avatar className='payment_visa' size={34} src={`${baseURL}/images/payment_cash.png`} alt='payment_cash'/>
                    </Col>
                    <Col className='icon' >
                        <Avatar className='payment_visa' size={34} src={`${baseURL}/images/payment_visa.png`} alt='payment_visa'/>
                    </Col>
                    <Col className='icon' >
                        <Avatar className='payment_mastercard' size={34} src={`${baseURL}/images/payment_mastercard.png`} alt='payment_mastercard'/>
                    </Col>
                    <Col className='icon' >
                        <Avatar className='payment_momo' size={34} src={`${baseURL}/images/payment_momo.png`} alt='payment_momo'/>
                    </Col>
                    
                </Row>
                <Row className='payment' gutter={[5, 15]} wrap>
                    
                    <Col className='icon' >
                        <Avatar className='payment_atm' size={34} src={`${baseURL}/images/payment_paypal.png`} alt='payment_paypal'/>
                    </Col>

                    <Col className='icon' >
                        <Avatar className='payment_apple' size={34} src={`${baseURL}/images/payment_apple.png`} alt='payment_apple'/>
                    </Col>
                    <Col className='icon'>
                        <Avatar className='payment_amazon' size={34} src={`${baseURL}/images/payment_amazon.png`} alt='payment_amazon'/>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Col>
            <Col className='footer_section' flex={1}>
                <Title level={5}>Kết nối với chúng tôi</Title>
                <Row className='payment' gutter={[5, 16]} wrap>
                    <Col className='icon' >
                        <Avatar size={34}  src={`${baseURL}/images/social_facebook.png`} alt='social_facebook'/>
                    </Col>
                    <Col className='icon' >
                        <Avatar size={34}  src={`${baseURL}/images/social_youtube.png`} alt='social_youtube'/>

                    </Col>
                    <Col className='icon' >
                        <Avatar size={34}  src={`${baseURL}/images/social_zalo.png`} alt='social_zalo'/>
                    </Col>
                </Row>
            </Col>
        </Row>
        </footer>
    )
}
export default FooterSection;
