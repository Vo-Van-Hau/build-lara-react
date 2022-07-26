import React, { useState, useEffect } from 'react';
import ListRoles from './components/Page/ListRoles';
import RolesContextProvicer from './components/Contexts/RolesContext';

const Roles = (props) => {

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
        .post(`/users/roles/get_config`)
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
     * @todo: render a React element
     * @param:
     * @returns {void}
     */
    const render_view = () => {
        switch (action) {
            default: return (<ListRoles {...props}/>);
        }
    }

    useEffect(function() {
        get_config();
    }, []);

    return (
        <>
            <RolesContextProvicer axios={props.bp.axios} history={props.history} config={config}>
                { render_view() }
            </RolesContextProvicer>
        </>
    )
}

export default Roles;


