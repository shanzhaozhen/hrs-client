import React  from 'react';
import {ProFormText} from "@ant-design/pro-form";

interface FormProps {
  value?: any
}

const MethodParamInfo: React.FC<FormProps> = (props) => {
  const { value } = props

  const paramInfo = value ? JSON.parse(value) : [];

  const paramInfoOnChange = (changeValue: string) => {
    console.log(changeValue)
  }

  const form = paramInfo.map((item: { paramType: string; paramValue: string; }) => {
    return (
      <ProFormText fieldProps={
        {
          prefix: item.paramType,
          defaultValue: item.paramValue,
          onChange: paramInfoOnChange
        }}
      />
    )
  });

  return (
    <>
      {form}
    </>
  );
};

export default MethodParamInfo;
