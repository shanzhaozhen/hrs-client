import type { ReactNode } from 'react';
import React from 'react';
import {Cell, Switch} from "zarm";
import { requiredTitle } from "@/utils/zarm";
import {Form} from "antd";
import type {NamePath} from "rc-field-form/lib/interface";
import type {Rule} from "rc-field-form/lib/interface";

export interface ZaSwitchProps {
  defaultChecked?: boolean;
  checked?: boolean;
}

interface ZaCellSwitchProps {
  name: NamePath;
  title?: string;
  required?: boolean;
  help?: ReactNode;
  rules?: Rule[];
  validateTrigger?: string | string[]
  zaSwitchProps?: ZaSwitchProps;
}

const ZaCellSwitch: React.FC<ZaCellSwitchProps> = (props) => {
  const { name, title, required, help, rules, validateTrigger, zaSwitchProps } = props;

  return (
    <>
      <Cell title={required ? requiredTitle(title) : title} help={help}>
        <Form.Item name={name} rules={rules} validateTrigger={validateTrigger} noStyle>
          <Switch {...zaSwitchProps} />
        </Form.Item>
      </Cell>
    </>
  );
};

ZaCellSwitch.defaultProps = {
  validateTrigger: ['onChange', 'onBlur'],
};

export default ZaCellSwitch;
