import React from 'react';
import type {DataSource} from "zarm/types/picker-view/PropsType";
import { Select } from "zarm";

interface ZarmSelectProps {
  dataSource?: DataSource;
  multi?: boolean;
  valueField?: string;
  hasArrow?: boolean;
  displayRender?: (selected: any) => any;
  placeholder?: string;
  defaultValue?: any;
  value?: any;
  onChange?: (value: any) => void;
}

const ZarmSelect: React.FC<ZarmSelectProps> = (props) => {
  const { dataSource, hasArrow, placeholder, multi, valueField, defaultValue, value, onChange } = props;

  return (
    <>
      <Select
        dataSource={dataSource}
        defaultValue={value || defaultValue}
        hasArrow={hasArrow}
        placeholder={placeholder}
        onOk={(selected: any[]) => {
          if (multi) {
            onChange?.(selected.map((item) => item[valueField || 'value']))
          } else {
            onChange?.(selected.length > 0 ? selected[0][valueField || 'value'] : undefined)
          }
        }}
      />
    </>
  );
};


export default ZarmSelect;
