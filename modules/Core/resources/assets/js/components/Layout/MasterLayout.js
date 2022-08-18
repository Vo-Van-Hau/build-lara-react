import React, { Fragment, useContext } from 'react';
import { Layout } from 'antd';
import { CoreContext } from '../Contexts/CoreContext';
import Sidebar from './Sidebar';
import HeaderSection from './HeaderSection';
import FooterSection from './FooterSection';
import ContentSection from './ContentSection';

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {Object} props
 * @returns
 */
const MasterLayout = ({ history, ...props }) => {

    const { data } = useContext(CoreContext);
    const {} = props;

    return (
        <Fragment>
            <Layout>
                <Sidebar history={history} />
                <Layout className="site-layout" style={{}}>
                    <HeaderSection />
                    <ContentSection history={history}/>
                    <FooterSection />
                </Layout>
            </Layout>
        </Fragment>
    );
};
export default MasterLayout;
