import React,{ useContext, useState ,useEffect } from 'react';
import { RolesContext } from '../Contexts/RolesContext';
import Helper from '../Helper/Helper';
import { Drawer, Button, Spin, Form, Input, Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const ActionRole = ({role, visible, setDrawer}) => {
    const { data, storage_role, update_role, get_roles } = useContext(RolesContext);
    const { config } = data;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: close edit form
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
            if(role.id) {
                values.id = role.id;
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
        storage_role(values)
        .then((res) => {
            let { status, message } = res.data;
            if (status) {
                onClose();
                get_roles(1, {});
                Helper.Notification('success', '[Storage Role]', message);
            } else {
                Helper.Notification('error', '[Storage Role]', message);
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
        update_role(values)
        .then((res) => {
            let { status, message } = res.data;
            if (status) {
                onClose();
                get_roles(1, {});
                Helper.Notification('success', '[Update Role]', message);
            } else {
                Helper.Notification('error', '[Update Role]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {setLoading(false);});
    }

    useEffect(() => {
        (visible === true && role.id) && form.setFieldsValue({...role});
    }, [visible]);

    return(
        <Drawer
            title={role.id ? <>{'Edit Role'}<br /><small>{role.name}</small></> : <h6>{'New Role'}</h6>}
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

export default ActionRole;
