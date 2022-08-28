import { useContext, useState, useEffect } from 'react';
import { UsersContext } from '../Contexts/UsersContext';
import { Button, Card, Form, Spin } from 'antd';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import BasicInfo from './Modules/BasicInfo';
import UserGroups from './Modules/UserGroups';
import UserPublishers from './Modules/UserPublishers';
import Helper from '../Helper/Helper';

const ActionUser = ({ keyID }) => {
    const { data, setRouter, storage_user, update_user, get_user } = useContext(UsersContext);
    const { config } = data;
    const { user } = config;
    const [itemCP, setItemCP] = useState({});
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [disabled, setDisabled] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    const [userPublishers, setUserPublishers] = useState([]);
    const [form] = Form.useForm();
    const [keyTab, setKeyTab] = useState('tab1');

    /**
     * @author : <vanhau.vo@urekamedia.vn>
     * @todo: Extra content in tab bar
     * @return
     */
    const tabBarOperations = () => {
        return (
            <>
                <Button onClick={() => {onSubmit()}} type='primary' style={{ marginRight: 8 }} icon={<SaveOutlined />}>
                    Save
                </Button>
                <Button onClick={() => {setRouter('')}} icon={<RollbackOutlined />}>
                    Back
                </Button>
            </>
        );
    }

    /**
     * @author : <vanhau.vo@urekamedia.vn>
     * @todo: create new password
     * @return {string}
     */
    const generatePassword = () => {
        let password = Math.random().toString(36).slice(-8);
        form.setFieldsValue({ password: password });
    }

    /**
     * @author : <vanhau.vo@urekamedia.vn>
     * @todo: tab is switched
     * @return {string}
     */
    const onTabChange = (key) => {
        form.validateFields().then((values) => {
            setItemCP({ ...itemCP, ...values });
            setKeyTab(key);
        })
        .catch((errors) => {});
    };

    /**
     * @author : <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return {string}
     */
    const onSubmit = () => {
        setLoading(true);
        form.validateFields().then((values) => {
            values = {...itemCP, ...values};
            values.is_admin = user.is_admin;
            setItemCP(values);
            if(keyID) {
                values.id = keyID;
                requestUpdating({...values, userGroups, userPublishers});
            } else {
                requestCreating({...values, userGroups, userPublishers});
            }
        })
        .catch((errors) => {})
        .finally(() => {setLoading(false);});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: request for creating
     * @param {Object} values
     * @return {void}
     */
     const requestCreating = (values) => {
        let formData = pushFormData(null, values);
        storage_user(formData)
        .then((res) => {
            let { status, message } = res.data;
            if (status) {
                Helper.Notification('success', '[Storage Users]', message);
                setRouter('');
            } else {
                Helper.Notification('error', '[Storage Users]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: request for updating
     * @param {Object} values
     * @return {void}
     */
    const requestUpdating = (values) => {
        let formData = pushFormData(values.id, values);
        update_user(formData)
        .then((res) => {
            let { status, message } = res.data;
            if (status) {
                Helper.Notification('success', '[Update Users]', message);
                setRouter('');
            } else {
                Helper.Notification('error', '[Update Users]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {number} id
     * @param {Object} values
     * @return {Object}
     */
    const pushFormData = (id, values) =>{
        let {userGroups, userPublishers, avatar, password} = values;
        const formData = new FormData();
        if(id) {
            formData.append('id', id);
            if(password) formData.append('password', values.password);
        } else {
            formData.append('password', values.password);
        }
        let user_groups = [];
        let user_publishers = [];
        if(userGroups){
            user_groups = userGroups.map(item => item.id);
            formData.append('user_groups', JSON.stringify(user_groups));
        }
        if(userPublishers){
            user_publishers = userPublishers.map(item => item.id);
            formData.append('user_publishers', JSON.stringify(user_publishers));
        }
        formData.append('name', values.name);
        formData.append('username', values.username);
        formData.append('email', values.email);
        formData.append('role', values.role_id);
        formData.append('type', values.type);
        formData.append('status', values.status);
        formData.append('is_publisher', values.is_publisher);
        formData.append('is_admin', values.is_admin);
        if (avatar && typeof avatar !== 'string') {
            formData.append('avatar', avatar[0].originFileObj);
        }
        return formData;
    }

    const tabList = [
        {
            key: 'tab1',
            tab: 'Basic Info',
        },
        {
            key: 'tab2',
            tab: 'User Groups',
        },
        {
            key: 'tab3',
            tab: 'User Publishers',
        },
    ];

    const contentList = {
        tab1: <BasicInfo fileList={fileList} setFileList={setFileList} generatePassword={generatePassword} disabled={disabled}/>,
        tab2: <UserGroups userGroups={userGroups} setUserGroups={setUserGroups}/>,
        tab3: <UserPublishers userPublishers={userPublishers} setUserPublishers={setUserPublishers}/>
    };

    useEffect(() => {
        setDisabled(false);
        if (keyID) {
            get_user(keyID)
            .then((res) => {
                let { user } = res.data;
                let { id, avatar, groups, publishers } = user;
                if (id) form.setFieldsValue({...user});
                if(avatar) {
                    setFileList([{
                        uid: id,
                        name: id + '.png',
                        status: 'done',
                        url: avatar,
                    }]);
                }
                if(groups) setUserGroups(groups);
                if(publishers) setUserPublishers(publishers);
                setDisabled(true);
            })
            .catch((errors) => {})
            .finally(() => {});
        }
    }, []);

    return (
        <div className='content'>
            <Card
                size='small'
                title={ itemCP.name ? <h6>{itemCP.name}</h6> : <h6>{'New Users'}</h6> }
                tabBarExtraContent={tabBarOperations()}
                tabList={tabList}
                activeTabKey={keyTab}
                onTabChange={(key) => {onTabChange(key);}}
            >
                <Spin tip='Loading...' spinning={loading}>
                    <Form
                        form={form}
                        layout='vertical'
                        initialValues={{
                            status: true,
                            is_publisher : 0
                        }}
                    >
                        { contentList[keyTab] }
                    </Form>
                </Spin>
            </Card>
        </div>
    );
};

export default ActionUser;
