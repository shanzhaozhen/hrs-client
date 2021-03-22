import React from 'react';
import { TreeSelect } from 'antd';
import type { DataNode } from 'rc-tree/lib/interface';

interface FormTreeSelectProps {
  placeholder?: string;
  value?: any;
  checkStrictly?: boolean;
  treeData?: DataNode[];
  onChange?: (value: any) => void;
}

const FormTreeSelect: React.FC<FormTreeSelectProps> = (props) => {
  const { placeholder, value, treeData, onChange } = props;

  const triggerChange = (changeValue: number[]) => {
    onChange?.(changeValue);
  };

  return (
    <TreeSelect
      showSearch
      allowClear
      style={{ width: '100%' }}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      value={value}
      treeData={treeData}
      onChange={triggerChange}
      placeholder={placeholder}
    />
  );
};

FormTreeSelect.defaultProps = {
  checkStrictly: true,
};

export default FormTreeSelect;
