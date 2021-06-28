import type { ReactNode } from 'react';
import React from 'react';
import { Form } from "antd";
import type {NamePath} from "rc-field-form/lib/interface";
import type {Rule} from "rc-field-form/lib/interface";
import type {ZaOtherSelectProps} from "@/components/CustomZarm/ZaOtherSelect";
import ZaOtherSelect from "@/components/CustomZarm/ZaOtherSelect";

interface ZaCellOtherSelectProps {
  name: NamePath;
  required?: boolean;
  help?: ReactNode;
  rules?: Rule[];
  validateTrigger?: string | string[]
  zaOtherSelectProps?: ZaOtherSelectProps
}

const ZaCellOtherSelect: React.FC<ZaCellOtherSelectProps> = (props) => {
  const { name, help, required, rules, validateTrigger, zaOtherSelectProps } = props;

  return (
    <>
      <Form.Item
        name={name}
        validateTrigger={validateTrigger}
        rules={rules}
        noStyle
      >
        <ZaOtherSelect {...zaOtherSelectProps} required={required} help={help} />
      </Form.Item>
    </>
  );
};

ZaCellOtherSelect.defaultProps = {
  validateTrigger: ['onChange', 'onBlur'],
};

export default ZaCellOtherSelect;
