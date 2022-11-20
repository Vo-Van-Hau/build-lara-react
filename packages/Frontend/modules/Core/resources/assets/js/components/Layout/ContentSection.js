import { Layout } from 'antd';
import { Routes, Route, Outlet } from 'react-router-dom';
import ModuleView from '../Module/ModuleView';

const { Content }  = Layout;

const ContentSection = (props) => {

    return (
        <>
            <Content className='main_content_container'>
                <Routes>
                    {(() => {
                        let parseURL = window.sparrowConfig.app.adminPrefix ? `/${window.sparrowConfig.app.adminPrefix}` : '';
                        return (
                            <Route path='/' element={<><Outlet /></>}>
                                <Route
                                    path={`${parseURL}/:moduleName/:controllerName`}
                                    element={<ModuleView {...props}/>}
                                />
                                <Route path='*'>
                                    <>Page not found !!!</>
                                </Route>
                            </Route>
                        );
                    })()}
                </Routes>
            </Content>
        </>
    )
}

export default ContentSection;
