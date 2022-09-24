import React, { useState, useEffect } from 'react';
import ListGroups from './components/Page/ListGroups';
import GroupsContextProvicer from './components/Contexts/GroupsContext';

const Groups = (props) => {

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
     * @todo: render a React element
     * @param:
     * @returns {void}
     */
    const render_view = () => {
        switch (action) {
            default: return (<ListGroups {...props}/>);
        }
    }

    useEffect(function() {
        get_config();
    }, []);

    return (
        <>
            <GroupsContextProvicer axios={props.bp.axios} history={props.history} config={config}>
                { render_view() }
            </GroupsContextProvicer>
        </>
    )
}

export default Groups;
