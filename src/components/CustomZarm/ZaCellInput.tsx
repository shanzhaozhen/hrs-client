import type { ReactNode } from 'react';
import React from 'react';
import { Cell, Input } from "zarm";
import { requiredTitle } from "@/utils/zarm";
import {Form} from "antd";
import type {NamePath} from "rc-field-form/lib/interface";
import type {Rule} from "rc-field-form/lib/interface";

export interface ZaInputProps {
  type?: 'text' | 'search' | 'password' | 'number' | 'price' | 'idcard';
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

interface ZaCellInputProps {
  name: NamePath;
  title?: string;
  required?: boolean;
  help?: ReactNode;
  rules?: Rule[];
  validateTrigger?: string | string[]
  zaInputProps: ZaInputProps;
}

const ZaCellInput: React.FC<ZaCellInputProps> = (props) => {
  const { name, title, required, help, rules, validateTrigger, zaInputProps } = props;

  return (
    <>
      <Cell title={required ? requiredTitle(title) : title} help={help}>
        <Form.Item name={name} rules={rules} validateTrigger={validateTrigger} noStyle>
          <Input {...zaInputProps} />
        </Form.Item>
      </Cell>
    </>
  );
};

ZaCellInput.defaultProps = {
  validateTrigger: ['onChange', 'onBlur'],
};

export default ZaCellInput;
