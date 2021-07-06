import React, {useEffect, useState} from 'react';
import {Space, TreeSelect } from 'antd';
import type { DataNode } from 'rc-tree/lib/interface';
import type { LegacyDataNode } from "rc-tree-select/lib/interface";
import {getTreeValue} from "@/utils/tree";

interface FormTreeSelectProps {
  placeholder?: string;
  treeNodeFilterProp?: string;
  loadData?: (dataNode: LegacyDataNode) => Promise<unknown>;
  treeData?: DataNode[];
  onChange?: (value: any) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  readonly?: boolean;
  value?: any;
}

const FormTreeSelect: React.FC<FormTreeSelectProps> = (props) => {
  const { placeholder, treeNodeFilterProp, loadData, treeData, onChange, disabled, readonly, style, value } = props;

  const [ viewText, setViewText ] = useState<React.ReactNode>();

  useEffect(() => {
    if (readonly) {
      setViewText(getTreeValue(value, treeData))
    }
    return () => setViewText(value);
  }, [readonly, treeData, value])

  const triggerChange = (changeValue: number[]) => {
    onChange?.(changeValue);
  };

  return (readonly ? (
    <Space>{viewText}</Space>
  ) : (
    <TreeSelect
      showSearch
      allowClear
      style={{
        width: '100%',
        ...style
      }}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      value={value}
      loadData={loadData}
      treeData={treeData}
      onChange={triggerChange}
      treeNodeFilterProp={treeNodeFilterProp}
      placeholder={placeholder}
      disabled={disabled}
    />
  ));
};

export default FormTreeSelect;
