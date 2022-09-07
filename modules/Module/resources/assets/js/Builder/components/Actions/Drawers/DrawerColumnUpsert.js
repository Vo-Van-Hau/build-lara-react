import React,{ useContext, useState ,useEffect } from 'react';
import { BuilderContext } from '../../Contexts/BuilderContext';
import Helper from '../../Helper/Helper';
import { Drawer, Button, Spin, Form, Input, Select } from 'antd';

const { Option } = Select;

const DrawerColumnUpsert = ({module, table, column, visible, setDrawer}) => {
    const { data, create_column, update_column, get_table } = useContext(BuilderContext);
    const { config } = data;
    const [ loading, setLoading ] = useState(false);
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
            if(column && column.name) {
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
        values.module = module;
        values.table = table.name ? table.name : null;
        create_column(values).then((res) => {
            let { status, message } = res.data;
            if(status) {
                onClose();
                get_table(table.name, module);
                Helper.Notification('success', '[Create Column]', message);
            } else {
                Helper.Notification('success', '[Create Column]', message);
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
        values.module = module;
        values.table = table.name ? table.name : null;
        values.field_name = values.name ? values.name : null;
        values[values.name] = {
            type: values.type,
            size: values.size,
            not_null: values.not_null,
            default: values.default
        };
        update_column(values)
        .then((res) => {
            let { status, message } = res.data;
            if (status) {
                onClose();
                get_table(table.name, module);
                Helper.Notification('success', '[Update Column]', message);
            } else {
                Helper.Notification('success', '[Update Column]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {setLoading(false);});
    }

    useEffect(() => {
        if(visible) {
            form.setFieldsValue({not_null: "false"});
            if(column && column.name) {
                form.setFieldsValue({...column});
            }
        }
    }, [visible]);

    return(
        <Drawer
            title={<h6>{'New Colum'}</h6>}
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
                        label={<><span>Field name</span></>}
                        name="name"
                        rules={[{ required: true, message: 'required!' }]}
                    >
                        <Input placeholder="Please input name!"/>
                    </Form.Item>
                    <Form.Item
                        label={<><span>Field type</span></>}
                        name="type"
                        rules={[{ required: true, message: 'required!' }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="Please choose type!"
                        >
                            {table.types && table.types.map(item => (
                                <Option key={item.value} value={item.value}>{item.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={<><span>Not null</span></>}
                        name="not_null"
                        rules={[{ required: true, message: 'required!' }]}
                    >
                        <Select>
                            <Option value={false}>False</Option>
                            <Option value={true}>True</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={<><span>Field size</span></>}
                        name="size"
                        rules={[{ required: true, message: 'required!' }]}
                    >
                        <Input placeholder="Field size!"/>
                    </Form.Item>
                    <Form.Item
                        label={<><span>Field default</span></>}
                        name="default"
                        rules={[{ required: true, message: 'required!' }]}
                    >
                        <Input placeholder="Field default!"/>
                    </Form.Item>
                </Form>
            </Spin>
        </Drawer>
    );
}

export default DrawerColumnUpsert;
