/**
 * Users - quản lý Users
 * @author Quang Huy <quanghuy.phung@urekamedia.vn>
 * @since 1.0.0
 * @todo Action Users trong module Users
 * @return View
 */
import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from '../Contexts/UsersContext';
import { Button, Card, Col, Form, Row, Spin } from 'antd';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import BasicInfo from "./Modules/BasicInfo";
import UserGroups from "./Modules/UserGroups";
import UserPublishers from "./Modules/UserPublishers";
import Helpers from "../Helper/helper";

const ActUser = ({ keyID }) => {
    const { data, setRouter, storageUser, updateUser, getItemCP } = useContext(UsersContext);
    const { config } = data;
    const { user } = config;
    const [itemCP, setItemCP] = useState({});
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [disabled, setDisabled] = useState([]);

    const [userGroups, setUserGroups] = useState([]);
    const [userPublishers, setUserPublishers] = useState([]);

    const [form] = Form.useForm();
    const [key, setKey] = useState('tab1');

    useEffect(() => {
        setDisabled(false);
        if (keyID) {
            getItemCP(keyID).then((res) => {
                let { data } = res.data;
                let { id, avatar, groups, publishers, pub_field, exclude_fields } = data;
                if (id) {
                    form.setFieldsValue({ ...data,
                        pub_field: pub_field ? JSON.parse(pub_field) : undefined,
                        exclude_fields: exclude_fields ? JSON.parse(exclude_fields) : undefined,
                    });
                }
                if(avatar){
                    setFileList([{
                        uid: id,
                        name: id+'.png',
                        status: 'done',
                        url: avatar,
                    }]);
                }
                if(groups){
                    setUserGroups(groups);
                }
                if(publishers){
                    setUserPublishers(publishers);
                }
                setDisabled(true);
            }).catch((error) => { 
            }).finally(() => {
            });
        }
    }, []);

    const operations = <>
        <Button onClick={() => {onSubmit()}} type="primary" style={{ marginRight: 8 }} icon={<SaveOutlined />}>
            Save
        </Button>
        <Button onClick={() => {setRouter("")}} icon={<RollbackOutlined />}>
            Back
        </Button>
    </>;

    const genPassword = () => {
        let gen_password = Math.random().toString(36).slice(-8);
        form.setFieldsValue({ password:gen_password });
        // setDisabled(false);
    }

    const onTabChange = (key) => {
        form.validateFields().then((values) => {
            setItemCP({ ...itemCP, ...values });
            setKey(key);
        }).catch((errorInfo) => {
        });
    };

    const onSubmit = () => {
       
        form.validateFields().then((values) => {
            let { email } = values;
            let check_email = email.split("@");
            let check_email_index = check_email[1];
            let check_name = check_email_index.split(".");
            let check_name_index = check_name[0];
            if(check_name_index !== "urekamedia"){
                Helpers.Noti('error', '[Users]', 'User Internal phải là email ureka');
            }else{
                values = { ...itemCP, ...values };
                values.is_admin = user.is_admin;
                setItemCP(values);
                if(keyID){
                    values.id = keyID;
                    edit({...values, userGroups, userPublishers});
                }else{
                    storage({...values, userGroups, userPublishers});
                }
            }
        }).catch((errorInfo) => {
        }).finally(() => { });
    }

    const storage = (values) => {
        let formData = pustFormData(null, values);
        storageUser(formData).then((res)=>{
            let { status, mess } = res.data;
            if(!status){
                Helpers.Noti('error', '[Users]', mess);
            }else{
                Helpers.Noti('success', '[Users]', mess);
                setRouter("");
            }
        }).catch((err)=>{
        }).finally(()=>{
        })
    }

    const edit = (values) => {
        let formData = pustFormData(values.id, values);
        updateUser(formData).then((res)=>{
            let { status, mess } = res.data;
            if(!status){
                Helpers.Noti('error', '[Users]', mess);
            }else{
                Helpers.Noti('success', '[Users]', mess);
                setRouter("");
            }
        }).catch((err)=>{
        }).finally(()=>{
        })
    }

    const pustFormData = (id, values) =>{
        let {userGroups, userPublishers, avatar, password, cc_mails, pub_field, exclude_fields } = values;
        const formData = new FormData();
        if(id){
            formData.append("id", id);
            if(password){
                formData.append("password", values.password);
            }
        } else {
            formData.append("password", values.password);
        }

        let user_groups = [];
        let user_publishers = [];
        if(userGroups){
            user_groups = userGroups.map(item => item.id);
            formData.append("user_groups", JSON.stringify(user_groups));
        }
        if(userPublishers){
            user_publishers = userPublishers.map(item => item.id);
            formData.append("user_publishers", JSON.stringify(user_publishers));
        }
        if(cc_mails){
            formData.append("cc_mails", values.cc_mails);
        }
        if(pub_field){
            formData.append("pub_field", JSON.stringify(values.pub_field));
        }
        if(exclude_fields){
            formData.append("exclude_fields", JSON.stringify(values.exclude_fields));
        }
        formData.append("name", values.name);
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("role", values.role_id);
        formData.append("currencies", values.currencies);
        formData.append("type", values.type);
        formData.append("status", values.status);
        formData.append("is_publisher", values.is_publisher);
        formData.append("is_admin", values.is_admin);
        if (avatar && typeof avatar !== "string") {
            formData.append("avatar", avatar[0].originFileObj);
        }
        return formData;
    }

    const tabList = [
        {
            key: 'tab1',
            tab: 'Basic Info',
        }, {
            key: 'tab2',
            tab: 'User Groups',
        }, {
            key: 'tab3',
            tab: 'User Publishers',
        },
    ];

    const contentList = {
        tab1: <BasicInfo fileList={fileList} setFileList={setFileList} genPassword={genPassword} disabled={disabled}/>,
        tab2: <UserGroups userGroups={userGroups} setUserGroups={setUserGroups}/>,
        tab3: <UserPublishers userPublishers={userPublishers} setUserPublishers={setUserPublishers}/>
    };

    return (
        <div className="content">
            <Card
                size="small"
                title={ itemCP.name ? <h6>{itemCP.name}</h6> : <h6>{'New Users'}</h6> }
                tabBarExtraContent={operations}
                tabList={tabList}
                activeTabKey={key}
                onTabChange={key => {
                    onTabChange(key);
                }}
            >
                <Spin tip="Loading..." spinning={loading}>
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            status: true,
                            is_publisher : 0
                        }}
                    >
                        {contentList[key]}
                    </Form>
                </Spin>
            </Card>
        </div>
    );
};
export default ActUser;
