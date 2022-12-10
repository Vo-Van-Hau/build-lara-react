import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import queryString from 'query-string'
import Auth from '../components/Pages/Auth';

// // react-router doesn't do query parsing anymore since V4
// // https://github.com/ReactTraining/react-router/issues/4410
const addLocationQuery = history => {
    var location = history.location;
    Object.defineProperty(history, 'location', { // object is not extensible
        value: {
            ...location,
            query: queryString.parse(history.location.search)
        },
        writable: true
    });
}
const history = createBrowserHistory({ basename: '/' });
// addLocationQuery(history);

// history.listen(() => {
//     addLocationQuery(history);
//     if (window.SEND_USAGE_STATS) {}
// });

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
                <Route path={window.sparrowConfig.app.adminPrefix + '/auth/login'} element={<Auth {...props} page={`login`}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesWeb;
