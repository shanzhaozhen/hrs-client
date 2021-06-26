import type { ReactNode } from 'react';
import React from 'react';
import { Cell, DateSelect } from "zarm";
import { requiredTitle } from "@/utils/zarm";
import { Form } from "antd";
import type {NamePath} from "rc-field-form/lib/interface";
import type {Rule} from "rc-field-form/lib/interface";

interface ZaDateSelectProps {
  placeholder?: string;
  format?: string;
  mode?: string;
  min?: string;
  max?: string;
  hasArrow?: boolean;
}

interface ZaCellDataSelectProps {
  name: NamePath;
  title?: string;
  required?: boolean;
  help?: ReactNode;
  rules?: Rule[];
  trigger?: string;
  validateTrigger?: string | string[]
  zaDateSelectProps?: ZaDateSelectProps;
}

const ZaCellDataSelect: React.FC<ZaCellDataSelectProps> = (props) => {
  const { name, title, required, help, rules, trigger, validateTrigger, zaDateSelectProps } = props;

  return (
    <>
      <Cell title={required ? requiredTitle(title) : title} help={help}>
        <Form.Item name={name} rules={rules} trigger={trigger} validateTrigger={validateTrigger} noStyle>
          <DateSelect {...zaDateSelectProps} title={title} />
        </Form.Item>
      </Cell>
    </>
  );
};

ZaCellDataSelect.defaultProps = {
  validateTrigger: ['onChange', 'onBlur'],
};

export default ZaCellDataSelect;
