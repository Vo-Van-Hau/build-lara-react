import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MasterLayout from '../components/Layout/MasterLayout';

// // react-router doesn't do query parsing anymore since V4
// // https://github.com/ReactTraining/react-router/issues/4410
const addLocationQuery = (history) => {

    // history.location = Object.assign(history.location, {

    //     query: queryString.parse(history.location.search)
    // });
}

const history = createBrowserHistory({ basename: '/' });

// addLocationQuery(history.location);

// history.listen(() => {

//     addLocationQuery(history);

//     if (window.SEND_USAGE_STATS) {}
// })

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
