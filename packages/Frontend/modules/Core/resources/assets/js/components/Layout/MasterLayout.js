import { Layout } from 'antd';
import HeaderSection from './HeaderSection';
import FooterSection from './FooterSection';
import ContentSection from './ContentSection';
import { useNavigate, useSearchParams } from 'react-router-dom';
/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {Object} props
 * @returns
 */
const MasterLayout = (props) => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <Layout>
                <Layout className="site-layout" style={{}}>
                    <HeaderSection {...props} navigate={navigate} searchParams={searchParams}/>
                    <ContentSection {...props} navigate={navigate} searchParams={searchParams}/>
                    <FooterSection {...props} navigate={navigate} searchParams={searchParams}/>
                </Layout>
            </Layout>
        </>
    );
};

export default MasterLayout;
