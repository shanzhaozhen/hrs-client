import type {ReactNode} from 'react';
import React, { useEffect, useState} from 'react';
import ZaSelect from "@/components/CustomZarm/ZaSelect";
import {Cell, Input} from "zarm";
import type {DataSource} from "zarm/types/picker-view/PropsType";
import {requiredTitle} from "@/utils/zarm";

interface ZaOtherSelectProps {
  title?: string | number;
  required?: boolean;
  help?: ReactNode;
  dataSource?: DataSource;
  valueMember?: string;
  value?: any;
  onChange?: (value: any) => void;
}

const ZaOtherSelect: React.FC<ZaOtherSelectProps> = (props) => {
  const { title, required, help, dataSource, valueMember, value, onChange } = props;

  const [ selectOptions, setSelectOptions ] = useState<any>([]);
  const [ showInput, setShowInput ] = useState<boolean>(false);
  const [ selectValue, setSelectValue ] = useState<any>();
  const [ inputValue, setInputValue ] = useState<any>();

  useEffect(() => {
    const newVar = dataSource || [];
    newVar.push({ label: '其他', value: 'other' });
    setSelectOptions(newVar);
  }, [dataSource]);

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
      <Cell title={required ? requiredTitle(title) : title} help={showInput ? null : help}>
        <ZaSelect
          defaultValue={selectValue}
          valueMember={valueMember}
          dataSource={selectOptions}
          onChange={onSelectChange}
        />
      </Cell>
      {
        showInput ? (
          <Cell title=" " help={help}>
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
