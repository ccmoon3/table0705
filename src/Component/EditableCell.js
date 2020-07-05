import React, { useState } from 'react';
import { Form, Input } from "antd";

const EditableCell = ({
    dataIndex,
    title,
    record,
    index,
    children,
    form,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    // useEffect(() => {
    //     if (editing) {
    //         inputRef.current.focus();
    //     }
    // }, [editing]);

    function toggleEdit() {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    return (
        <td {...restProps}>
            {dataIndex === 'phoneCell' ? (
                <div>
                    {
                        editing ? (
                            <Form.Item name={dataIndex}>
                                <Input /*onPressEnter={save} onBlur={save}*/ />
                            </Form.Item>
                        ) : (
                                <div
                                    className="editable-cell-value-wrap"
                                    onDoubleClick={toggleEdit}
                                >
                                    {children}
                                </div>
                            )
                    }
                </div>) : (
                    children
                )}
        </td>
    );
};

export default EditableCell