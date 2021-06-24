import React, { useState } from 'react';
import { Cell, Input } from "zarm";
import { customZaCellHelp, requiredTitle } from "@/utils/zarm";
import {Form} from "antd";
import type {NamePath} from "rc-field-form/lib/interface";
import { customZaCellValidator } from "@/utils/validate";
import type {Rule} from "rc-field-form/lib/interface";

interface ZaCellInputProps {
  name: NamePath;
  title: string;
  required: boolean;
  customRule?: () => boolean;
  customRuleTip?: string
}

const ZaCellInput: React.FC<ZaCellInputProps> = (props) => {
  const { name, title, required, customRule, customRuleTip } = props;
  const [ errors, setErrors ] = useState<string>();

  return (
    <>
      <Cell title={required ? requiredTitle(title) : title} help={customZaCellHelp(errors)}>
        <Form.Item
          name={name}
          isListField={true}
          rules={[{
            validator: async (_, value) => customZaCellValidator(setErrors, value, required, customRule, customRuleTip),
          }]}
          noStyle
        >
          <Input clearable type="text" placeholder="请输入工作单位" />
        </Form.Item>
      </Cell>
    </>
  );
};


export default ZaCellInput;
