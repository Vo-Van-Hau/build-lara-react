import React, { Fragment, useContext } from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import ModuleView from '../Module/ModuleView';

import { CoreContext } from "../Contexts/CoreContext";

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {*} param0
 * @returns
 */
const Master = ({ history, ...props }) => {

    const { data } = useContext(CoreContext);

    return (
        <Fragment>
            <Layout>
                <Layout className="site-layout" style={{}}>
                    <Layout.Content style={{}}>
                        <Routes>
                            {(() => {
                                let parseURL = window.sparrowConfig.app.adminPrefix ? '/'+ window.sparrowConfig.app.adminPrefix : '';
                                return (
                                    <Route
                                        exact
                                        path={`${parseURL}/:moduleName/:componentName`}
                                        element={<ModuleView history={history} />}
                                    />
                                );
                            })()}
                        </Routes>
                    </Layout.Content>
                </Layout>
            </Layout>
        </Fragment>
    );
};
export default Master;
