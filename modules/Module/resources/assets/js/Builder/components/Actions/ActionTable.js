import { useState, useEffect, useContext } from 'react';
import { Table, Space, Popconfirm, Input, Button, Row, Col, Tooltip } from 'antd';
import { EditOutlined, ToolOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { BuilderContext } from '../Contexts/BuilderContext';
import DrawerColumnUpsert from './Drawers/DrawerColumnUpsert';
import Helper from '../Helper/Helper';
const { Search } = Input;

const ActionTable = ({keyID, moduleID}) => {
    const { data, set_mouted, set_table_loading, get_table, setRouter } = useContext(BuilderContext);
    const { config, mouted, table, loading_table, pagination } = data;
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
            render: (_, table) => {
                return (
                    <Space size={5}>
                        <Tooltip title="Edit Table (SQL)">
                            <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => edit_table(table)}></Button>
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
     const new_column = () => {
        setViewAction(true);
     }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: update an existed record
     * @param {Object} record
     * @return {void}
     */
     const edit_table = (table) => {
        setTable(table);
        return setRouter({action: 'edit_table', id: table.name, module: table.module});
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
            <DrawerColumnUpsert module={moduleID} table={{...table, name: keyID}} visible={viewAction} setDrawer={setViewAction}/>
        </div>
    );
}

export default ActionTable;
