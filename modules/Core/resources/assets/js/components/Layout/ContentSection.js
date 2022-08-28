import { Layout } from 'antd';
import { Routes, Route, Outlet } from 'react-router-dom';
import ModuleView from '../Module/ModuleView';

const { Content }  = Layout;

const ContentSection = (props) => {
    const { history } = props;
    return (
        <>
            <Content style={{
                padding: '24px 50px'
            }}>
                <Routes>
                    {(() => {
                        let parseURL = window.sparrowConfig.app.adminPrefix ? `/${window.sparrowConfig.app.adminPrefix}` : '';
                        return (
                            <Route path='/' element={<><Outlet /></>}>
                                <Route
                                    exact
                                    path={`${parseURL}/:moduleName/:controllerName`}
                                    element={<ModuleView history={history} {...props}/>}
                                />
                            </Route>
                        );
                    })()}
                </Routes>
            </Content>
        </>
    )
}
export default ContentSection;
