import { Fragment } from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import ModuleView from '../Module/ModuleView';

const { Content }  = Layout;

const ContentSection = (props) => {
    const { history } = props;
    return (
        <Fragment>
            <Content style={{
                padding: '24px 50px'
            }}>
                <Routes>
                    {(() => {
                        let parseURL = window.sparrowConfig.app.adminPrefix ? '/'+ window.sparrowConfig.app.adminPrefix : '';
                        return (
                            <Route
                                path={`${parseURL}/:moduleName/:controllerName`}
                                element={<ModuleView history={history} />}
                            />
                        );
                    })()}
                </Routes>
            </Content>
        </Fragment>
    )
}
export default ContentSection;
