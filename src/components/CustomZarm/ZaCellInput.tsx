import type { ReactNode } from 'react';
import React from 'react';
import { Cell, Input } from "zarm";
import { requiredTitle } from "@/utils/zarm";
import {Form} from "antd";
import type {NamePath} from "rc-field-form/lib/interface";
import type {Rule} from "rc-field-form/lib/interface";

interface ZaCellInputProps {
  name: NamePath;
  title?: string;
  type?: 'text' | 'search' | 'password' | 'number' | 'price' | 'idcard';
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  help?: ReactNode;
  rules?: Rule[];
}

const ZaCellInput: React.FC<ZaCellInputProps> = (props) => {
  const { name, title, type, placeholder, clearable, disabled, required, help, rules } = props;

  return (
    <>
      <Cell title={required ? requiredTitle(title) : title} help={help}>
        <Form.Item name={name} rules={rules} noStyle>
          <Input clearable={clearable} type={type} placeholder={placeholder} disabled={disabled} />
        </Form.Item>
      </Cell>
    </>
  );
};


export default ZaCellInput;
