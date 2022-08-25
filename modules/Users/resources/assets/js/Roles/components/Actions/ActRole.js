/**
 * Groups - set roles trên groups
 * @author Quang Huy <quanghuy.phung@urekamedia.vn>
 * @since 1.0.0
 * @todo Action Groups trong module Users
 * @return View
 */
import React,{ useContext, useState ,useEffect } from 'react';
import { RolesContext } from '../Contexts/RolesContext';
import Helper from '../Helper/helper';
import { Drawer, Spin, Tabs, Row, Col, Select, Typography } from 'antd';
const { TabPane } = Tabs;
const { Option } = Select;
const { Title } = Typography;
const ActRole = ({role, visible, setDrawer}) => {
    const { data, initRoles, getAcl, saveAcl } = useContext(RolesContext);
    const [ loading, setLoading ] = useState(false);
    const [ loadTabPane, setLoadTabPane ] = useState(false);

    const [ molules, setMolules ] = useState({
        modules: [],
        components: [],
        actions: [],
        actionRanges: [],
        defaultNoneAcl: 0,
    });

    const [ acl, setAcl ] = useState({
        id: null,
        module: null,
        component: null,
        actions: [],
        refresh: false,
    });

    useEffect(() => {
        if(visible){
            setLoading(true);
            initRoles().then((res) =>{
                let { modules, components, actions, actionRanges, defaultNoneAcl } = res.data;
                // let _actions = [];
                // actions.forEach(action => _actions[action.value] = defaultNoneAcl);

                let _actions = [];
                for (const [key, value] of Object.entries(actions)) {
                    _actions[key] = [];
                    value.forEach(item => _actions[key][item.value] = defaultNoneAcl);
                }
                setMolules({
                    modules,
                    components,
                    actions,
                    actionRanges,
                    defaultNoneAcl,
                });
                setAcl({
                    ...acl,
                    module: modules[0].value,
                    component: components[0].value,
                    actions: _actions,
                    refresh: true,
                });
            }).catch((err) =>{
            }).finally(() =>{
                setLoading(false);
            });
        }
    }, [visible]);

    useEffect(() => {
        if(acl.refresh){
            let values = {
                module_name: acl.module,
                component_name: acl.component,
                role_id: role.id
            }
            fetchAcl(values);
        }
    }, [acl]);


    const onClose = () =>{
        setDrawer(false);
    }

    const onTabChange = (key) => {
        const [type, value] = key.split("|");
        let component = acl.component
        if (type == "module") {
            component = molules.components.find(x => x.module === value).value;
        } else {
            component = value;
        }
        setAcl({ ...acl, [type]: value, component, refresh:true });
    }

    const fetchAcl = (values) =>{
        setLoadTabPane(true);
        getAcl(values).then((res)=>{
            let { aclRole } = res.data;
            let { module_name } = values;
            let actions = acl.actions;
            let id = null;
            let default_actions = molules.actions['default'] ? molules.actions['default'] : [];
            let extend_actions = molules.actions[module_name] ? molules.actions[module_name] : [];
            if (aclRole) {
                default_actions.forEach(action => {
                    actions['default'][action.value] = aclRole[action.value];
                });
                // extend_actions
                let extend = aclRole.extend_permission;
                if(extend){
                    extend = JSON.parse(extend);
                    extend_actions.forEach(action => {
                        actions[module_name][action.value] = extend[action.value] ? extend[action.value] : molules.defaultNoneAcl;
                    });
                }else{
                    extend_actions.forEach(action => {
                        actions[module_name][action.value] = molules.defaultNoneAcl;
                    });
                }
                //
                id = aclRole.id;
            }else{
                default_actions.forEach(action => {
                    actions['default'][action.value] = molules.defaultNoneAcl;
                });
                // extend_actions
                extend_actions.forEach(action => {
                    actions[module_name][action.value] = molules.defaultNoneAcl;
                });
            }
            setAcl({...acl, actions, id, refresh:false });
        }).catch((err)=>{
        }).finally(() =>{
            setLoadTabPane(false);
        });
    }

    const handleChange = (value, name, type) => {
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
        setLoadTabPane(true);
        saveAcl(params).then((res) =>{
            let { status, mess } = res.data;
            if (status) {
                if(type == "default"){
                    let actions = acl.actions;
                    actions['default'][name] = value;
                    setAcl({...acl, actions, refresh:false });
                }else{
                    let actions = acl.actions;
                    actions[module][name] = value;
                    setAcl({...acl, actions, refresh:false });
                }
                Helper.Noti('success', '[Storage Role]', mess);
            }else{
                Helper.Noti('error', '[Storage Role]', mess);
            }
        }).catch((err)=>{
        }).finally(()=>{
            setLoadTabPane(false);
        })
    }

    return(
        <Drawer
            title={role.id ? <>{'Change Role'}<br /><small>{role.name}</small></> : <></>}
            width={640}
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{padding: "0"}}
        >
            <Spin tip="Loading..." spinning={loading}>
                <Tabs onChange={onTabChange} tabPosition="left" activeKey={`module|${acl.module}`}>
                    {molules.modules.map(module => (
                        <TabPane tab={module.label} key={`module|${module.value}`}>
                            <Tabs onChange={onTabChange} tabPosition="left" activeKey={`component|${acl.component}`} tabBarStyle={{ width: 200 }}>
                                {molules.components.filter(component => component.module === module.value).map(component => (
                                    <TabPane tab={component.label} key={`component|${component.value}`}>
                                        <Spin tip="Loading..." spinning={loadTabPane}>
                                            
                                            <Row style={{marginTop: 16}}>
                                                <Col span={20}><Title level={5}>{component.label}</Title></Col>
                                                <Col span={24}>
                                                    {acl.actions['default'] && Object.keys(acl.actions['default']).map(actionName => {
                                                        if(acl.module != 'Users'){
                                                            if(actionName == 'access'){
                                                                return
                                                            }
                                                        }
                                                            return(
                                                                <Row gutter={[8, 8]} key={actionName} style={{marginBottom: 16}}>
                                                                    <Col span={20}>{actionName}</Col>
                                                                    <Col span={20}>
                                                                        <Select
                                                                            name={actionName}
                                                                            placeholder="Please select"
                                                                            onChange={(value)=>{handleChange(value, actionName, 'default')}}
                                                                            style={{ width: '100%' }}
                                                                            defaultValue={0}
                                                                            value={acl.actions['default'][actionName]}
                                                                        >
                                                                            {molules.actionRanges.map(range => (
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
                                                                            onChange={(value)=>{handleChange(value, actionName, 'extend')}}
                                                                            style={{ width: '100%' }}
                                                                            defaultValue={0}
                                                                            value={acl.actions[module.label][actionName]}
                                                                        >
                                                                            {molules.actionRanges.map(range => (
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
export default ActRole;