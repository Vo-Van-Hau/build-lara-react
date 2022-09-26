import { Layout } from 'antd';
import { Col, Row } from 'antd';
const { Footer } = Layout;

const FooterSection = ({...props}) => {
    return (
        <>
        <Row className='footer_container' >
            <Col className='footer_section' span={4}>
                <h5>Heading</h5>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
            </Col>
            <Col className='footer_section' span={4}>
                <h5>Heading</h5>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
            </Col>
            <Col className='footer_section' span={4}>
                <h5>Heading</h5>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
            </Col>
            <Col className='footer_section' span={4}>
                <h5>Heading</h5>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
            </Col>
        </Row>
        
             
        </>
    )
}
export default FooterSection;
