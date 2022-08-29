import { useEffect, useContext, useState } from 'react';
import { Table, Space, Popconfirm, Input, Button, Row, Col, Tooltip } from 'antd';
import { EditOutlined, ToolOutlined, ThunderboltOutlined } from '@ant-design/icons'
import Helper from '../Helper/Helper';
import { BuilderContext } from '../Contexts/BuilderContext';
import ActionModule from '../Actions/ActionModule';
const { Search } = Input;

const ListModules = (props) => {
    const { data, get_modules, set_mouted, destroy_group, set_table_loading, setRouter } = useContext(BuilderContext);
    const { config, mouted, modules, loading_table, pagination } = data;
    const [module, setModule] = useState({});
    const [viewAction, setViewAction] = useState(false);
    const [viewUsers, setViewUsers] = useState(false);
    const [keySearch, setKeySearch] = useState({
        keyword: null,
        status: null
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            ellipsis: true,
        },
        {
            title: 'Version',
            dataIndex: 'version',
            key: 'version',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: config.status,
            render: (value) => {
                let { status } = config;
                let text = status ? status.find(item => item.value == value) : null;
                return (<>{text ? text.text : ''}</>);
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {
                return (
                    <Space size={5}>
                        <Tooltip title="Edit Module">
                            <Button type="primary" size="medium" icon={<EditOutlined />} onClick={() => edit_module(record)}></Button>
                        </Tooltip>
                        <>||</>
                        <Tooltip title="Rebuild Module">
                            <Button type="primary" size="medium" onClick={() => edit_group(record)} icon={<ToolOutlined />}></Button>
                        </Tooltip>
                        <>||</>
                        <Tooltip title="Upgrape Module">
                            <Button type="primary" size="medium" onClick={() => edit_group(record)} icon={<ThunderboltOutlined />}></Button>
                        </Tooltip>
                    </Space>
                )
            }
        }
    ];

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return {void}
     */
    const new_module = () => {
        setModule({});
        setViewAction(true);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: update an existed record
     * @param {Object} record
     * @return {void}
     */
    const edit_module = (module) => {
        if(!module.allow_edit) return Helper.Notification('error', 'Module', 'Module is not allowed to edit');
        setModule(module);
        return setRouter({action: 'view_module', id: module.name});
    }

     /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: remove an existed record
     * @param {Object} record
     * @return {void}
     */
    const delete_group = (record) => {
        destroy_group(record.id)
        .then((res) => {
            let { status, message } = res.data;
            if (status) {
                get_groups(1, {});
                Helper.Notification('success', '[Delete Group]', message);
            } else {
                Helper.Notification('error', '[Delete Group]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {mixed} pagination
     * @param {mixed} filters
     * @return {void}
     */
    const handleTableChange = (pagination, filters) => {
        let { status } = filters;
        setKeySearch({...keySearch, status });
        get_groups(pagination.current, {...keySearch, status});
    }

    useEffect(() => {
        if(mouted) get_modules();
        return () => {set_mouted(false);}
    }, []);

    return (
        <div className="content">
            <Table
                title={(() => (
                    <Row gutter={[8, 8]}>
                        <Col xs={24} xl={12}>
                            <Button
                                type="primary"
                                onClick={() => {new_module()}}
                            >
                                New Module
                            </Button>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Search placeholder="Search by name !!!"
                                // onChange={(event) => {
                                //     let { value } = event.target;
                                //     setkeySearch({...keySearch, keyword: value});
                                // }}
                                // onSearch={()=>{
                                //     getGroups(1, keySearch);
                                // }}
                                // enterButton
                            />
                        </Col>
                    </Row>
                ))}
                columns={columns}
                bordered={true}
                loading={loading_table}
                dataSource={modules}
                pagination={pagination}
                scroll={{ x: 960 }}
                onChange={handleTableChange} // Callback executed when pagination, filters or sorter is changed
                rowKey='name'
            />
            <ActionModule group={module} visible={viewAction} setDrawer={setViewAction}/>
        </div>
    );
}

export default ListModules;
