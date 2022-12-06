import { Card, Row, Col } from 'antd';
import Login from './Login';
import Register from './Register';

const Auth = ({ history, ...props }) => {
    const { page } = props;

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: change page
     * @param {string} page
     * @return {void}
     */
    const change_page = page => {
        setPage(page);
    };

    if(page === 'login') {
        return (
            <>
                <Row style={{marginTop: '60px'}}>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Card title={window.sparrowConfig.app.name} className='loginPageContainer'>
                            <Login change_page={change_page}/>
                        </Card>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </>
        );
    } else if(page === 'register') {
        return (
            <>
                <Register />
            </>
        );
    }
};

export default Auth;
