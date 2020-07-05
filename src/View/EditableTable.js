import React, { useState } from 'react';
import { Col, Row, Table, Form, Button } from "antd";
import EditableCell from "../Component/EditableCell";

const EditableTable = () => {
    const originData = {
        id: '',
        name: 'Khali Zhang',
        location: 'Shanghai',
        office: 'C-103',
        phoneOffice: 'x55778',
        phoneCell: '650-353-1239'
    }
    const [form] = Form.useForm();
    const [data, setData] = useState([{ ...originData, id: '501', key: 0 }]);
    const [selectedKeys, setSelectedKeys] = useState([])

    function addRow() {
        const newAdd = {
            ...originData,
            key: data.length > 0 ? Math.max(...data.map(d => d.key)) + 1 : 0
        }
        setData([
            ...data,
            newAdd
        ]);
    }

    function deleteRows() {
        const newData = data.filter(d => !selectedKeys.includes(d.key))
        setData(newData);
        setSelectedKeys([])
    }

    function updateRows() {
        alert(JSON.stringify(data))
    };

    function updateCell(key){
        const newData = [...data]
        const index = newData.findIndex(item => item.key === key)
        newData[index] = {
            ...newData[index],
            ...form.getFieldsValue()
        }
        console.log(newData)
        setData(newData)
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            editable: false,
            className: "green-col",
            sorter: (a, b) => a.id > b.id
        },
        {
            title: 'Name',
            dataIndex: 'name',
            editable: false,
            className: "green-col",
            sorter: (a, b) => a.name > b.name
        },
        {
            title: 'Location',
            dataIndex: 'location',
            editable: false,
            className: "green-col",
            sorter: (a, b) => a.location > b.location
        },
        {
            title: 'Office',
            dataIndex: 'office',
            editable: false,
            className: "green-col",
            sorter: (a, b) => a.office > b.office
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            className: "green-col",
            children: [
                {
                    title: 'Office',
                    dataIndex: 'phoneOffice',
                    key: 'phoneOffice',
                    editable: false,
                    className: "green-col",
                    sorter: (a, b) => a.phoneOffice > b.phoneOffice,
                },
                {
                    title: 'Cell',
                    dataIndex: 'phoneCell',
                    key: 'phoneCell',
                    editable: true,
                    className: "green-col",
                    sorter: (a, b) => a.phoneCell > b.phoneCell,
                }
            ]
        },
    ];

    const finalColumns = columns.reduce((cols, curCol) => {
        if (curCol.children) {
            cols.push({
                ...curCol,
                children: (curCol.children || []).map(col => {
                    return {
                        ...col,
                        onCell: (record) => ({
                            record,
                            dataIndex: col.dataIndex,
                            form: form,
                            editable: col.editable,
                            updateCell:updateCell
                        })
                    };
                })
            });
        } else {
            cols.push({
                ...curCol,
                onCell: (record) => ({
                    record,
                    dataIndex: curCol.dataIndex,
                    editable: curCol.editable,
                    form: form
                })
            });
        }
        return cols
    }, []);

    return (
        <div className='editable-table'>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    rowSelection={{
                        selectedRowKeys: selectedKeys,
                        onChange: (selectedRowKeys) => {
                            console.log('selectedRowKeys changed: ', selectedRowKeys);
                            setSelectedKeys(selectedRowKeys);
                        },
                    }}
                    bordered
                    size='small'
                    dataSource={data}
                    columns={finalColumns}
                    pagination={false}
                />
            </Form>
            <Row style={{ marginTop: "40px" }}>
                <Col span={18}>
                    <Button className="red-btn" onClick={deleteRows}>Delete</Button>
                </Col>
                <Col span={3}>
                    <Button className="yellow-btn" onClick={updateRows}>Update</Button>
                </Col>
                <Col span={3} style={{textAlign:'right'}}>
                    <Button className="yellow-btn" onClick={addRow}>Add</Button>
                </Col>
            </Row>
        </div>
    );
};

export default EditableTable