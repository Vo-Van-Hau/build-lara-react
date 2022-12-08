import { useEffect, useContext } from 'react';
import RoutesWeb from '../../routes/RoutesWeb';
import { AuthContext } from '../Contexts/AuthContext';

const App = (props) => {

    const { get_config, data } = useContext(AuthContext);

    useEffect(() => {
        get_config();
    }, []);

    return RoutesWeb({...props, data});
};

export default App;
