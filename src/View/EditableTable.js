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
    const [editingKey, setEditingKey] = useState('');
    const rowSelection = {
        selectedKeys,
        onChange: (selectedRowKeys) => {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            setSelectedKeys(selectedRowKeys);
        },
    };
    const edit = record => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    function addRow() {
        data.push({
            ...originData,
            key: Math.max(...data.map(d => d.key))
        })
        setData(data);
    }

    function deleteRows() {
        const newData = data.filter(d => !selectedKeys.includes(d.key))
        setData(newData);
        setSelectedKeys([])
    }

    function cancel() {
        setEditingKey('');
    };

    async function updateRows(key) {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                cancel();
            } else {
                newData.push(row);
                setData(newData);
                cancel();
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 80,
            editable: false,
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: 100,
            editable: false,
            sorter: (a, b) => a.name - b.name
        },
        {
            title: 'Location',
            dataIndex: 'location',
            width: 100,
            editable: false,
            sorter: (a, b) => a.location - b.location
        },
        {
            title: 'Office',
            dataIndex: 'office',
            width: 100,
            editable: false,
            sorter: (a, b) => a.office - b.office
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            children: [
                {
                    title: 'Office',
                    dataIndex: 'phoneOffice',
                    key: 'phoneOffice',
                    editable: false,
                    sorter: (a, b) => a.phoneOffice - b.phoneOffice,
                    width: 100
                },
                {
                    title: 'Cell',
                    dataIndex: 'phoneCell',
                    key: 'phoneCell',
                    editable: true,
                    sorter: (a, b) => a.phoneCell - b.phoneCell,
                    width: 100
                }
            ]
        },
    ];

    const finalColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                form: form,
            }),
        };
    });
    return (
        <div>
            <Form form={form}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    rowSelection={rowSelection}
                    bordered
                    dataSource={data}
                    columns={finalColumns}
                    rowClassName="editable-row"
                />
            </Form>
            <Row>
                <Col span={16}>
                    <Button onClick={deleteRows}>Delete</Button>
                </Col>
                <Col span={4}>
                    <Button onClick={updateRows}>Update</Button>
                </Col>
                <Col span={4}>
                    <Button onClick={addRow}>Add</Button>
                </Col>
            </Row>
        </div>
    );
};

export default EditableTable