import React, {useEffect, useState} from 'react';
import ZaSelect from "@/components/CustomZarm/ZaSelect";
import {Cell, Input} from "zarm";
import type {DataSource} from "zarm/types/picker-view/PropsType";

interface ZaOtherSelectProps {
  title?: string;
  dataSource?: DataSource;
  valueMember?: string;
  value?: any;
  onChange?: (value: any) => void;
}

const ZaOtherSelect: React.FC<ZaOtherSelectProps> = (props) => {
  const { title, dataSource, valueMember, value, onChange } = props;

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
        <ZaSelect
          defaultValue={selectValue}
          valueMember={valueMember}
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

export default ZaOtherSelect;
