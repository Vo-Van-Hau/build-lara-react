import { Layout } from 'antd';
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
