import { useContext, useEffect } from 'react';
import RoutesWeb from '../../routes/RoutesWeb';
import { CoreContext } from '../Contexts/CoreContext';

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {*} param0
 * @returns {void}
 */
const App = ({ history, ...props }) => {

    const { data, get_module } = useContext(CoreContext);
    const {} = props;

    useEffect(() => {
        get_module();
    }, []);

    return RoutesWeb();
};

export default App;
