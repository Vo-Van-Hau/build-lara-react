import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import queryString from 'query-string'
import MasterLayout from '../components/Layout/MasterLayout';

// // react-router doesn't do query parsing anymore since V4
// // https://github.com/ReactTraining/react-router/issues/4410
const addLocationQuery = (history, params = null) => {
    var location = history.location;
    if(params) {
        Object.defineProperty(history, 'location', { // object is not extensible
            value: {
                ...location,
                ...params.location
            },
            writable: true
        });
    } else {
        Object.defineProperty(history, 'location', { // object is not extensible
            value: {
                ...location,
                query: queryString.parse(history.location.search)
            },
            writable: true
        });
    }
}
const history = createBrowserHistory({ basename: '/' });
addLocationQuery(history);

history.listen(({location, action}) => {
    addLocationQuery(history, {
        location, action
    });
});

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {Object} props
 * @returns
 */
const RoutesWeb = (props) => {
    return (
        <BrowserRouter history={history} >
            <MasterLayout history={history} {...props}/>
        </BrowserRouter>
    )
}

export default RoutesWeb;
