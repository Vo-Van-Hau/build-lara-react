import React, { useState, useEffect } from 'react';
import SearchPage from './components/Page/Search';
import SearchContextProvider from './components/Contexts/SearchContext';

const Search = (props) => {

    const [config, setConfig] = useState({
        status: [],
    });
    const [action, setAction] = useState('index');
    const [id, setId] = useState('');
    const [q, setQ] = useState('');

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
            id: searchParams.get('id') || '',
            q: searchParams.get('q') || '',
        }
        setAction(params.action);
        setId(params.id);
        setQ(params.q);
    }
    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: render a React element
     * @param:
     * @returns {void}
     */
    const render_view = () => {
        switch(action) {
            case 'view': return (<SearchPage keyID={id} q={q} {...props}/>)
            default: return (<SearchPage keyID={id} q={q} {...props}/>);
        }
    }

    useEffect(function() {
        get_config();
        get_action();
    }, [props]);

    return (
        <>
            <SearchContextProvider axios={props.bp.axios} config={config} {...props}>
                { render_view() }
            </SearchContextProvider>

        </>
    )
}

export default Search;
