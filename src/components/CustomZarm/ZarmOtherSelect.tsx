import React, {useEffect, useState} from 'react';
import ZarmSelect from "@/components/CustomZarm/ZarmSelect";
import {Cell, Input} from "zarm";
import type {DataSource} from "zarm/types/picker-view/PropsType";

interface ZarmOtherSelectProps {
  title?: string;
  dataSource?: DataSource;
  valueField?: string;
  value?: any;
  onChange?: (value: any) => void;
}

const ZarmOtherSelect: React.FC<ZarmOtherSelectProps> = (props) => {
  const { title, dataSource, valueField, value, onChange } = props;

  const [ options ] = useState<any[]>(() => {
    const newVar = dataSource || [];
    newVar.push({ label: '其他', value: 'other' });
    return newVar;
  });

  const [ showInput, setShowInput ] = useState<boolean>(false);
  const [ selectValue, setSelectValue ] = useState<any>();
  const [ inputValue, setInputValue ] = useState<any>();

  useEffect(() => {
    if (value) {
      if ((dataSource || []).map(item => item.value).indexOf(value) > -1) {
        setShowInput(false);
        setSelectValue(value);
      } else {
        setSelectValue('other');
        setInputValue(value);
        setShowInput(true);
      }
    } else {
      setShowInput(false);
    }
  }, [])

  const onSelectChange = (changeValue: any) => {
    if (changeValue === 'other') {
      setShowInput(true);
      onChange?.('');
    } else {
      setShowInput(false);
      onChange?.(changeValue);
    }
  }

  const onInputChange = (changeValue: any) => {
    onChange?.(changeValue);
  }

  return (
    <>
      <Cell title={title}>
        <ZarmSelect
          defaultValue={selectValue}
          valueField={valueField}
          dataSource={options}
          onChange={onSelectChange}
        />
      </Cell>
      {
        showInput ? (
          <Cell title=" ">
            <Input
              defaultValue={inputValue}
              placeholder={`请输入${title}`}
              onChange={onInputChange}
            />
          </Cell>
        ) : null
      }
    </>
  );
};

export default ZarmOtherSelect;
