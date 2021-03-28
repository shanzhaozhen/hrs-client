import React from 'react';
import { TreeSelect } from 'antd';
import type { DataNode } from 'rc-tree/lib/interface';
import type { LegacyDataNode } from "rc-tree-select/lib/interface";

interface FormTreeSelectProps {
  placeholder?: string;
  checkStrictly?: boolean;
  loadData?: (dataNode: LegacyDataNode) => Promise<unknown>;
  treeData?: DataNode[];
  onChange?: (value: any) => void;
  value?: any;
}

const FormTreeSelect: React.FC<FormTreeSelectProps> = (props) => {
  const { placeholder, loadData, treeData, onChange, value } = props;

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
      loadData={loadData}
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
