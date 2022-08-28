import { Layout } from 'antd';
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

    return (
        <>
            <Layout>
                <Sidebar history={history} />
                <Layout className="site-layout" style={{}}>
                    <HeaderSection />
                    <ContentSection history={history}/>
                    <FooterSection />
                </Layout>
            </Layout>
        </>
    );
};

export default MasterLayout;
