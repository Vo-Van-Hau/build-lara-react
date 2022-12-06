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
    const { data, get_module } = useContext(CoreContext);

    useEffect(() => {
        get_module();
    }, [props]);

    return RoutesWeb({
        data, history
    });
};

export default App;
