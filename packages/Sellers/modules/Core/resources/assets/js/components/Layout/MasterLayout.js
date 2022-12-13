import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Layout, Alert, Button
} from 'antd';
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
const MasterLayout = (props) => {

    const { data } = props;
    const { user } = data;
    const { seller, is_login } = user;
    const { is_accepted } = seller;

    console.log(props);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            {(is_accepted === 1 || is_accepted === -1) ? <Layout>
                <Sidebar {...props} navigate={navigate} searchParams={searchParams}/>
                <Layout className="site-layout" style={{}}>
                    <HeaderSection {...props} navigate={navigate} searchParams={searchParams}/>
                    <ContentSection {...props} navigate={navigate} searchParams={searchParams}/>
                    <FooterSection  {...props} navigate={navigate} searchParams={searchParams}/>
                </Layout>
            </Layout>
            :
            <Alert
                message="Thông báo xác thực tài khoản nhà bán"
                showIcon
                description="Thông tin tài khoản mà bạn cung cấp đang trong quá trình xác thực bởi nền tảng của chúng tôi, vui lòng chờ...!"
                type="info"
                action={
                    <Button ssize="small" type="primary">Chi tiết</Button>
                }
            />}
        </>
    );
};

export default MasterLayout;
