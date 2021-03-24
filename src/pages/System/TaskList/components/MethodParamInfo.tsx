import React, {useEffect, useState} from 'react';
import {ProFormText} from "@ant-design/pro-form";
import {Space} from "antd";

interface FormProps {
  onChange?: (value: any) => void;
  value?: any
}

interface ParamInfo {
  paramType?: string;
  paramValue?: string;
}

const MethodParamInfo: React.FC<FormProps> = (props) => {
  const { onChange, value } = props

  const [paramInfo, setParamInfo] = useState<ParamInfo[]>();

  useEffect(() => {
    if (value) {
      setParamInfo(JSON.parse(value))
    } else {
      setParamInfo([])
    }
  }, [value]);

  const form = () => {
    // if (value && paramInfo) {
    return (paramInfo && paramInfo.length > 0) ? (
      paramInfo.map((item, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <ProFormText key={index} fieldProps={
          {
            addonBefore: item.paramType,
            defaultValue: item.paramValue,
            type: "text",
            onChange: ({ target }) => {
              paramInfo[index].paramValue = target.value;
              console.log(paramInfo);
              onChange?.(JSON.stringify(paramInfo));
            }
          }}
        />
      ))
    ) : (
      <Space>（无）</Space>
    )
    // }
    // return <Space>（无）</Space>
  };

  return (
    <>
      {form()}
    </>
  );
};

export default MethodParamInfo;
