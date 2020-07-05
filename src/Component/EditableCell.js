import React, { useState, useRef, useEffect } from 'react';
import { Form, Input } from "antd";

const EditableCell = ({
    dataIndex,
    form,
    record,
    children,
    editable,
    updateCell,
}) => {
    const editRef = useRef(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (editing && editRef.current) {
            editRef.current.focus()
        }
    }, [editing]);

    function toEdit(record) {
        setEditing(true);
        form.setFieldsValue({
            phoneCell: '',
            ...record,
        });
    };

    function toUpdate() {
        updateCell(record.key)
        setEditing(false);
    }

    return (
        <td>
            {
                editable ? (
                    <div>
                        {
                            editing ? (
                                <Form.Item name={dataIndex} style={{ marginBottom: '0px' }}>
                                    <Input ref={editRef} style={{width: '140px'}} onBlur={toUpdate} />
                                </Form.Item>
                            ) : (
                                    <div onDoubleClick={() => toEdit(record)} style={{ width: '140px', height: '21px' }}>
                                        {children}
                                    </div>
                                )
                        }
                    </div>) : (
                        children
                    )
            }
        </td>
    );
};

export default EditableCell