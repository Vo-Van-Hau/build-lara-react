import { useState, useEffect, useContext } from 'react';
import { Table, Space, Popconfirm, Input, Button, Row, Col, Tooltip } from 'antd';
import { EditOutlined, ToolOutlined, ThunderboltOutlined, DeleteOutlined } from '@ant-design/icons';
import { BuilderContext } from '../Contexts/BuilderContext';
import DrawerColumnUpsert from './Drawers/DrawerColumnUpsert';
import Helper from '../Helper/Helper';
const { Search } = Input;

const ActionTable = ({keyID, moduleID}) => {
    const { data, set_mouted, set_table_loading, get_table, setRouter, delete_column } = useContext(BuilderContext);
    const { config, mouted, table, loading_table, pagination } = data;
    const [column, setColumn] = useState({});
    const [viewAction, setViewAction] = useState(false);
    const [keySearch, setKeySearch] = useState({
        keyword: null,
        status: null
    });
    const columns = [
        {
            title: 'Field name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            ellipsis: true
        },
        {
            title: 'Field type',
            dataIndex: 'type',
            key: 'type',
            fixed: 'left',
            ellipsis: true
        },
        {
            title: 'Not null',
            fixed: 'left',
            ellipsis: true,
            render: (_, record) => {
                return (
                    <>
                        { record.not_null ? 'TRUE' : 'FALSE'}
                    </>
                )
            }
        },
        {
            title: 'Field size',
            dataIndex: 'size',
            key: 'size',
            fixed: 'left',
            ellipsis: true
        },
        {
            title: 'Field default',
            dataIndex: 'default',
            key: 'default',
            fixed: 'left',
            ellipsis: true,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {
                return (
                    <Space size={5}>
                        <Tooltip title="Edit Column (SQL)">
                            <Button size="small" icon={<EditOutlined />} onClick={() => edit_column(record)}></Button>
                        </Tooltip>
                        <>||</>
                        <Popconfirm title="Sure to delete?" placement="leftTop" onConfirm={() => remove_column(record)}>
                            <Button  size="small" danger icon={<DeleteOutlined />} />
                        </Popconfirm>
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
     const new_column = () => {
        setColumn({});
        setViewAction(true);
     }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: update an existed record
     * @param {Object} record
     * @return {void}
     */
     const edit_column = (record) => {
        setColumn(record);
        setViewAction(true);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: remove an existed record
     * @param {Object} record
     * @return {void}
     */
    const remove_column = (record) => {
        console.log(record);
        record.module = moduleID ? moduleID : null;
        record.table = keyID ? keyID : null;
        record.field_name = record.name ? record.name : null;
        delete_column(record)
        .then((res) => {
            let { status, message } = res.data;
            if (status) {
                get_table(keyID, moduleID);
                Helper.Notification('success', '[Delete Column]', message);
            } else {
                Helper.Notification('success', '[Delete Column]', message);
            }
            consolr.log(res);
        })
        .catch((errors) => {})
        .finally(() => {});
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
        if(keyID && moduleID && mouted) {
            if(mouted) get_table(keyID, moduleID);
            return () => {set_mouted(false);}
        }
    }, []);

    return (
        <div className="content">
            <Table
                title={(() => (
                    <Row gutter={[8, 8]}>
                        <Col xs={24} xl={12}>
                            <Button
                                type="primary"
                                onClick={() => {new_column()}}
                            >
                                New Column (SQL)
                            </Button>
                        </Col>
                        <Col xs={24} xl={12}></Col>
                    </Row>
                ))}
                columns={columns}
                bordered={true}
                loading={loading_table}
                dataSource={table.fields}
                pagination={pagination}
                scroll={{ x: 960 }}
                onChange={handleTableChange} // Callback executed when pagination, filters or sorter is changed
                rowKey='name'
            />
            <DrawerColumnUpsert module={moduleID} table={{...table, name: keyID}} column={column} visible={viewAction} setDrawer={setViewAction}/>
        </div>
    );
}

export default ActionTable;
