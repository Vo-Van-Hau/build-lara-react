import { useContext, useEffect } from 'react';
import RoutesWeb from '../../routes/RoutesWeb';
import { CoreContext } from '../Contexts/CoreContext';

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {*} param0
 * @returns {void}
 */
const App = (props) => {

    const { history } = props;
    const { data, get_module, get_user, logout } = useContext(CoreContext);
    const { mouted }  = data;

    useEffect(() => {
        if(mouted) {
            get_module();
            get_user();
        }
    }, [props]);

    return RoutesWeb({
        data, get_user, history, logout
    });
};

export default App;
