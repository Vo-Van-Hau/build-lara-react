/**
 * Groups - quản lý Groups
 * @author Quang Huy <quanghuy.phung@urekamedia.vn>
 * @since 1.0.0
 * @todo Action Groups trong module Users
 * @return View
 */
import React,{ useContext, useState ,useEffect } from 'react';
import { RolesContext } from '../Contexts/RolesContext';
import Helper from '../Helper/helper';
import { Drawer, Button, Spin, Form, Input, Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const ActGroup = ({role, visible, setDrawer}) => {
    const { data, storageRole, updateRole, getRoles } = useContext(RolesContext);
    const { config } = data;
    const [ loading, setLoading ] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if(visible){
            if(role.id){
                form.setFieldsValue({...role});
            }
        }
    }, [visible]);

    const onClose = () =>{
        setDrawer(false);
        form.resetFields();
    }

    const onSubmit = () => {
        form.validateFields().then((values) => {
            if(role.id){
                values.id = role.id;
                update(values);
            }else{
                storege(values);
            }
        }).catch((errorInfo) => {
        });
    }

    const storege = (values) => {
        setLoading(true);
        storageRole(values).then((res)=>{
            let { status, mess } = res.data;
            if (status) {
                onClose();
                getRoles(1, {});
                Helper.Noti('success', '[Storage Role]', mess);
            }else{
                Helper.Noti('error', '[Storage Role]', mess);
            }
        }).catch((errorInfo) => {
        }).finally(() => {
            setLoading(false);
        })
    }

    const update = (values) => {
        setLoading(true);
        updateRole(values).then((res)=>{
            let { status, mess } = res.data;
            if (status) {
                onClose();
                getRoles(1, {});
                Helper.Noti('success', '[Update Role]', mess);
            }else{
                Helper.Noti('error', '[Update Role]', mess);
            }
        }).catch((errorInfo) => {
        }).finally(() => {
            setLoading(false);
        });
    }

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