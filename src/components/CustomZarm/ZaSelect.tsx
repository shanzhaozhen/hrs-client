import React from 'react';
import type {DataSource} from "zarm/types/picker-view/PropsType";
import { Select } from "zarm";

export interface ZaSelectProps {
  dataSource?: DataSource;
  multi?: boolean;
  valueMember?: string;
  hasArrow?: boolean;
  displayRender?: (selected: any) => any;
  placeholder?: string;
  defaultValue?: any;
  value?: any;
  onChange?: (value: any) => void;
}

const ZaSelect: React.FC<ZaSelectProps> = (props) => {
  const { dataSource, hasArrow, placeholder, multi, valueMember, displayRender, defaultValue, value, onChange } = props;

  return (
    <>
      <Select
        dataSource={dataSource}
        defaultValue={value || defaultValue}
        hasArrow={hasArrow}
        placeholder={placeholder}
        displayRender={displayRender}
        valueMember={valueMember}
        onOk={(selected: any[]) => {
          if (multi) {
            onChange?.(selected.map((item) => item[valueMember || 'value']))
          } else {
            onChange?.(selected.length > 0 ? selected[0][valueMember || 'value'] : undefined)
          }
        }}
      />
    </>
  );
};


export default ZaSelect;
