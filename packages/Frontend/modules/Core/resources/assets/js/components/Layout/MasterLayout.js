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
const MasterLayout = (props) => {

    const { history } = props;

    return (
        <>
            <Layout>
                <Layout className="site-layout" style={{}}>
                    <HeaderSection {...props}/>
                    <ContentSection history={history}/>
                    <FooterSection />
                </Layout>
            </Layout>
        </>
    );
};

export default MasterLayout;
