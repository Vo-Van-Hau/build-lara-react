import React,{ useContext, useState ,useEffect } from 'react';
import { RolesContext } from '../Contexts/RolesContext';
import Helper from '../Helper/Helper';
import { Drawer, Spin, Tabs, Row, Col, Select, Typography } from 'antd';
const { TabPane } = Tabs;
const { Option } = Select;
const { Title } = Typography;

const ActionACL = ({role, visible, setDrawer}) => {
    const { data, init_acl_role, get_acl, save_acl_role } = useContext(RolesContext);
    const [loading, setLoading] = useState(false);
    const [loadTabPane, setLoadTabPane] = useState(false);
    const [molules, setMolules] = useState({
        modules: [],
        components: [],
        actions: [],
        action_ranges: [],
        default_none_acl: 0,
    });
    const [acl, setACL] = useState({
        id: null,
        module: null,
        component: null,
        actions: [],
        refresh: false,
    });

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: close Drawer
     * @return {void}
     */
    const onClose = () =>{
        setDrawer(false);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: Callback executed when active tab is changed
     * @param {string} activeKey
     * @return {void}
     */
    const onTabChange = (activeKey) => {
        const [type, value] = activeKey.split("|");
        let component = acl.component;
        if(type === 'module') {
            component = molules.components.find(x => x.module === value).value;
        } else {
            component = value;
        }
        setACL({...acl, [type]: value, component, refresh: true});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Objetc} values
     * @return {void}
     */
    const fetch_acl = (values) =>{
        setLoadTabPane(true);
        get_acl(values)
        .then((res) => {
            console.log(res);
            let { acl_role } = res.data;
            let { module_name } = values;
            let actions = acl.actions;
            let id = null;
            let default_actions = molules.actions['default'] ? molules.actions['default'] : [];
            let extend_actions = molules.actions[module_name] ? molules.actions[module_name] : [];
            console.log(actions, id, default_actions, extend_actions);
            if(acl_role) {
                default_actions.forEach(action => {
                    actions['default'][action.value] = acl_role[action.value];
                });
                // extend_actions
                let extend = acl_role.extend_permission;
                if(extend) {
                    extend = JSON.parse(extend);
                    extend_actions.forEach(action => {
                        actions[module_name][action.value] = extend[action.value] ? extend[action.value] : molules.default_none_acl;
                    });
                } else {
                    extend_actions.forEach(action => {
                        actions[module_name][action.value] = molules.default_none_acl;
                    });
                }
                //
                id = acl_role.id;
            } else {
                default_actions.forEach(action => {
                    actions['default'][action.value] = molules.default_none_acl;
                });
                // extend_actions
                extend_actions.forEach(action => {
                    actions[module_name][action.value] = molules.default_none_acl;
                });
            }
            setACL({...acl, actions, id, refresh: false});
        })
        .catch((errors) => {})
        .finally(() => {setLoadTabPane(false);});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Objetc} value
     * @param {string} name
     * @param {string} type
     * @return {void}
     */
    const handleChangeACL = (value, name, type) => {
        let { id, module, component } = acl
        let params = {
            id,
            role_id: role.id,
            module_name: module,
            component_name: component,
            action: name,
            value,
            type
        }
        console.log(params);
        save_acl_role(params)
        .then((res) => {
            console.log(res);
            let { status, message } = res.data;
            if(status) {
                if(type === 'default') {
                    let actions = acl.actions;
                    actions['default'][name] = value;
                    setACL({...acl, actions, refresh: false});
                } else {
                    let actions = acl.actions;
                    actions[module][name] = value;
                    setACL({...acl, actions, refresh: false});
                }
                Helper.Notification('success', '[Storage Role]', message);
            } else {
                Helper.Notification('error', '[Storage Role]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {setLoadTabPane(false);});
    }

    useEffect(() => {
        if(acl.refresh) {
            let values = {
                module_name: acl.module,
                component_name: acl.component,
                role_id: role.id
            }
            fetch_acl(values);
        }
    }, [acl]);

    useEffect(() => {
        if(visible){
            setLoading(true);
            init_acl_role()
            .then((res) => {
                let { modules, components, actions, action_ranges, default_none_acl } = res.data;
                let _actions = [];
                for (const [key, value] of Object.entries(actions)) {
                    _actions[key] = [];
                    value.forEach(item => _actions[key][item.value] = default_none_acl);
                }
                setMolules({
                    modules,
                    components,
                    actions,
                    action_ranges,
                    default_none_acl,
                });
                setACL({
                    ...acl,
                    module: modules[0].value,
                    component: components[0].value,
                    actions: _actions,
                    refresh: true,
                });
            })
            .catch((errors)=>{})
            .finally(() => {setLoading(false);});
        }
    }, [visible]);

    return(
        <Drawer
            title={role.id ? <>{'Change Role'}<br/><small>{role.name}</small></> : <></>}
            width={640}
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{padding: '0'}}
        >
            <Spin tip='Loading...' spinning={loading}>
                <Tabs onChange={onTabChange} tabPosition='left' activeKey={`module|${acl.module}`}>
                    {molules.modules.map(module => (
                        <TabPane tab={module.label} key={`module|${module.value}`}>
                            <Tabs onChange={onTabChange} tabPosition='left' activeKey={`component|${acl.component}`} tabBarStyle={{ width: 200 }}>
                                {molules.components.filter(component => component.module === module.value).map(component => (
                                    <TabPane tab={component.label} key={`component|${component.value}`}>
                                        <Spin tip='Loading...' spinning={loadTabPane}>
                                            <Row style={{marginTop: 16}}>
                                                <Col span={20}><Title level={5}>{component.label}</Title></Col>
                                                <Col span={24}>
                                                    {acl.actions['default'] && Object.keys(acl.actions['default']).map(actionName => {
                                                        if(acl.module != 'Users') {
                                                            if(actionName == 'access') return;
                                                        }
                                                            return(
                                                                <Row gutter={[8, 8]} key={actionName} style={{marginBottom: 16}}>
                                                                    <Col span={20}>{actionName}</Col>
                                                                    <Col span={20}>
                                                                        <Select
                                                                            name={actionName}
                                                                            placeholder="Please select"
                                                                            onChange={(value)=>{handleChangeACL(value, actionName, 'default')}}
                                                                            style={{ width: '100%' }}
                                                                            defaultValue={0}
                                                                            value={acl.actions['default'][actionName]}
                                                                        >
                                                                            {molules.action_ranges.map(range => (
                                                                                <Option key={range.value} value={range.value}>{range.label}</Option>
                                                                            ))}
                                                                        </Select>
                                                                    </Col>
                                                                </Row>
                                                            );
                                                        }
                                                    )}
                                                </Col>
                                                {/* extend_permission */}
                                                <Col span={24}>
                                                    {acl.actions[module.label] && Object.keys(acl.actions[module.label]).map(actionName => {
                                                            return(
                                                                <Row gutter={[8, 8]} key={actionName} style={{marginBottom: 16}}>
                                                                    <Col span={20}>{actionName}</Col>
                                                                    <Col span={20}>
                                                                        <Select
                                                                            name={actionName}
                                                                            placeholder="Please select"
                                                                            onChange={(value)=>{handleChangeACL(value, actionName, 'extend')}}
                                                                            style={{ width: '100%' }}
                                                                            defaultValue={0}
                                                                            value={acl.actions[module.label][actionName]}
                                                                        >
                                                                            {molules.action_ranges.map(range => (
                                                                                <Option key={range.value} value={range.value}>{range.label}</Option>
                                                                            ))}
                                                                        </Select>
                                                                    </Col>
                                                                </Row>
                                                            );
                                                        }
                                                    )}
                                                </Col>
                                            </Row>
                                        </Spin>
                                    </TabPane>
                                ))}
                            </Tabs>
                        </TabPane>
                    ))}
                </Tabs>
            </Spin>
        </Drawer>
    );
}

export default ActionACL;
