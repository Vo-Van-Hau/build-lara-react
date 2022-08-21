import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Row, Col } from 'antd';
import Auth from '../components/Pages/Auth';

const history = createBrowserHistory({ basename: '/' });

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {Object} props
 * @returns
 */
const RoutesWeb = (props) => {
    return (
        <BrowserRouter history={history}>
            <Routes>
                <Route path={window.sparrowConfig.app.adminPrefix + '/auth/login'} element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesWeb;
