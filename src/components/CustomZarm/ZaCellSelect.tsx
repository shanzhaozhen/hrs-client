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
  zaSelectProps?: ZaSelectProps
}

const ZaCellSelect: React.FC<ZaCellSelectProps> = (props) => {
  const { name, title, required, help, rules, zaSelectProps } = props;

  return (
    <>
      <Cell title={required ? requiredTitle(title) : title} help={help}>
        <Form.Item name={name} rules={rules} noStyle>
          <ZaSelect {...zaSelectProps} />
        </Form.Item>
      </Cell>
    </>
  );
};


export default ZaCellSelect;
