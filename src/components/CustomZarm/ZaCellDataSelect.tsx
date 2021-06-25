import type { ReactNode } from 'react';
import React from 'react';
import { Cell, DateSelect } from "zarm";
import { requiredTitle } from "@/utils/zarm";
import { Form } from "antd";
import type {NamePath} from "rc-field-form/lib/interface";
import type {Rule} from "rc-field-form/lib/interface";

interface ZaCellDataSelectProps {
  name: NamePath;
  title?: string;
  required?: boolean;
  help?: ReactNode;
  rules?: Rule[];
  trigger?: string;

  dateSelect?: {
    placeholder?: string;
    format?: string;
    mode?: string;
    min?: string;
    max?: string;
    hasArrow?: boolean;
  };
}

const ZaCellDataSelect: React.FC<ZaCellDataSelectProps> = (props) => {
  const { name, title, required, help, rules, trigger, dateSelect } = props;

  return (
    <>
      <Cell title={required ? requiredTitle(title) : title} help={help}>
        <Form.Item name={name} rules={rules} trigger={trigger} noStyle>
          <DateSelect {...dateSelect} title={title} />
        </Form.Item>
      </Cell>
    </>
  );
};


export default ZaCellDataSelect;
