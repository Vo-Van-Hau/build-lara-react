import { Fragment } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterSection = ({...props}) => {

    return (
        <Fragment>
             <Footer>Copyright @ 2022</Footer>
        </Fragment>
    )
}
export default FooterSection;
