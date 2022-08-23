/**
 * Groups - quản lý Groups
 * @author Quang Huy <quanghuy.phung@urekamedia.vn>
 * @since 1.0.0
 * @todo Action Groups trong module Users
 * @return View
 */
import React,{ useContext, useState ,useEffect } from 'react';
import { GroupsContext } from '../Contexts/GroupsContext';
import Helper from '../Helper/helper';
import { Drawer, Button, Spin, Form, Input, Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
const ActGroup = ({group, visible, setDrawer}) => {
    const { data, getParentGroups, getGroups, storageGroup, updateGroup } = useContext(GroupsContext);
    const { config } = data;
    const [ loading, setLoading ] = useState(false);
    const [ parent, setParent ] = useState([]);
    const [form] = Form.useForm();
    
    useEffect(() => {
        if(visible){
            setLoading(true);
            getParentGroups().then((res)=>{
                let {parents} = res.data;
                setParent(parents);
                if(group.id){
                    form.setFieldsValue({...group});
                }
            }).catch((err) => {
            }).finally(() =>{
                setLoading(false);
            });

        }
    }, [visible]);

    const onClose = () =>{
        setDrawer(false);
        form.resetFields();
    }

    const onSubmit = () => {
        form.validateFields().then((values) => {
            if(group.id){
                values.id = group.id;
                update(values);
            }else{
                storege(values);
            }
        }).catch((errorInfo) => {
        });
    }

    const storege = (values) => {
        setLoading(true);
        storageGroup(values).then((res)=>{
            let { status, mess } = res.data;
            if (status) {
                onClose();
                getGroups(1, {});
                Helper.Noti('success', '[Storage Group]', mess);
            }else{
                Helper.Noti('error', '[Storage Group]', mess);
            }
        }).catch((errorInfo) => {
        }).finally(() => {
            setLoading(false);
        })
    }

    const update = (values) => {
        setLoading(true);
        updateGroup(values).then((res)=>{
            let { status, mess } = res.data;
            if (status) {
                onClose();
                getGroups(1, {});
                Helper.Noti('success', '[Update Group]', mess);
            }else{
                Helper.Noti('error', '[Update Group]', mess);
            }
        }).catch((errorInfo) => {
        }).finally(() => {
            setLoading(false);
        });
    }

    return(
        <Drawer
            title={group.id ? <>{'Edit Group'}<br /><small>{group.name}</small></> : <h6>{'New Group'}</h6>}
            width={520}
            closable={false}
            onClose={onClose}
            visible={visible}
            footer={
                <div style={{textAlign: 'right'}}>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} type="primary">
                        Submit
                    </Button>
                </div>
            }
        >
            <Spin tip="Loading..." spinning={loading}>
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item 
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input placeholder="Please input name!"/>
                    </Form.Item>

                    <Form.Item 
                        label="Parent"
                        name="parent_group_id"
                    >
                        <Select
                            showSearch 
                            optionFilterProp="children"
                            placeholder="Please choose Parent!"
                        >
                            {parent.map(item => (
                                <Option key={item.value} value={item.value}>{item.text}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item 
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please choose status!' }]}
                    >
                        <Select
                            showSearch 
                            optionFilterProp="children"
                            placeholder="Please choose status!"
                        >
                            {config.status.map(item => (
                                <Option key={item.value} value={item.value}>{item.text}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item 
                        label="Description"
                        name="description"
                    >
                        <TextArea placeholder="description" autoSize={{ minRows: 2, maxRows: 8 }}/>
                    </Form.Item>
                </Form>
            </Spin>
        </Drawer>
    );
}
export default ActGroup;