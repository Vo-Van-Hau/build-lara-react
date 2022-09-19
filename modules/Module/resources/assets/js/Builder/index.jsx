import { useState, useEffect } from 'react';
import queryString from 'query-string';
import ListModules from './components/Page/ListModules';
import ListDatabase from './components/Page/ListDatabase';
import ActionTable from './components/Actions/ActionTable';
import BuilderContextProvicer from './components/Contexts/BuilderContext';

const Builder = (props) => {
    const [config, setConfig] = useState({
        status: [],
    });
    const [action, setAction] = useState('index');
    const [id, setId] = useState('');
    const [module, setModule] = useState('');

     /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get module configuration
     * @param:
     * @returns {void}
     */
    const get_config = async () => {
        return props.bp.axios.get_secured()
        .post(`/module/builder/get_config`)
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
     * @todo: get module configuration
     * @param:
     * @returns {void}
     */
    const get_action = () => {
        const searchParams = props.searchParams;
        let params = {
            action: searchParams.get('action') || 'index',
            id: searchParams.get('id') || '',
            module: searchParams.get('module') || ''
        }
        setAction(params.action);
        setId(params.id);
        setModule(params.module);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: render a React element
     * @param:
     * @returns {void}
     */
    const render_view = () => {
        switch (action) {
            case 'view_module': return (<ListDatabase {...props} keyID={id}/>);
            case 'edit_table': return (<ActionTable {...props} keyID={id} moduleID={module}/>);
            default: return (<ListModules {...props}/>);
        }
    }

    useEffect(function() {
        get_config();
        get_action();
    }, [props]);

    return (
        <>
            <BuilderContextProvicer axios={props.bp.axios} history={props.history} config={config} {...props}>
                { render_view() }
            </BuilderContextProvicer>
        </>
    )
}

export default Builder;
