import { useState } from 'react';
import Login from './Login';
import { Card, Row, Col } from 'antd';

const Auth = ({ history, ...props }) => {

    const [page, setPage] = useState('login');

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: change page
     * @param {string} page
     * @return {void}
     */
    const change_page = page => {
        setPage(page);
    };

    if (page === 'login') {
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
    }
};

export default Auth;
