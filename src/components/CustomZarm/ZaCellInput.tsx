import React, { useState} from 'react';
import type {ReactNode} from 'react';
import { Cell, Input } from "zarm";
import { requiredTitle } from "@/utils/zarm";
import {Form} from "antd";
import type {NamePath} from "rc-field-form/lib/interface";

interface ZaCellInputProps {
  name: NamePath;
  title: string;
  required: boolean
}

const ZaCellInput: React.FC<ZaCellInputProps> = (props) => {
  const { name, title, required } = props;

  const [ help, setHelp ] = useState<ReactNode>(null);

  return (
    <>
      <Cell title={required ? requiredTitle(title) : title} help={help}>
        <Form.Item
          name={name}
          isListField={true}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            },
          ]}
          noStyle
        >
          <Input clearable type="text" placeholder="请输入工作单位" />
        </Form.Item>
      </Cell>
    </>
  );
};


export default ZaCellInput;
