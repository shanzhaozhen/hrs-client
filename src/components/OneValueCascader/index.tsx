import React, { useEffect, useState } from 'react';
import { Cascader } from 'antd';
import type { CascaderProps, CascaderValueType, CascaderOptionType } from 'antd/lib/cascader';

interface OneValueCascaderProps {
  cascaderProps: CascaderProps;
  customValue?: string | number;
  readonly?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

const OneValueCascader: React.FC<OneValueCascaderProps> = (props) => {
  const { cascaderProps, customValue, readonly, value, onChange } = props;

  const [currentValue, setCurrentValue] = useState<(string | number)[]>([]);

  const options = cascaderProps?.options || [];

  const dfsOptions = (treeOptions: CascaderOptionType[], selectValue: string | number) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of treeOptions) {
      if (item.value === selectValue) {
        setCurrentValue([selectValue]);
        return;
      }
      if (item.children && item.children.length > 0) {
        dfsOptions(item.children, selectValue);
        if (currentValue.slice(-1)[0] === selectValue) {
          setCurrentValue((origin) => {
            const result = [...origin];
            result.unshift(item.value || '');
            return result;
          });
          return;
        }
      }
    }
  };

  dfsOptions(options, '');

  useEffect(() => {
    dfsOptions(options, value);
  }, []);

  const triggerChange = (changeValue: CascaderValueType) => {
    onChange?.(changeValue.slice(-1));
  };

  return (
    <>
      {readonly ? (
        <div>{customValue}</div>
      ) : (
        <Cascader {...cascaderProps} defaultValue={currentValue} onChange={triggerChange} />
      )}
    </>
  );
};

export default OneValueCascader;
