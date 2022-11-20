import React, { useState, useEffect } from 'react';
import ProductsPage from './components/Page/Products';
import ProductsByCategoryPage from './components/Page/ProductsByCategoryPage';
import ProductsContextProvider from './components/Contexts/ProductsContext';

const Products = (props) => {

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
            case 'bycategory': return (<ProductsByCategoryPage keyID={id} {...props}/>)
            default: return (<ProductsPage {...props}/>);
        }
    }

    useEffect(function() {
        get_config();
        get_action();
    }, [props]);

    return (
        <>
            <ProductsContextProvider axios={props.bp.axios} history={props.history} config={config} {...props}>
                { render_view() }
            </ProductsContextProvider>

        </>
    )
}

export default Products;
