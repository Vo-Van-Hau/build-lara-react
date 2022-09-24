import React from "react";
import { Select } from "antd";

const MySelect = props => {
    return (
        <Select
            defaultValue={props.value}
            style={{ width: 120 }}
            onChange={props.setFieldValue}
        >
            {props.options.map(lang => (
                <Select.Option key={lang} value={lang}>
                    {lang}
                </Select.Option>
            ))}
        </Select>
    );
};

export default MySelect;
