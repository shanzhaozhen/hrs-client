import type { ReactNode } from 'react';
import React from 'react';
import { Cell } from "zarm";
import { requiredTitle } from "@/utils/zarm";
import { Form } from "antd";
import type {NamePath} from "rc-field-form/lib/interface";
import type {Rule} from "rc-field-form/lib/interface";
import type {ZaSelectProps} from "@/components/CustomZarm/ZaSelect";
import ZaSelect from "@/components/CustomZarm/ZaSelect";

interface ZaCellSelectProps {
  name: NamePath;
  title?: string;
  required?: boolean;
  help?: ReactNode;
  rules?: Rule[];
  validateTrigger?: string | string[]
  zaSelectProps?: ZaSelectProps
}

const ZaCellSelect: React.FC<ZaCellSelectProps> = (props) => {
  const { name, title, required, help, rules, validateTrigger, zaSelectProps } = props;

  return (
    <>
      <Cell title={required ? requiredTitle(title) : title} help={help}>
        <Form.Item name={name} rules={rules} validateTrigger={validateTrigger} noStyle>
          <ZaSelect {...zaSelectProps} />
        </Form.Item>
      </Cell>
    </>
  );
};

ZaCellSelect.defaultProps = {
  validateTrigger: ['onChange', 'onBlur'],
};

export default ZaCellSelect;
