import React, { useState, useEffect } from 'react';
import ListUsers from './components/Page/ListUsers';
import ActionUser from "./components/Actions/ActionUser";
import UsersContextProvicer from './components/Contexts/UsersContext';

const Users = (props) => {

    const [config, setConfig] = useState({
        status: [],
        account_type: [],
        users_type: [],
        currencies: [],
        roles: [],
        user: {},
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
        .post(`/users/users/get_config`)
        .then((res) => {
            let { config } = res.data;
            let { status, users_type, currencies, roles, account_type, user } = config;
            setConfig({
                ...config,
                status, users_type, currencies, roles, account_type, user
            });
        })
        .catch((errors) => {});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get module configuration
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
        switch (action) {
            case 'upsert': return (<ActionUser {...props} keyID={id}/>);
            default: return (<ListUsers {...props}/>);
        }
    }

    useEffect(function() {
        get_config();
        get_action();
    }, []);

    return (
        <>
            <UsersContextProvicer axios={props.bp.axios} history={props.history} config={config} {...props}>
                { render_view() }
            </UsersContextProvicer>
        </>
    )
}

export default Users;
