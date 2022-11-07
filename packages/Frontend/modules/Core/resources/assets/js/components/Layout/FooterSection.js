import { Layout } from 'antd';
import { Col, Row } from 'antd';
import { Avatar, Image, Space, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterSection = ({...props}) => {
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
                        <Avatar className='icon-visa' size={34}  src="../images/icon-cash.png" alt='icon-cash'/>
                    </Col>
                    <Col className='icon' >
                        <Avatar className='icon-visa' size={34}  src="../images/icon-visa.png" alt='icon-visa'/>
                    </Col>
                    <Col className='icon' >
                        <Avatar className='icon-mastercard' size={34}  src="../images/icon-mastercard.png" alt='icon-mastercard'/>
                    </Col>
                    <Col className='icon' >
                        <Avatar className='icon-momo' size={34}  src="../images/icon-momo.png" alt='icon-momo'/>
                    </Col> 
                </Row>
                <Row className='payment' gutter={[0, 16]} wrap>
                    <Col className='icon' >
                        <Avatar className='icon-zalopay' size={34}  src="../images/icon-zalopay.png" alt='icon-zalopay'/>
                    </Col>
                    <Col className='icon' >
                        <Avatar className='icon-atm' size={34}  src="../images/icon-paypal.png" alt='icon-paypal'/>
                    </Col>
                    
                    <Col className='icon' >
                        <Avatar className='icon-momo' size={34}  src="../images/icon-momo.png" alt='icon-momo'/>
                    </Col>
                    <Col className='icon'>
                        <Avatar className='icon-zalopay' size={34}  src="../images/icon-zalopay.png" alt='icon-zalopay'/>
                    </Col>
                    <Col className='icon' >
                        <Avatar className='icon-atm' size={34}  src="../images/icon-paypal.png" alt='icon-paypal'/>
                    </Col>

                </Row>
            </Col>
            <Col className='footer_section' flex={1}>
                <Title level={5}>Kết nối với chúng tôi</Title>
                <Row className='payment' gutter={[5, 16]} wrap>
                    <Col className='icon' >
                        <Avatar size={34}  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Facebook-icon-1.png/640px-Facebook-icon-1.png" alt='icon-facebook'/>
                    </Col>
                    <Col className='icon' >
                        <Avatar size={34}  src="https://img.freepik.com/premium-vector/youtube-background-youtube-icon-social-media-icons-realistic-logo-vector-zaporizhzhia-ukraine-may-10-2021_399089-1047.jpg" alt='icon-youtube'/>

                    </Col>
                    <Col className='icon' >
                        <Avatar size={34}  src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-App-Rec.png" alt='icon-zalo'/>
                    </Col>
                </Row>
            </Col>
        </Row>
        </footer>
    )
}
export default FooterSection;
