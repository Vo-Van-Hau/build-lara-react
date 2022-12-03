import React, { useState, useEffect } from 'react';
import OrdersPage from './components/Page/OrdersPage';
import OrderDetailPage from './components/Page/OrderDetailPage';
import OrdersContextProvider from './components/Contexts/OrdersContext';

const Orders = (props) => {

    const [config, setConfig] = useState({
        status: [],
    });
    const [action, setAction] = useState('index');
    const [id, setId] = useState('');

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get module configuration
     * @param:
     * @returns {void}
     */
    const get_config = async () => {
        return props.bp.axios.get_secured()
        .post(`/users/groups/get_config`)
        .then((res) => {
            let { config } = res.data;
            let { status } = config;
            setConfig({
                ...config,
                status
            });
        })
        .catch((errors) => {});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get action
     * @param:
     * @returns {void}
     */
    const get_action = () => {
        const searchParams = props.searchParams;
        let params = {
            action: searchParams.get('action') || 'index',
            id: searchParams.get('id') || ''
        }
        setAction(params.action);
        setId(params.id);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: render a React element
     * @param:
     * @returns {void}
     */
    const render_view = () => {
        switch(action) {
            case 'detail': return (<OrderDetailPage {...props} keyID={id}/>);
            default: return (<OrdersPage {...props}/>);
        }
    }

    useEffect(function() {
        get_config();
        get_action();
    }, [props]);

    return (
        <>
            <OrdersContextProvider axios={props.bp.axios} history={props.history} config={config} {...props}>
                { render_view() }
            </OrdersContextProvider>
        </>
    )
}

export default Orders;
