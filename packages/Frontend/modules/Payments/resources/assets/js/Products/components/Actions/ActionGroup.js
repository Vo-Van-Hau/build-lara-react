import React,{ useContext, useState ,useEffect } from 'react';
import { GroupsContext } from '../Contexts/ProductsContext';
import Helper from '../Helper/Helper';
import { Drawer, Button, Spin, Form, Input, Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const ActionGroup = ({group, visible, setDrawer}) => {
    const { data, get_parent_groups, get_groups, storage_group, update_group } = useContext(GroupsContext);
    const { config } = data;
    const [ loading, setLoading ] = useState(false);
    const [ parents, setParents ] = useState([]);
    const [form] = Form.useForm();

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: close Drawer
     * @return {void}
     */
    const onClose = () =>{
        setDrawer(false);
        form.resetFields();
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return {void}
     */
    const onSave = () => {
        form.validateFields().then((values) => {
            if(group.id) {
                values.id = group.id;
                requestUpdating(values);
            } else {
                requestCreating(values);
            }
        })
        .catch((errors) => {});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: request for creating
     * @param {Object} values
     * @return {void}
     */
    const requestCreating = (values) => {
        setLoading(true);
        storage_group(values).then((res)=>{
            let { status, message } = res.data;
            if(status) {
                onClose();
                get_groups(1, {});
                Helper.Notification('success', '[Storage Group]', message);
            } else {
                Helper.Notification('success', '[Storage Group]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {setLoading(false);});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: request for updating
     * @param {Object} values
     * @return {void}
     */
    const requestUpdating = (values) => {
        setLoading(true);
        update_group(values)
        .then((res) => {
            let { status, message } = res.data;
            if (status) {
                onClose();
                get_groups(1, {});
                Helper.Notification('success', '[Update Group]', message);
            } else {
                Helper.Notification('success', '[Update Group]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {setLoading(false);});
    }

    useEffect(() => {
        if(visible) {
            setLoading(true);
            get_parent_groups().then((res) => {
                let parents_res = res.data.parents;
                setParents(parents_res);
                if(group.id) {
                    form.setFieldsValue({...group});
                }
            })
            .catch((errors) => {})
            .finally(() => {setLoading(false);});
        }
    }, [visible]);

    return(
        <Drawer
            title={group.id ? <>{'Edit Group'}<br/><small>{group.name}</small></> : <h6>{'New Group'}</h6>}
            width={520}
            closable={false}
            onClose={onClose}
            visible={visible}
            footer={
                <div style={{textAlign: 'right'}}>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={onSave} type="primary">
                        Save
                    </Button>
                </div>
            }
        >
            <Spin tip="Loading..." spinning={loading}>
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input placeholder="Please input name!"/>
                    </Form.Item>

                    <Form.Item
                        label="Parents"
                        name="parent_group_id"
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="Please choose Parent!"
                        >
                            {parents.map(item => (
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

export default ActionGroup;
