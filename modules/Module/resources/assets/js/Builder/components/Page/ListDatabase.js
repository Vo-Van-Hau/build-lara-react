import { useState, useEffect, useContext } from 'react';
import { Table, Space, Popconfirm, Input, Button, Row, Col, Tooltip } from 'antd';
import { BuilderContext } from '../Contexts/BuilderContext';
import { EditOutlined, ToolOutlined, ThunderboltOutlined } from '@ant-design/icons';
import DrawerTableUpsert from '../Actions/Drawers/DrawerTableUpsert';
import Helper from '../Helper/Helper';
const { Search } = Input;

const ListDatabase = ({keyID}) => {
    const { data, set_mouted, set_table_loading, get_databases, setRouter } = useContext(BuilderContext);
    const { config, mouted, databases, loading_table, pagination } = data;
    const [table, setTable] = useState({});
    const [viewAction, setViewAction] = useState(false);
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
            ellipsis: true
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
    const new_table = () => {
        setTable({});
        setViewAction(true);
    }

     /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return {void}
     */
    const repair_tables = () => {
        set_table_loading();
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
        if(keyID && mouted) {
            if(mouted) get_databases(keyID);
            return () => {set_mouted(false);}
        }
    }, []);

    return (
        <div className="content">
            <Table
                title={(() => (
                    <Row gutter={[8, 8]}>
                        <Col xs={24} xl={12}>
                            <Space>
                                <Button type="primary" onClick={() => {new_table()}}>New Table (SQL)</Button>
                                <Button type="primary" onClick={() => {repair_tables()}}>Repair Tables</Button>
                            </Space>
                        </Col>
                        <Col xs={24} xl={12}></Col>
                    </Row>
                ))}
                columns={columns}
                bordered={true}
                loading={loading_table}
                dataSource={databases}
                pagination={pagination}
                scroll={{ x: 960 }}
                onChange={handleTableChange} // Callback executed when pagination, filters or sorter is changed
                rowKey='name'
            />
            <DrawerTableUpsert module={keyID} table={table} visible={viewAction} setDrawer={setViewAction}/>
        </div>
    );
}

export default ListDatabase;
