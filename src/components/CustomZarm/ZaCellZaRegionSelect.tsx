import type { ReactNode } from 'react';
import React from 'react';
import { Form } from "antd";
import type {NamePath} from "rc-field-form/lib/interface";
import type {Rule} from "rc-field-form/lib/interface";
import type {ZaRegionSelectProps} from "@/components/CustomZarm/ZaRegionSelect";
import ZaRegionSelect from "@/components/CustomZarm/ZaRegionSelect";

interface ZaCellZaRegionSelectProps {
  name: NamePath;
  required?: boolean;
  help?: ReactNode;
  rules?: Rule[];
  validateTrigger?: string | string[]
  zaRegionSelectProps: ZaRegionSelectProps
}

const ZaCellZaRegionSelect: React.FC<ZaCellZaRegionSelectProps> = (props) => {
  const { name, help, rules, validateTrigger, zaRegionSelectProps } = props;

  return (
    <>
      <Form.Item
        name={name}
        validateTrigger={validateTrigger}
        rules={rules}
        noStyle
      >
        <ZaRegionSelect {...zaRegionSelectProps} required={true} help={help} />
      </Form.Item>
    </>
  );
};

ZaCellZaRegionSelect.defaultProps = {
  validateTrigger: ['onChange', 'onBlur'],
};

export default ZaCellZaRegionSelect;
