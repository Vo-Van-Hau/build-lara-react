import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { Card, Row, Col } from 'antd';

const Auth = ({ history, ...props }) => {

    const { page } = props;

    if(page === 'login') {
        return (
            <>
                <Row style={{marginTop: '60px'}}>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Card title={window.sparrowConfig.app.name} className='loginPageContainer'>
                            <Login {...props}/>
                        </Card>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </>
        );
    } else if(page === 'register') {
        return (
            <>
                <Register {...props}/>
            </>
        );
    }
};

export default Auth;
