import React,{ useContext, useState ,useEffect } from 'react';
import { BuilderContext } from '../Contexts/BuilderContext';
import Helper from '../Helper/Helper';
import { Drawer, Button, Spin, Form, Input, Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const ActionModule = ({module, visible, setDrawer}) => {
    const { data, create_module, get_modules } = useContext(BuilderContext);
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
            requestCreating(values);
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
        create_module(values).then((res) => {
            console.log(res);
            let { status, message } = res.data;
            if(status) {
                onClose();
                get_modules();
                Helper.Notification('success', '[Create Module]', message);
            } else {
                Helper.Notification('success', '[Create Module]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {setLoading(false);});
    }

    useEffect(() => {
        if(visible) {
            // setLoading(true);
            // get_parent_groups().then((res) => {
            //     let parents_res = res.data.parents;
            //     setParents(parents_res);
            //     if(group.id) {
            //         form.setFieldsValue({...group});
            //     }
            // })
            // .catch((errors) => {})
            // .finally(() => {setLoading(false);});
        }
    }, [visible]);

    return(
        <Drawer
            title={<h6>{'New Module'}</h6>}
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
                        label={<><span>Module Name (ex: Accounts)</span></>}
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input placeholder="Please input name!"/>
                    </Form.Item>
                </Form>
            </Spin>
        </Drawer>
    );
}

export default ActionModule;
